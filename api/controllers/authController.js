const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { promisify } = require("util");

const User = require("../models/userModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const Email = require("../utils/email");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  //Set token in the browser cookie
  res.cookie("jwt", token, cookieOptions);

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    message: "Đăng nhập thành công!",
    token,
    data: {
      user,
    },
  });
};

exports.register = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  const url = `${process.env.CLIENT_SITE_URL}/user/detail`;
  await new Email(newUser, url).sendWelcome();

  createSendToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Check if email and password exist
  if (!email || !password) {
    return next(new AppError("Vui lòng cung cấp email và mật khẩu!", 400));
  }
  // 2) Check if user exists && password is correct
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new AppError("Không tìm thấy người dùng!", 401));
  }

  if (!(await user.correctPassword(password, user.password))) {
    return next(new AppError("Email hoặc mật khẩu không chính xác", 401));
  }

  // 3) If everything ok, send token to client
  createSendToken(user, 200, res);
});

exports.google = catchAsync(async (req, res, next) => {
  const { email, name } = req.body;

  if (!email || !name) {
    return next(new AppError("Vui lòng chọn tài khoản google!", 400));
  }

  const user = await User.findOne({ email });

  if (user) {
    createSendToken(user, 200, res);
  } else {
    const generatedPassword = Math.random().toString(36).slice(-8);

    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: generatedPassword,
      passwordConfirm: generatedPassword,
    });

    const url = `${process.env.CLIENT_SITE_URL}/user/detail`;
    await new Email(newUser, url).sendWelcome();

    createSendToken(newUser, 201, res);
  }
});

exports.isLoggedIn = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      // 1) verify token
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );

      // 2) Check if user still exists
      const currentUser = await User.findById(decoded.id);
      if (!currentUser) {
        return next();
      }

      // 3) Check if user changed password after the token was issued
      if (currentUser.changedPasswordAfter(decoded.iat)) {
        return next();
      }

      // THERE IS A LOGGED IN USER
      res.locals.user = currentUser;
      return next();
    } catch (err) {
      return next();
    }
  }
  next();
};

exports.logout = (req, res) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({ status: "success" });
};

exports.protect = catchAsync(async (req, res, next) => {
  // 1) Getting token and check of it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(
      new AppError(
        "Bạn chưa đăng nhập! Vui lòng đăng nhập để có quyền truy cập.",
        401
      )
    );
  }

  // 2) Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError(
        "Người dùng sở hữu token này không còn phiên sử dụng nữa.",
        401
      )
    );
  }

  // 4) Check if user changed password after the token was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError(
        "Người dùng gần đây đã thay đổi mật khẩu! Xin vui lòng đăng nhập lại.",
        401
      )
    );
  }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  res.locals.user = currentUser;
  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("Bạn không có quyền thực sử dụng chức năng này!", 403)
      );
    }

    next();
  };
};

//=====================FORGOT PASSWORD ==========================
exports.forgotPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on POSTed email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(
      new AppError("Không có người dùng nào có địa chỉ email này!", 404)
    );
  }

  // 2) Generate the random reset OTP
  const resetOTP = user.createOTPPasswordReset();
  await user.save({ validateBeforeSave: false });

  // 3) Send it to user's email
  try {
    const resetURL = `${process.env.CLIENT_SITE_URL}/verify-otp`;

    await new Email(user, resetURL, resetOTP).sendPasswordReset();

    res.status(200).json({
      status: "success",
      message: "Mã OTP đã được gửi tới email!",
    });
  } catch (err) {
    user.passwordOTPReset = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(new AppError("Đã xảy ra lỗi khi gửi email. Thử lại sau!", 500));
  }
});

exports.verifyOTP = catchAsync(async (req, res, next) => {
  // 1) Get user based on the OTP
  const OTP = req.body.otp;

  const user = await User.findOne({
    passwordOTPReset: OTP,
    passwordResetExpires: { $gt: Date.now() },
  });

  // 2) If OTP has not expired, and there is user, set the new password
  if (!user) {
    return next(new AppError("Mã OTP không hợp lệ hoặc đã hết hạn", 400));
  }

  // 3) Generate the random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  res.status(200).json({
    status: "success",
    message: "Xác minh OTP thành công!",
    data: {
      resetToken,
    },
  });
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on the token
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
  });

  // 2) If token has not expired, and there is user, set the new password
  if (!user) {
    return next(new AppError("Mã đặt lại không hợp lệ!", 400));
  }

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordOTPReset = undefined;
  user.passwordResetExpires = undefined;
  user.passwordResetToken = undefined;
  await user.save();

  // 3) Update changedPasswordAt property for the user
  // 4) Log user in, send JWT
  createSendToken(user, 200, res);
});
//=====================FORGOT PASSWORD ==========================

exports.updatePassword = catchAsync(async (req, res, next) => {
  // 1) Get user from collection
  const user = await User.findById(req.user.id).select("+password");

  // 2) Check if POSTed current password is correct
  if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
    return next(new AppError("Mật khẩu hiện tại của bạn sai.", 401));
  }

  // 3) If so, update password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();
  // User.findByIdAndUpdate will NOT work as intended!

  // 4) Log user in, send JWT
  createSendToken(user, 200, res);
});

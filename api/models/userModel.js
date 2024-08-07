const mongoose = require("mongoose");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const otpGenerator = require("otp-generator");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Vui lòng cung cấp tên của người dùng!"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Vui lòng cung cấp địa chỉ email của người dùng"],
      unique: true,
      validate: [
        validator.isEmail,
        "Vui lòng cung cấp một địa chỉ email hợp lệ!",
      ],
    },
    phone: {
      type: String,
      unique: true,
      validate: [
        validator.isMobilePhone,
        "Vui lòng cung cấp một số điện thoại hợp lệ",
      ],
    },
    address: String,
    photo: {
      type: String,
      default:
        "https://storage.googleapis.com/mern-tour-bc817.appspot.com/user/user-65d86afb520744909f54438c-1718616780860.jpeg",
    },
    role: {
      type: String,
      emun: ["user", "guide", "admin"],
      default: "user",
    },
    password: {
      type: String,
      required: [true, "Vui lòng cung cấp mật khẩu của người dùng"],
      minLength: 6,
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, "Vui lòng xác nhận mật khẩu của người dùng"],
      validate: {
        //This only works on CREATE and SAVE!!! (this.update)
        validator: function (el) {
          if (this.isModified("password")) {
            return el === this.password;
          }
          return true;
        },
        message: "Mật khẩu không trùng khớp",
      },
    },
    fcmToken: { type: String },
    passwordChangedAt: Date,
    passwordOTPReset: String,
    passwordResetExpires: Date,
    passwordResetToken: String,
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  //Only run this function if password was actually modified
  if (!this.isModified("password")) return next();

  //Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  //Delete passowrdConfirm field
  this.passwordConfirm = undefined;
  next();
});

userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.pre("findOneAndUpdate", async function (next) {
  // Check if the password field is being modified
  if (this._update.password) {
    this._update.password = await bcrypt.hash(this._update.password, 12);
    this._update.passwordConfirm = undefined;
  }
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimestamp < changedTimestamp;
  }

  // False means NOT changed
  return false;
};

userSchema.methods.createOTPPasswordReset = function () {
  const OTP = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    specialChars: false,
  });
  this.passwordOTPReset = OTP;

  console.log({ OTP }, this.passwordOTPReset);

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return OTP;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  console.log({ resetToken }, this.passwordResetToken);

  return resetToken;
};

const User = mongoose.model("User", userSchema);

module.exports = User;

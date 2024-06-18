const multer = require("multer");
const sharp = require("sharp");

const Post = require("../models/postModel");
const Country = require("../models/countryModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const AIPFeatures = require("../utils/apiFeatures");
const { default: mongoose } = require("mongoose");
const { bucket } = require("../config/firebase.js");

//=====================CONFIGURE IMG FILE=============================
const uploadImage = async (file, filename) => {
  const folderName = "post";
  const filePath = `${folderName}/${filename}`;

  const fileRef = bucket.file(filePath);
  const stream = fileRef.createWriteStream({
    metadata: {
      contentType: file.mimetype,
    },
  });

  return new Promise((resolve, reject) => {
    stream.on("error", (err) => {
      console.error(`Error uploading ${filePath} to Firebase:`, err);
      reject(new AppError(`Unable to upload ${filePath}`, 500));
    });

    stream.on("finish", async () => {
      try {
        await fileRef.makePublic();
        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${filePath}`;
        resolve(publicUrl);
      } catch (error) {
        console.error(`Error making ${filePath} public:`, error);
        reject(new AppError(`Error making ${filePath} public`, 500));
      }
    });

    stream.end(file.buffer);
  });
};

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(
      new AppError(
        "Không phải là hình ảnh! Vui lòng chỉ tải lên các hình ảnh!",
        400
      ),
      false
    );
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadImages = upload.array("photo", 5);

exports.resizeImages = catchAsync(async (req, res, next) => {
  if (req.files.length === 0) {
    return next();
  }

  req.body.photo = [];

  await Promise.all(
    req.files.map(async (file, i) => {
      const ext = file.mimetype.split("/")[1];
      const filename = `post-images-${Date.now()}-${i + 1}.${ext}`;

      const publicUrl = await uploadImage(file, filename);

      req.body.photo.push(publicUrl);
    })
  );

  next();
});

//===================== END - CONFIGURE IMG FILE=========================
exports.setUserIds = (req, res, next) => {
  //Allow nested routes
  if (!req.body.user) req.body.user = req.user.id;

  next();
};

exports.getAllPostes = catchAsync(async (req, res, next) => {
  const features = new AIPFeatures(Post.find({}), req.query)
    .filter()
    .sort()
    .paginate();

  const countDocument = new AIPFeatures(
    Post.countDocuments({}),
    req.query,
    "count"
  ).filter();

  const [posts, totalPosts] = await Promise.all([
    features.query,
    countDocument.query,
  ]);

  const pageNumber = Math.ceil(totalPosts / (req.query.limit || 8));

  res.status(200).json({
    status: "success",
    message: "Truy xuất thành công",
    data: {
      posts,
      totalPosts,
      pageNumber,
    },
  });
});

exports.getPostOfUser = catchAsync(async (req, res, next) => {
  const id = req.user.id;
  const features = new AIPFeatures(Post.find({ user: id }), req.query)
    .filter()
    .sort()
    .paginate();

  const countDocument = new AIPFeatures(
    Post.countDocuments({ user: id }),
    req.query,
    "count"
  ).filter();

  const [posts, totalPosts] = await Promise.all([
    features.query,
    countDocument.query,
  ]);

  const pageNumber = Math.ceil(totalPosts / (req.query.limit || 8));

  res.status(200).json({
    status: "success",
    message: "Truy xuất thành công",
    data: {
      posts,
      totalPosts,
      pageNumber,
    },
  });
});

exports.getListPostByCountry = catchAsync(async (req, res, next) => {
  const slug = req.params.slug;

  const country = await Country.findOne({ slug });
  if (!country) {
    return next(
      new AppError(
        "Slug này không được tìm thấy trong bất kỳ danh mục quốc gia nào!",
        404
      )
    );
  }

  const features = new AIPFeatures(
    Post.find({ country: country._id }),
    req.query
  )
    .filter()
    .sort()
    .paginate();

  const countDocument = new AIPFeatures(
    Post.countDocuments({ country: country._id }),
    req.query,
    "count"
  ).filter();

  const [posts, totalPosts] = await Promise.all([
    features.query,
    countDocument.query,
  ]);

  const pageNumber = Math.ceil(totalPosts / (req.query.limit || 8));

  res.status(200).json({
    status: "success",
    message: "Truy xuất thành công",
    data: {
      posts,
      totalPosts,
      pageNumber,
    },
  });
});

exports.getRelatedPosts = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const post = await Post.findById(id);

  if (!post) {
    return next(new AppError("Không tìm thấy bài đăng nào có ID đó!", 404));
  }

  const posts = await Post.aggregate([
    {
      $match: {
        _id: { $ne: new mongoose.Types.ObjectId(id) },
        country: post.country._id,
      },
    },
    { $sample: { size: 3 } },
    {
      $project: {
        likes: 0,
        description: 0,
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $lookup: {
        from: "countries",
        localField: "country",
        foreignField: "_id",
        as: "country",
      },
    },
    {
      $project: {
        "user.role": 0,
        "user.password": 0,
        "user.passwordChangedAt": 0,
        "user.passwordOTPReset": 0,
        "user.passwordResetExpires": 0,
      },
    },
  ]);

  res.status(200).json({
    status: "success",
    message: "Truy xuất thành công",
    data: {
      posts,
    },
  });
});

exports.getPost = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const post = await Post.findById(id);

  if (!post) {
    return next(new AppError("Không tìm thấy bài đăng nào có ID đó!", 404));
  }

  res.status(200).json({
    status: "success",
    message: "Truy xuất thành công",
    data: {
      post,
    },
  });
});

exports.createPost = catchAsync(async (req, res, next) => {
  const newPost = await Post.create(req.body);

  res.status(201).json({
    status: "success",
    message: "Tạo bài viết thành công",
    data: {
      data: newPost,
    },
  });
});

exports.checkPostOfUser = catchAsync(async (req, res, next) => {
  const currentPost = await Post.findById(req.params.id);

  if (
    (!currentPost || currentPost.user._id != req.user.id) &&
    !(req.method === "DELETE" && req.user.role === "admin")
  ) {
    return next(
      new AppError("Bài viết này không phải của bạn hoặc không tồn tại!", 401)
    );
  }

  next();
});

exports.updatePost = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const post = await Post.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!post) {
    return next(new AppError("Không tìm thấy bài đăng nào có ID đó!", 404));
  }

  res.status(200).json({
    status: "success",
    message: "Cập nhật dữ liệu thành công!",
    data: {
      post,
    },
  });
});

exports.deletePost = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const post = await Post.findByIdAndDelete(id);

  if (!post) {
    return next(new AppError("Không tìm thấy bài đăng nào có ID đó!", 404));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.likePost = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const post = await Post.findById(id);

  if (!post.likes.includes(req.user._id)) {
    await Post.updateOne({ _id: id }, { $push: { likes: req.user._id } });

    res.status(200).json({
      status: "success",
      message: "Bài viết đã được thích!",
    });
  } else {
    await Post.updateOne({ _id: id }, { $pull: { likes: req.user._id } });
    res.status(200).json({
      status: "success",
      message: "Bài viết đã được bỏ thích!",
    });
  }
});

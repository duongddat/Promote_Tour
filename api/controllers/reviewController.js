const Review = require("../models/reviewModel");
const catchAsync = require("../utils/catchAsync");
const AIPFeatures = require("../utils/apiFeatures");
const AppError = require("../utils/appError");

exports.setTourUserIds = (req, res, next) => {
  //Allow nested routes
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;

  next();
};

exports.getAllReviews = catchAsync(async (req, res, next) => {
  let filter = {};
  if (req.params.tourId) {
    filter = { tour: req.params.tourId };
  }

  const features = new AIPFeatures(Review.find(filter), req.query)
    .sort()
    .paginate();

  const countDocument = new AIPFeatures(
    Review.countDocuments(filter),
    req.query,
    "count"
  ).filter();

  const [reviews, totalReviews] = await Promise.all([
    features.query,
    countDocument.query,
  ]);

  const pageNumber = Math.ceil(totalReviews / (req.query.limit || 8));

  res.status(200).json({
    status: "success",
    results: reviews.length,
    data: {
      reviews,
      pageNumber,
      totalReviews,
    },
  });
});

exports.getTopReview = catchAsync(async (req, res, next) => {
  const reviews = await Review.find({ rating: { $gte: 4 } })
    .sort({ createdAt: -1 })
    .limit(10);

  res.status(200).json({
    status: "success",
    results: reviews.length,
    data: {
      reviews,
    },
  });
});

exports.getReview = catchAsync(async (req, res, next) => {
  const review = await Review.findById(req.params.id);

  res.status(200).json({
    status: "success",
    data: {
      review,
    },
  });
});

exports.createReview = catchAsync(async (req, res, next) => {
  const newReview = await Review.create(req.body);

  res.status(201).json({
    status: "success",
    messaage: "Tạo đánh giá thành công!",
    data: {
      newReview,
    },
  });
});

exports.checkReviewOfUser = catchAsync(async (req, res, next) => {
  const currentReview = await Review.findById(req.params.id);

  if (
    (!currentReview || currentReview.user._id != req.user.id) &&
    !(req.method === "DELETE" && req.user.role === "admin")
  ) {
    return next(
      new AppError("Đánh giá này không phải của bạn hoặc không tồn tại!", 401)
    );
  }

  next();
});

exports.updateReview = catchAsync(async (req, res, next) => {
  const updatedReview = await Review.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  res.status(200).json({
    status: "success",
    messaage: "Cập nhật đánh giá thành công!",
    data: {
      review: updatedReview,
    },
  });
});

exports.deleteReview = catchAsync(async (req, res, next) => {
  await Review.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: "success",
    data: null,
  });
});

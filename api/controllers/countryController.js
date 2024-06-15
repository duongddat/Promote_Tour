const Country = require("../models/countryModel");
const Tour = require("../models/tourModel");
const Blog = require("../models/postModel");
const Discount = require("../models/discountModel");
const catchAsync = require("../utils/catchAsync");
const AIPFeatures = require("../utils/apiFeatures");
const AppError = require("../utils/appError");

exports.getAllCountries = catchAsync(async (req, res, next) => {
  const features = new AIPFeatures(Country.find({}), req.query)
    .sort()
    .paginate();

  const countDocument = new AIPFeatures(
    Country.countDocuments({}),
    req.query,
    "count"
  ).filter();

  const [countries, totalCountries] = await Promise.all([
    features.query,
    countDocument.query,
  ]);

  const pageNumber = Math.ceil(totalCountries / (req.query.limit || 8));

  res.status(200).json({
    status: "success",
    message: "Truy xuất thành công!",
    data: {
      countries,
      totalCountries,
      pageNumber,
    },
  });
});

exports.getCountry = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const country = await Country.findById(id);

  if (!country) {
    return next(
      new AppError("Không tìm thấy danh mục quốc gia nào với ID đó", 404)
    );
  }

  res.status(200).json({
    status: "success",
    message: "Truy xuất thành công!",
    data: {
      country,
    },
  });
});

exports.createCountry = catchAsync(async (req, res, next) => {
  const newCountry = await Country.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      country: newCountry,
    },
  });
});

exports.updateCountry = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const country = await Country.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!country) {
    return next(
      new AppError("Không tìm thấy danh mục quốc gia nào với ID đó", 404)
    );
  }

  res.status(200).json({
    status: "success",
    message: "Đã cập nhật dữ liệu thành công!",
    data: {
      country,
    },
  });
});

exports.deleteCountry = catchAsync(async (req, res, next) => {
  const id = req.params.id;

  // Kiểm tra xem country tồn tại trong  tour
  const tourExist = await Tour.exists({ country: id });

  // Kiểm tra xem country tồn tại trong bài đăng blog
  const blogExist = await Blog.exists({ country: id });

  // Kiểm tra xem country tồn tại trong danh sách discount
  const discountExist = await Discount.exists({ country: id });

  // Nếu idUser tồn tại trong  review, blog hoặc booking
  if (tourExist || blogExist || discountExist) {
    return next(
      new AppError(
        "Danh mục quốc gia này đã tham gia vào dữ liệu của hệ thống (Tour, Blog, Discount), không thể xóa.",
        400
      )
    );
  }

  const country = await Country.findByIdAndDelete(id);

  if (!country) {
    return next(
      new AppError("Không tìm thấy danh mục quốc gia nào với ID đó", 404)
    );
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});

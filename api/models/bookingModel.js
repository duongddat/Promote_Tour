const mongoose = require("mongoose");
const moment = require("moment");

const AppError = require("../utils/appError");

const bookingSchema = new mongoose.Schema({
  tour: {
    type: mongoose.Schema.ObjectId,
    ref: "Tour",
    required: [true, "Đặt chỗ phải có chuyên tham quan!"],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Đặt chỗ phải có người dùng!"],
  },
  guestSize: {
    type: Number,
    required: [true, "Đặt chỗ phải có số lượng khách!"],
  },
  price: {
    type: Number,
    required: [true, "Đặt chỗ phải có tổng tiền!"],
  },
  bookAt: {
    type: Date,
    required: [true, "Đặt chỗ phải có ngày!"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  paid: {
    type: Boolean,
    default: false,
  },
  cancelled: {
    type: Boolean,
    default: false,
  },
});

bookingSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "_id name email",
  }).populate({
    path: "tour",
    select: "title slug guides  price",
  });

  next();
});

bookingSchema.pre("save", function (next) {
  const currentDate = moment();
  const bookingDate = moment(this.bookAt, "DD/MM/YYYY");

  if (bookingDate.isBefore(currentDate, "day")) {
    return next(new AppError("Ngày đặt không thể là ngày trong quá khứ.", 400));
  }
  next();
});

bookingSchema.pre(/^find/, async function (next) {
  await this.model.deleteMany({
    paid: false,
  });

  next();
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;

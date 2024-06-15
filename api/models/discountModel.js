const mongoose = require("mongoose");

const discountSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: [true, "Giảm giá phải có mã"],
      unique: true,
    },
    percentage: {
      type: Number,
      required: [true, "Giảm giá phải có phần trăm giảm giá"],
      min: 0,
      max: 100,
    },
    expiryDate: {
      type: Date,
      required: [true, "Giảm giá phải có thời hạn sử dụng"],
    },
    country: {
      type: mongoose.Schema.ObjectId,
      ref: "Country",
      required: [true, "Giảm giá phải thuộc về một danh mục quốc gia"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

discountSchema.pre(/^find/, async function (next) {
  const currentDate = new Date();

  await this.model.updateMany(
    { expiryDate: { $lt: currentDate } },
    { $set: { isActive: false } }
  );

  next();
});

discountSchema.pre(/^find/, function (next) {
  this.populate({
    path: "country",
    select: "-__v -createdAt -updatedAt",
  });

  next();
});

discountSchema.statics.isValidDiscountCode = async function (code, countryId) {
  const discount = await this.findOne({
    code,
    country: countryId,
    expiryDate: { $gte: new Date() },
    isActive: true,
  });
  return discount;
};

const Discount = mongoose.model("Discount", discountSchema);

module.exports = Discount;

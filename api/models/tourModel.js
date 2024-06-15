const mongoose = require("mongoose");
const slugify = require("slugify");

const tourSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Tên chuyến tham quan không được để trống!"],
      unique: true,
      trim: true,
      maxlength: [90, "Tên chuyến tham quan phải có ít hơn hoặc bằng 90 ký tự"],
      minlength: [10, "Tên chuyến tham quan phải có ít nhất 10 ký tự"],
    },
    slug: String,
    country: {
      type: mongoose.Schema.ObjectId,
      ref: "Country",
      require: [true, "Chuyến tham quan phải thuộc về một quốc gia"],
    },
    duration: {
      type: Number,
      required: [true, "Chuyến tham quan phải có thời lượng"],
    },
    maxGroupSize: {
      type: Number,
      required: true,
    },
    imageCover: {
      type: String,
      required: [true, "Chuyến tham quan phải có ảnh bìa"],
    },
    images: [String],
    description: {
      type: String,
      required: [true, "Chuyến tham quan phải có mô tả"],
    },
    price: {
      type: Number,
      required: true,
    },
    priceDiscount: {
      type: Number,
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, "Đánh giá phải lớn hơn 1.0"],
      max: [5, "Đánh giá phải nhỏ hơn 5.0"],
      set: (val) => Math.round(val * 10) / 10,
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    startLocation: {
      //GeoJSON
      type: {
        type: String,
        default: "Point",
        enum: ["Point"],
      },
      coordinates: [Number],
      address: String,
      description: String,
    },
    locations: [
      {
        type: {
          type: String,
          default: "Point",
          enum: ["Point"],
        },
        coordinates: [Number],
        description: String,
        day: Number,
      },
    ],
    guides: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

tourSchema.index({ price: 1, ratingsAverage: -1 });
tourSchema.index({ slug: 1 });
tourSchema.index({
  startLocation: "2dsphere",
});

tourSchema.virtual("durationWeeks").get(function () {
  return this.duration / 7;
});

//Virtula populate
tourSchema.virtual("reviews", {
  ref: "Review",
  foreignField: "tour",
  localField: "_id",
});

//DOCUMENT MIDDLEWARE runs before .save() and .create()
tourSchema.pre("save", function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

//QUERY MIDDLEWARE
tourSchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate();
  if (update.name) {
    update.slug = slugify(update.title, { lower: true });
  }
  next();
});

tourSchema.pre(/^find/, function (next) {
  this.populate({
    path: "guides",
    select: "-__v -passwordChangedAt",
  });

  next();
});

tourSchema.pre(/^find/, function (next) {
  this.populate({
    path: "country",
    select: "-__v -createdAt -updatedAt",
  });

  next();
});

const Tour = mongoose.model("Tour", tourSchema);

module.exports = Tour;

const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Tiêu đề không được để trống!"],
    },
    description: {
      type: String,
    },
    photo: [String],
    country: {
      type: mongoose.Schema.ObjectId,
      ref: "Country",
      required: [true, "Bài đăng phải có một danh mục quốc gia"],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Bài đăng phải thuộc về người dùng"],
    },
    likes: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

postSchema.pre(/^find/, function (next) {
  this.populate({
    path: "country",
    select: "-__v -createdAt -updatedAt",
  }).populate({
    path: "user",
    select: "_id name email photo role",
  });

  next();
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;

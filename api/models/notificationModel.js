const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    recipient: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    sender: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["like_post", "cancel_booking", "refund_booking"],
      required: true,
    },
    postId: {
      type: mongoose.Schema.ObjectId,
      ref: "Post",
    },
    bookingId: {
      type: mongoose.Schema.ObjectId,
      ref: "Booking",
    },
    message: {
      type: String,
      required: true,
    },
    linkTo: {
      type: String,
      require: true,
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;

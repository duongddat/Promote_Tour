const Notification = require("../models/notificationModel");

const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const {
  sendNotification,
  sendNotificationTest,
} = require("../config/firebase.js");

exports.getNumNotificationOfUser = catchAsync(async (req, res, next) => {
  const id = req.user.id;

  const numNoti = await Notification.countDocuments({
    recipient: id,
    read: false,
  });

  if (numNoti === undefined) {
    return next(
      new AppError("Không tìm thấy thông báo của người dùng hiện tại!", 404)
    );
  }

  res.status(200).json({
    status: "success",
    message: "Truy xuất thành công",
    data: {
      numNoti,
    },
  });
});

exports.getNotificationOfUser = catchAsync(async (req, res, next) => {
  const id = req.user.id;
  const limit = req.query.limit || 6;
  const markAsRead = req.query.markAsRead || false;

  const [limitNoti, notifications] = await Promise.all([
    Notification.countDocuments({ recipient: id }),
    Notification.find({ recipient: id })
      .populate({
        path: "sender",
        select: "_id name photo",
      })
      .sort({
        createdAt: -1,
      })
      .limit(limit),
  ]);

  if (!notifications) {
    return next(
      new AppError("Không tìm thấy thông báo của người dùng hiện tại!", 404)
    );
  }

  if (markAsRead) {
    await Notification.updateMany(
      { recipient: id, read: false },
      { read: true }
    );
  }

  res.status(200).json({
    status: "success",
    message: "Truy xuất thành công",
    data: {
      notifications,
      limitNoti,
    },
  });
  next();
});

exports.sendNotification = catchAsync(async (req, res, next) => {
  const { fcmToken, title, body } = req.body;
  const message = {
    title,
    body,
  };

  const response = await sendNotificationTest(fcmToken, message);
  res.status(200).json({
    message: "Successfully sent message",
    response: response,
  });
});

exports.deleteNotification = catchAsync(async (req, res, next) => {
  const id = req.params.id;

  const notification = await Notification.findByIdAndDelete(id);

  if (!notification) {
    return next(new AppError("Không tìm thấy thông báo nào với ID đó", 404));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.deleteAllNotification = catchAsync(async (req, res, next) => {
  const id = req.user.id;

  await Notification.deleteMany({ recipient: id });

  res.status(204).json({
    status: "success",
    data: null,
  });
});

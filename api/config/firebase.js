const admin = require("firebase-admin");
const { getMessaging } = require("firebase-admin/messaging");

const User = require("../models/userModel");
const Notification = require("../models/notificationModel");
const serviceAccount = require("../adminKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "gs://mern-tour-bc817.appspot.com",
});

const bucket = admin.storage().bucket();

const sendNotificationTest = (token, message) => {
  const payload = {
    notification: {
      title: message.title,
      body: message.body,
    },
    token: token,
  };

  return getMessaging()
    .send(payload)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log("Error sending message:", error);
      throw error;
    });
};

const sendNotification = async (
  recipientId,
  senderId,
  type,
  message,
  linkTo,
  postId = null,
  bookingId = null
) => {
  const recipient = await User.findById(recipientId);

  const newNotification = new Notification({
    recipient: recipientId,
    sender: senderId,
    type,
    message,
    linkTo,
    postId,
    bookingId,
  });

  await newNotification.save();

  if (recipient && recipient.fcmToken) {
    const payload = {
      notification: {
        title: "Bạn có thông báo mới",
        body: message,
      },
      token: recipient.fcmToken,
    };

    await getMessaging().send(payload);
  }
};

module.exports = { bucket, sendNotification, sendNotificationTest };

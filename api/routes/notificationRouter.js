const express = require("express");

const notificationController = require("../controllers/notificationController");
const authController = require("../controllers/authController");

const router = express.Router();

router.get(
  "/numNoti",
  authController.protect,
  notificationController.getNumNotificationOfUser
);

router.delete(
  "/cleanNoti",
  authController.protect,
  notificationController.deleteAllNotification
);

router
  .route("/")
  .get(authController.protect, notificationController.getNotificationOfUser)
  .post(notificationController.sendNotification);

router.route("/:id").delete(notificationController.deleteNotification);

module.exports = router;

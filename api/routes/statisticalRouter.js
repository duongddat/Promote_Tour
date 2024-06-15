const express = require("express");
const statisticalController = require("../controllers/statisticalController");
const authController = require("../controllers/authController");

const router = express.Router();

router.get(
  "/booking-by-guide",
  authController.protect,
  authController.restrictTo("admin", "guide"),
  statisticalController.bookingsByGuide
);

router.get(
  "/year-static",
  authController.protect,
  authController.restrictTo("admin", "guide"),
  statisticalController.getYearsWithRevenue
);

router.get(
  "/booking-statics",
  authController.protect,
  authController.restrictTo("admin", "guide"),
  statisticalController.bookingGuideStatistics
);

router.get("/record-of-month", statisticalController.getRecordsOfMonth);
router.get("/new-record", statisticalController.getNewRecordsCount);
router.get("/revenue-booking", statisticalController.revenueStatistics);

module.exports = router;

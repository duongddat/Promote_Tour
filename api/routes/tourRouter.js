const express = require("express");

const tourController = require("../controllers/tourController");
const authController = require("../controllers/authController");
const reviewRouter = require("../routes/reviewRouter");

const router = express.Router();

router.use("/:tourId/reviews", reviewRouter);

router.route("/monthy-statistic/:year").get(tourController.getMonthStatistic);
router.route("/detail/:slug").get(tourController.getTourBySlug);
router.route("/tour-of-country").get(tourController.countToursByCountry);
router.route("/top-tour").get(tourController.getTopTours);
router.route("/search/:slug").get(tourController.getAllTours);
router.route("/search").get(tourController.getAllTours);

router
  .route("/")
  .get(tourController.getAllTours)
  .post(
    tourController.uploadImages,
    tourController.resizeImages,
    tourController.createTour
  );

router
  .route("/:id")
  .get(tourController.getTour)
  .patch(
    tourController.uploadImages,
    tourController.resizeImages,
    tourController.updateTour
  )
  .delete(tourController.deleteTour);

module.exports = router;

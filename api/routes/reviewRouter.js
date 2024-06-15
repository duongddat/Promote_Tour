const express = require("express");
const reviewController = require("../controllers/reviewController");
const authController = require("../controllers/authController");

const router = express.Router({ mergeParams: true });

router.route("/top-review").get(reviewController.getTopReview);

router
  .route("/")
  .get(reviewController.getAllReviews)
  .post(
    authController.protect,
    reviewController.setTourUserIds,
    reviewController.createReview
  );

router
  .route("/:id")
  .get(reviewController.getReview)
  .patch(
    authController.protect,
    reviewController.checkReviewOfUser,
    reviewController.updateReview
  )
  .delete(
    authController.protect,
    reviewController.checkReviewOfUser,
    reviewController.deleteReview
  );

module.exports = router;

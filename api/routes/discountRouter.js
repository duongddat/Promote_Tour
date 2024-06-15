const express = require("express");

const discountController = require("../controllers/discountController");

const router = express.Router();

router.route("/check-discount").post(discountController.checkDiscountCode);

router
  .route("/")
  .get(discountController.getAllDiscounts)
  .post(discountController.createDiscount);

router
  .route("/:id")
  .get(discountController.getDiscount)
  .patch(discountController.updateDiscount)
  .delete(discountController.deleteDiscount);

module.exports = router;

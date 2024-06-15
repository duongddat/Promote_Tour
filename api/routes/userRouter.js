const express = require("express");

const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

const router = express.Router();

router.use(authController.protect);
//User
router.get("/me", userController.getMe, userController.getUser);
router.patch(
  "/updateMe",
  userController.uploadUserPhoto,
  userController.resizeUserPhoto,
  userController.updateMe
);

//Admin Manager User
router.use(authController.restrictTo("admin"));

router.get("/list-guide", userController.getGuide);

router
  .route("/")
  .get(userController.getAllUsers)
  .post(
    userController.uploadUserPhoto,
    userController.resizeUserPhoto,
    userController.createUser
  );

router
  .route("/:id")
  .get(userController.getUser)
  .patch(
    userController.uploadUserPhoto,
    userController.resizeUserPhoto,
    userController.updateUser
  )
  .delete(userController.deleteUser);

module.exports = router;

const express = require("express");

const postController = require("../controllers/postController");
const authController = require("../controllers/authController");

const router = express.Router();

router.route("/country/:slug").get(postController.getListPostByCountry);
router.route("/related-posts/:id").get(postController.getRelatedPosts);
router.route("/:id/like").get(authController.protect, postController.likePost);
router
  .route("/my-post")
  .get(authController.protect, postController.getPostOfUser);

router
  .route("/")
  .get(postController.getAllPostes)
  .post(
    authController.protect,
    postController.uploadImages,
    postController.resizeImages,
    postController.setUserIds,
    postController.createPost
  );

router
  .route("/:id")
  .get(postController.getPost)
  .patch(
    authController.protect,
    postController.uploadImages,
    postController.resizeImages,
    postController.setUserIds,
    postController.checkPostOfUser,
    postController.updatePost
  )
  .delete(
    authController.protect,
    postController.checkPostOfUser,
    postController.deletePost
  );

module.exports = router;

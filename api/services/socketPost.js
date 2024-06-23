const Post = require("../models/postModel");

const socketPost = (io, socket) => {
  // Sự kiện like hoặc unlike từ phía người dùng tại list
  socket.on("like_posts", async (pageCurrent, limitCurrent) => {
    try {
      // Lấy posts theo trang và limit hiện tại
      const page = pageCurrent || 1;
      const limit = limitCurrent || 8;
      const skip = (page - 1) * limit;

      const posts = await Post.find({})
        .sort("-createdAt -_id")
        .skip(skip)
        .limit(limit);

      // Phát sự kiện cập nhật like or unlike cho tất cả client
      io.emit("update_posts", posts);
    } catch (error) {
      console.log(error);
    }
  });

  socket.on("like_posts_manage", async (pageCurrent, limitCurrent, userId) => {
    try {
      // Lấy posts theo trang và limit hiện tại
      const page = pageCurrent || 1;
      const limit = limitCurrent || 8;
      const skip = (page - 1) * limit;

      const posts = await Post.find({ user: userId })
        .sort("-createdAt -_id")
        .skip(skip)
        .limit(limit);

      // Phát sự kiện cập nhật like or unlike cho manage
      io.emit("update_posts_manage", posts);
    } catch (error) {
      console.log(error);
    }
  });

  // Sự kiện like hoặc unlike từ phía người dùng tại
  socket.on("like_post_detail", async (idBlog) => {
    try {
      const post = await Post.findById(idBlog);

      // Phát sự kiện cập nhật like or unlike
      io.emit("update_post_detail", post);
    } catch (error) {
      console.log(error);
    }
  });
};

module.exports = socketPost;

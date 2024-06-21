const Tour = require("../models/tourModel");

const socketReview = (io, socket) => {
  // Sự kiện review từ phía người dùng
  socket.on("new_review", async (tourId) => {
    try {
      // Lấy tất cả review cho tour đó
      const tour = await Tour.findById(tourId).populate({
        path: "reviews",
        options: { sort: { createdAt: 1 } },
      });

      // Phát sự kiện cập nhật review cho tất cả client
      io.emit("update_reviews", tour);
    } catch (error) {
      console.log(error);
    }
  });
};

module.exports = socketReview;

export function titleNotification(title) {
  switch (title) {
    case "like_post":
      return "Thích bài viết";
    case "cancel_booking":
      return "Huỷ tour";
    case "refund_booking":
      return "Hoàn tiền";
    case "new_comment":
      return "Bình luận mới";
    case "new_follower":
      return "Có người theo dõi bạn";
    default:
      return "Thông báo không xác định";
  }
}

export function numNotification(num) {
  return num > 99 ? "99+" : num.toString();
}

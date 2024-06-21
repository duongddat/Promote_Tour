import { useSelector } from "react-redux";
import { useRef, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { io } from "socket.io-client";

import { formatVietnameseDate } from "../../helper/formattingDate";
import ShowModal from "../common/ShowModal";
import { useAction } from "../../hooks/useAction";
import { deleteReview } from "../../utils/Client/https";
import Spin from "../common/Spin";
import "./ReviewTour.css";

function ListReviews({ reviews, onEdit, tourId }) {
  const { userInfo } = useSelector((state) => state.auth);
  const idRef = useRef();
  const [modalIsOpen, setIsOpen] = useState(false);
  const { isLoading, action: actionDeleteReview } = useAction(deleteReview);

  function openModal(id) {
    idRef.current = id;
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  async function handleDeleteReview() {
    const reviewId = idRef.current;

    await actionDeleteReview({
      reviewId,
      tourId,
    });

    if (!isLoading) {
      closeModal();

      //Socket
      const socket = io("http://localhost:8080");
      socket.emit("new_review", tourId);
    }
  }

  return (
    <div className="mb-5 user__reviews">
      {reviews.map((review) => (
        <div key={review._id} className="reviews">
          <div className="review-item">
            <LazyLoadImage
              effect="blur"
              className="user-avatar"
              src={`${review.user.photo}`}
              alt={review.user._id}
            />
            <div className="w-100">
              <div className="d-flex align-items-center justify-content-between">
                <div className="flex-grow-1 review-info">
                  <h5 className="md">{review.user.name}</h5>
                  <p className="sm">{formatVietnameseDate(review.createdAt)}</p>
                </div>
                <div className="d-flex align-items-center column-gap-2 review-ratings">
                  <span>{review.rating}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="tour-review_icon"
                    fill="currentColor"
                  >
                    <path d="M12.0006 18.26L4.94715 22.2082L6.52248 14.2799L0.587891 8.7918L8.61493 7.84006L12.0006 0.5L15.3862 7.84006L23.4132 8.7918L17.4787 14.2799L19.054 22.2082L12.0006 18.26ZM12.0006 15.968L16.2473 18.3451L15.2988 13.5717L18.8719 10.2674L14.039 9.69434L12.0006 5.27502L9.96214 9.69434L5.12921 10.2674L8.70231 13.5717L7.75383 18.3451L12.0006 15.968Z"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className="user-review sm d-flex justify-content-between align-items-center column-gap-3">
            <span>{review.review}</span>
            {userInfo &&
              (userInfo._id === review.user._id ||
                userInfo.role === "admin" ||
                (userInfo.role === "guide" &&
                  review.user.role !== "admin")) && (
                <div className="user-review_tool d-flex column-gap-2">
                  {userInfo._id === review.user._id && (
                    <i
                      className="ri-edit-2-line"
                      onClick={() => onEdit(review)}
                    ></i>
                  )}
                  <i
                    className="ri-delete-bin-line"
                    onClick={() => openModal(review._id)}
                  ></i>
                </div>
              )}
          </div>
        </div>
      ))}
      <ShowModal isOpen={modalIsOpen} onClose={closeModal}>
        <div className="p-3 modal-container">
          <div className="modal-close">
            <i className="ri-close-circle-fill" onClick={closeModal}></i>
          </div>
          <div className="modal-title">
            <h5 className="sm p-2">Bạn có chắc xoá bài bình luận?</h5>
          </div>
          <div className="d-flex justify-content-center align-items-center column-gap-3 mt-4">
            <button
              onClick={() => handleDeleteReview()}
              className="button text-white"
              disabled={isLoading}
            >
              {isLoading ? <Spin text="Loading..." /> : "Đồng ý"}
            </button>
            <button onClick={closeModal} className="button btn-red text-white">
              Đóng
            </button>
          </div>
        </div>
      </ShowModal>
    </div>
  );
}

export default ListReviews;

import { Form, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useRef, useState } from "react";

import ListReviews from "./ListReviews";
import { setMessage } from "../../store/message-slice";
import { useAction } from "../../hooks/useAction";
import { createReview, editReview } from "../../utils/Client/https";
import Spin from "../common/Spin";
import "./ReviewTour.css";

function ReviewTour({ reviews, tourId }) {
  const navigate = useNavigate();
  const location = useLocation();
  const formRef = useRef();
  const currentPatch = location.pathname;

  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [rating, setRating] = useState(null);
  const [hoverRating, setHoverRating] = useState(null);
  const [reviewId, setReviewId] = useState("");
  const refReview = useRef();

  const { isLoading: loadingCreate, action: createReviewAction } = useAction(
    createReview,
    currentPatch
  );
  const { isLoading: loadingEdit, action: editReviewAction } = useAction(
    editReview,
    currentPatch
  );

  async function handleSubmit(event) {
    event.preventDefault();
    const review = refReview.current.value;

    if (!userInfo) {
      dispatch(
        setMessage({
          type: "error",
          message: "Vui lòng đăng nhập để bình luận",
        })
      );
      return;
    }

    if (!rating) {
      dispatch(
        setMessage({ type: "error", message: "Vui lòng đánh giá số sao!" })
      );
    }

    if (reviewId !== "") {
      console.log("hahahah");
      await editReviewAction({
        review: review,
        rating: rating,
        tourId: tourId,
        reviewId: reviewId,
      });
    } else {
      await createReviewAction({
        review,
        rating,
        tourId,
      });
    }
    setRating(null);
    setReviewId("");
    refReview.current.value = "";
    navigate(currentPatch);
  }

  function handleEditReview(review) {
    setRating(review.rating);
    setReviewId(review._id);
    refReview.current.value = review.review;
    const formElement = formRef.current;
    const offset = 500;

    const formPosition =
      formElement.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = formPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }

  return (
    <div className="tour-review__container">
      {reviews.length > 0 && (
        <ListReviews
          reviews={reviews}
          onEdit={handleEditReview}
          tourId={tourId}
        />
      )}
      <Form ref={formRef} className="review-box" onSubmit={handleSubmit}>
        <div className="review-content">
          <label className="text-label md">Chất lượng:</label>
          {[...Array(5)].map((star, index) => {
            const ratingValue = index + 1;

            return (
              <label key={index} className="review-star">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="tour-review_icon"
                  fill={
                    ratingValue <= (hoverRating || rating)
                      ? "#ffc107"
                      : "#e4e59"
                  }
                  onClick={() => setRating(ratingValue)}
                  onMouseEnter={() => setHoverRating(ratingValue)}
                  onMouseLeave={() => setHoverRating(null)}
                >
                  <path d="M12.0006 18.26L4.94715 22.2082L6.52248 14.2799L0.587891 8.7918L8.61493 7.84006L12.0006 0.5L15.3862 7.84006L23.4132 8.7918L17.4787 14.2799L19.054 22.2082L12.0006 18.26ZM12.0006 15.968L16.2473 18.3451L15.2988 13.5717L18.8719 10.2674L14.039 9.69434L12.0006 5.27502L9.96214 9.69434L5.12921 10.2674L8.70231 13.5717L7.75383 18.3451L12.0006 15.968Z"></path>
                </svg>
                <input
                  type="radio"
                  name="rating"
                  className="review-innput__star"
                />
              </label>
            );
          })}
        </div>
        <div className="review-content flex-wrap mt-3">
          <input
            ref={refReview}
            name="review"
            type="text"
            className="input-review"
            placeholder="Nhập đánh giá của bản"
            required
          />
          <button
            type="submit"
            className="button text-white"
            disabled={loadingCreate || loadingEdit}
          >
            {loadingCreate || loadingEdit ? <Spin text="Gửi" /> : "Gửi"}
          </button>
        </div>
      </Form>
    </div>
  );
}

export default ReviewTour;

import { Form } from "react-router-dom";
import Select from "react-select";
import { useEffect, useState } from "react";

import Spin from "../common/Spin";
import { convertToSelectOptions } from "../../helper/setValueOption";

function ReviewFormAdmin({ action, isLoading, tours, review = null }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedOptionTour, setSelectedOptionTour] = useState(null);

  const optionsStar = [
    { value: "1", label: "1 sao" },
    { value: "2", label: "2 sao" },
    { value: "3", label: "3 sao" },
    { value: "4", label: "4 sao" },
    { value: "5", label: "5 sao" },
  ];

  const optionsTour = convertToSelectOptions(tours, "_id", "title");

  useEffect(() => {
    if (review !== null) {
      setSelectedOption({
        value: review.rating,
        label: review.rating + " sao",
      });

      setSelectedOptionTour({
        value: review.tour._id,
        label: review.tour.title,
      });
    }
  }, [review]);

  function handleSubmitForm(event) {
    event.preventDefault();

    const formData = {
      review: event.target.review.value,
      rating: selectedOption.value,
      tour: selectedOptionTour.value,
    };

    const data = { formData };

    if (review !== null) {
      console.log(review._id);
      data.idReview = review._id;
    }

    action(data);
  }

  return (
    <Form onSubmit={handleSubmitForm} className="mb-5">
      <div className="form-item-container">
        <div className="mb-4">
          <label htmlFor="review" className="form-label">
            Bình luận (<span className="text-red">*</span>):
          </label>
          <input
            type="text"
            id="review"
            name="review"
            className="form-control"
            placeholder="Nhập bình luận"
            defaultValue={review != null ? review.review : ""}
            required
          />
        </div>
        <div className="mb-4">
          <div className="row row-gap-4">
            <div className="col-lg-3 col-md-6 col-12">
              <label htmlFor="name" className="form-label">
                Đánh giá (<span className="text-red">*</span>):
              </label>
              <Select
                value={selectedOption}
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                options={optionsStar}
                placeholder="Chọn số sao đánh giá"
                required
              />
            </div>
            <div className="col-lg-9 col-md-6 col-12">
              <label htmlFor="name" className="form-label">
                Tour (<span className="text-red">*</span>):
              </label>
              <Select
                value={selectedOptionTour}
                defaultValue={selectedOptionTour}
                onChange={setSelectedOptionTour}
                options={optionsTour}
                placeholder="Chọn tour đánh giá"
                required
              />
            </div>
          </div>
        </div>
        <div className="my-5 w-100 d-flex justify-content-center align-items-center flex-wrap gap-3">
          <button type="reset" className="button btn-submit btn-red">
            Khôi phục
          </button>
          <button
            type="submit"
            className="button btn-submit"
            disabled={isLoading}
          >
            {isLoading ? <Spin text={"Loading..."} /> : "Xác nhận"}
          </button>
        </div>
      </div>
    </Form>
  );
}

export default ReviewFormAdmin;

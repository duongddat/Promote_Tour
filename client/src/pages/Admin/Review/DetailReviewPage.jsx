import { Await, Link, useLoaderData } from "react-router-dom";
import { Suspense, useEffect, useState } from "react";
import Select from "react-select";

import headingBorderImg from "../../../assets/img/heading-border.webp";

function DetailReviewPage() {
  const { review } = useLoaderData();
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedOptionTour, setSelectedOptionTour] = useState(null);

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

  return (
    <section>
      <div className="tour-content">
        <div className="d-flex justify-content-between align-items-center flex-wrap mt-3">
          <h5 className="table-title">Chi tiết bài viết</h5>
          <Link to="/admin/blogs" className="button d-flex gap-1 fw-bold">
            <i className="ri-file-list-3-line"></i>
            <span>Danh sách bài viết</span>
          </Link>
        </div>
        <div className="mb-2">
          <img src={headingBorderImg} alt="Heading Border Image" />
        </div>
        <div className="my-3">
          <Suspense
            fallback={<p style={{ textAlign: "center" }}>Loading data...</p>}
          >
            <Await resolve={review}>
              {(loadedReview) => (
                <div className="form-item-container">
                  <div className="mb-4">
                    <label htmlFor="review" className="form-label">
                      Bình luận (<span className="text-red">*</span>):
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue={
                        loadedReview != null ? loadedReview.review : ""
                      }
                      disabled
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
                          isDisabled
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
                          isDisabled
                        />
                      </div>
                    </div>
                  </div>
                  <p className="text-center my-5 text-footer-font">That all</p>
                </div>
              )}
            </Await>
          </Suspense>
        </div>
      </div>
    </section>
  );
}

export default DetailReviewPage;

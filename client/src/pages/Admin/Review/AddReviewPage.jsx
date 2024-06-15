import { Link, useLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";

import headingBorderImg from "../../../assets/img/heading-border.webp";
import { useAction } from "../../../hooks/useAction.js";
import ReviewForm from "../../../components/Review/ReviewFormAdmin.jsx";
import { createReview } from "../../../utils/Admin/adminHttps.js";

function AddReviewPage() {
  const { tours } = useLoaderData();
  const [loading, setLoading] = useState(false);
  const [toursData, setToursData] = useState([]);

  const { isLoading, action } = useAction(createReview, "/admin/reviews");

  useEffect(() => {
    async function getData() {
      setLoading(true);
      try {
        setToursData(await tours);
      } catch (error) {
        console.error("Error loading tour data:", error);
      }
      setLoading(false);
    }

    getData();
  }, [tours]);

  return (
    <section>
      <div className="tour-content">
        <div className="d-flex justify-content-between align-items-center flex-wrap mt-3">
          <h5 className="table-title">Thêm mới bình luận</h5>
          <Link to="/admin/reviews" className="button d-flex gap-1 fw-bold">
            <i className="ri-file-list-3-line"></i>
            <span>Danh sách bình luận</span>
          </Link>
        </div>
        <div className="mb-2">
          <img src={headingBorderImg} alt="Heading Border Image" />
        </div>
        <div className="my-3">
          {loading && <p className="text-center">Loading data....</p>}
          {!loading && (
            <ReviewForm
              tours={toursData}
              isLoading={isLoading}
              action={action}
            />
          )}
        </div>
      </div>
    </section>
  );
}

export default AddReviewPage;

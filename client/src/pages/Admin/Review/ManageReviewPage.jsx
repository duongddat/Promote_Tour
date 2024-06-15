import { Link, useLoaderData } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";

import headingBorderImg from "../../../assets/img/heading-border.webp";
import TableData from "../../../components/Table/TableData";
import ShowModal from "../../../components/common/ShowModal";
import Spin from "../../../components/common/Spin";
import { useAction } from "../../../hooks/useAction";
import { deleteReview } from "../../../utils/Admin/adminHttps";

function ManageReviewPage() {
  const { reviews: initalData } = useLoaderData();
  const { userInfo } = useSelector((state) => state.auth);
  const [discountsData, setReviewssData] = useState(initalData.reviews);
  const [totalRows, setTotalRows] = useState(initalData.totalReviews);
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false); // Disable load data when render component (react-data-table-component)
  const [modalIsOpen, setIsOpen] = useState(false);
  const { isLoading, action: actionDeleteReview } = useAction(deleteReview);
  const idRef = useRef();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  async function fetchReview(page, limit = perPage) {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8080/reviews?page=${page}&limit=${limit}`
      );

      if (!response.ok) {
        throw new Error("Could not fetch reviews.");
      }

      const resData = await response.json();
      setReviewssData(resData.data.reviews);
      setTotalRows(resData.data.totalReviews);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
    setLoading(false);
  }

  function handlePageChange(page) {
    if (!isMounted) return;

    setCurrentPage(page);
    fetchReview(page, perPage);
  }

  async function handlePerRowsChange(newPerPage) {
    if (!isMounted) return;

    setPerPage(newPerPage);
    setCurrentPage(1);
    fetchReview(1, newPerPage);
  }

  function openModal(id) {
    setIsOpen(true);
    idRef.current = id;
  }

  function closeModal() {
    setIsOpen(false);
  }

  async function handleDeleteReview() {
    await actionDeleteReview(idRef.current);

    if (!isLoading) {
      closeModal();
      fetchReview(currentPage, perPage);
    }
  }

  const columns = useMemo(
    () => [
      { name: "Bình luận", selector: (row) => row.review, sortable: true },
      {
        name: "Đánh giá",
        selector: (row) => row.rating + " sao",
        sortable: true,
      },
      { name: "Tour", selector: (row) => row.tour.title, sortable: true },
      {
        name: "Công cụ",
        cell: (row) => (
          <div className="table-action">
            <Link
              to={`/admin/reviews/${row._id}/detail`}
              className="action-btn action-btn__detail"
            >
              <i className="ri-eye-2-line"></i>
            </Link>
            {userInfo._id === row.user._id && (
              <Link
                to={`/admin/reviews/${row._id}/edit`}
                className="action-btn action-btn__edit"
              >
                <i className="ri-pencil-fill"></i>
              </Link>
            )}
            {(userInfo.role === "admin" ||
              (userInfo.role === "guide" && row.user.role !== "admin")) && (
              <div
                className="action-btn action-btn__delete"
                onClick={() => openModal(row._id)}
              >
                <i className="ri-delete-bin-2-line"></i>
              </div>
            )}
          </div>
        ),
      },
    ],
    [userInfo]
  );

  return (
    <section>
      <div className="tour-content">
        <div className="d-flex justify-content-between align-items-center flex-wrap mt-3">
          <h5 className="table-title">Danh sách bình luận</h5>
          <Link to="/admin/reviews/add" className="button d-flex gap-1 fw-bold">
            <i className="ri-add-circle-line"></i>
            <span>Thêm mới bình luận</span>
          </Link>
        </div>
        <div className="mb-2">
          <img src={headingBorderImg} alt="Heading Border Image" />
        </div>
        <TableData
          columns={columns}
          data={discountsData}
          paginationTotalRows={totalRows}
          onChangeRowsPerPage={handlePerRowsChange}
          onChangePage={handlePageChange}
          loading={loading}
        />
        <p className="mt-5 text-center text-footer-font">That all</p>
      </div>
      <ShowModal isOpen={modalIsOpen} onClose={closeModal}>
        <div className="p-3 modal-container">
          <div className="modal-close">
            <i className="ri-close-circle-fill" onClick={closeModal}></i>
          </div>
          <div className="modal-title">
            <h5 className="sm p-2">Bạn có chắc xoá bình luận này?</h5>
          </div>
          <div className="d-flex justify-content-center align-items-center column-gap-3 mt-4">
            <button
              onClick={() => handleDeleteReview()}
              className="button text-white"
              disabled={isLoading}
            >
              {isLoading ? <Spin text="Xoá..." /> : "Đồng ý"}
            </button>
            <button
              onClick={closeModal}
              className="button btn-red text-white"
              disabled={isLoading}
            >
              Đóng
            </button>
          </div>
        </div>
      </ShowModal>
    </section>
  );
}

export default ManageReviewPage;

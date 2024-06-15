import { Link, useLoaderData } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";

import headingBorderImg from "../../../assets/img/heading-border.webp";
import BookingCountdown from "../../../components/MyBooking/BookingCountDown";
import TableData from "../../../components/Table/TableData";
import { formatDateDefault } from "../../../helper/formattingDate";
import { currencyFormatter } from "../../../helper/formattingPrice";
import { useAction } from "../../../hooks/useAction";
import { deleteBookingAdmin } from "../../../utils/Admin/adminHttps";
import ShowModal from "../../../components/common/ShowModal";
import Spin from "../../../components/common/Spin";
import { useSelector } from "react-redux";

function ManageBooking() {
  const { booking: initalData } = useLoaderData();
  const { token } = useSelector((state) => state.auth);
  const [bookingData, setBookingData] = useState(initalData.booking);
  const [totalRows, setTotalRows] = useState(initalData.totalBooking);
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false); // Disable load data when render component (react-data-table-component)
  const [modalIsOpen, setIsOpen] = useState(false);

  const { isLoading, action: actionDeleteBlog } = useAction(deleteBookingAdmin);
  const idRef = useRef();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  async function fetchBooking(page, limit = perPage) {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8080/booking?page=${page}&limit=${limit}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Could not fetch posts.");
      }

      const resData = await response.json();
      setBookingData(resData.data.booking);
      setTotalRows(resData.data.totalBooking);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
    setLoading(false);
  }

  function handlePageChange(page) {
    if (!isMounted) return;

    setCurrentPage(page);
    fetchBooking(page, perPage);
  }

  async function handlePerRowsChange(newPerPage) {
    if (!isMounted) return;

    setPerPage(newPerPage);
    setCurrentPage(1);
    fetchBooking(1, newPerPage);
  }

  function openModal(id) {
    setIsOpen(true);
    idRef.current = id;
  }

  function closeModal() {
    setIsOpen(false);
  }

  async function handleDeleteItem() {
    await actionDeleteBlog(idRef.current);

    if (!isLoading) {
      closeModal();
      fetchBooking(currentPage, perPage);
    }
  }

  const columns = useMemo(
    () => [
      {
        name: "Tên tour",
        selector: (row) => row.tour.title,
        sortable: true,
      },
      {
        name: "Khách hàng",
        selector: (row) => row.user.name,
        sortable: true,
      },
      {
        name: "Số lượng",
        selector: (row) => row.guestSize + " người",
        sortable: true,
      },
      {
        name: "Ngày khởi hành",
        selector: (row) => formatDateDefault(row.bookAt),
        sortable: true,
      },
      {
        name: "Trạng thái",
        selector: (row) =>
          row.cancelled === undefined || row.cancelled === false ? (
            <BookingCountdown bookAt={row.bookAt} />
          ) : (
            <span className="text-booking booking-remaining">Yêu cầu huỷ</span>
          ),
      },
      {
        name: "Tổng tiền",
        selector: (row) => currencyFormatter.format(row.price),
        sortable: true,
        style: {
          color: "red",
          fontWeight: "bold",
        },
      },
      {
        name: "Công cụ",
        cell: (row) => (
          <div className="table-action">
            <Link
              to={`/admin/booking/${row._id}/detail`}
              className="action-btn action-btn__detail"
            >
              <i className="ri-eye-2-line"></i>
            </Link>
            <div
              className="action-btn action-btn__delete"
              onClick={() => openModal(row._id)}
            >
              <i className="ri-delete-bin-2-line"></i>
            </div>
          </div>
        ),
      },
    ],
    []
  );

  return (
    <section>
      <div className="tour-content">
        <h5 className="table-title">Danh sách bài viết</h5>
        <div className="mb-2">
          <img src={headingBorderImg} alt="Heading Border Image" />
        </div>
        <TableData
          columns={columns}
          data={bookingData}
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
            <h5 className="sm p-2">Bạn có chắc booking này?</h5>
          </div>
          <div className="d-flex justify-content-center align-items-center column-gap-3 mt-4">
            <button
              onClick={() => handleDeleteItem()}
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

export default ManageBooking;

import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";

import headingBorderImg from "../../../assets/img/heading-border.webp";
import { deleteDiscountAdmin } from "../../../utils/Admin/adminHttps";
import { useAction } from "../../../hooks/useAction";
import TableData from "../../../components/Table/TableData";
import ShowModal from "../../../components/common/ShowModal";
import Spin from "../../../components/common/Spin";
import { formatDateDefault } from "../../../helper/formattingDate";

function ManageDiscountPage() {
  const { discounts: initalData } = useLoaderData();
  const [discountsData, setDiscountsData] = useState(initalData.discounts);
  const [totalRows, setTotalRows] = useState(initalData.totalDiscounts);
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false); // Disable load data when render component (react-data-table-component)
  const [modalIsOpen, setIsOpen] = useState(false);
  const { isLoading, action: actionDeleteDiscount } =
    useAction(deleteDiscountAdmin);
  const idRef = useRef();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  async function fetchDiscount(page, limit = perPage) {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8080/discounts?page=${page}&limit=${limit}`
      );

      if (!response.ok) {
        throw new Error("Could not fetch posts.");
      }

      const resData = await response.json();
      setDiscountsData(resData.data.discounts);
      setTotalRows(resData.data.totalDiscounts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
    setLoading(false);
  }

  function handlePageChange(page) {
    if (!isMounted) return;

    setCurrentPage(page);
    fetchDiscount(page, perPage);
  }

  async function handlePerRowsChange(newPerPage) {
    if (!isMounted) return;

    setPerPage(newPerPage);
    setCurrentPage(1);
    fetchDiscount(1, newPerPage);
  }

  function openModal(id) {
    setIsOpen(true);
    idRef.current = id;
  }

  function closeModal() {
    setIsOpen(false);
  }

  async function handleDeleteDiscount() {
    await actionDeleteDiscount(idRef.current);

    if (!isLoading) {
      closeModal();
      fetchDiscount(currentPage, perPage);
    }
  }

  const columns = useMemo(
    () => [
      {
        name: "#",
        cell: (row, index) => index + 1,
      },
      {
        name: "Mã giảm giá",
        selector: (row) => row.code,
        sortable: true,
      },
      {
        name: "Danh mục",
        selector: (row) => row.country.name,
        sortable: true,
      },
      {
        name: "Phần trăm giảm giá",
        selector: (row) => row.percentage + "%",
        sortable: true,
      },
      {
        name: "Ngày hết hạn",
        selector: (row) => formatDateDefault(row.expiryDate),
        sortable: true,
      },
      {
        name: "Trạng thái",
        selector: (row) => (
          <span
            className={`text-booking ${
              row.isActive ? "booking-success" : "booking-remaining"
            }`}
          >
            {row.isActive ? "active" : "inactive"}
          </span>
        ),
      },
      {
        name: "Công cụ",
        cell: (row) => (
          <div className="table-action">
            <Link
              to={`/admin/discounts/${row._id}/detail`}
              className="action-btn action-btn__detail"
            >
              <i className="ri-eye-2-line"></i>
            </Link>
            <Link
              to={`/admin/discounts/${row._id}/edit`}
              className="action-btn action-btn__edit"
            >
              <i className="ri-pencil-fill"></i>
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
        <div className="d-flex justify-content-between align-items-center flex-wrap mt-3">
          <h5 className="table-title">Danh sách mã giảm giá</h5>
          <Link
            to="/admin/discounts/add"
            className="button d-flex gap-1 fw-bold"
          >
            <i className="ri-add-circle-line"></i>
            <span>Thêm mới mã giảm giá</span>
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
            <h5 className="sm p-2">Bạn có chắc xoá mã giảm giá này?</h5>
          </div>
          <div className="d-flex justify-content-center align-items-center column-gap-3 mt-4">
            <button
              onClick={() => handleDeleteDiscount()}
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

export default ManageDiscountPage;

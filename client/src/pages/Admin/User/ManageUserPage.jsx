import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";

import ShowModal from "../../../components/common/ShowModal";
import headingBorderImg from "../../../assets/img/heading-border.webp";
import TableData from "../../../components/Table/TableData";
import Spin from "../../../components/common/Spin";
import { useAction } from "../../../hooks/useAction";
import { deleteUserAdmin } from "../../../utils/Admin/adminHttps";
import { formatVietnameseDate } from "../../../helper/formattingDate";
import { useSelector } from "react-redux";

function ManageUserPage() {
  const { users: initalData } = useLoaderData();
  const { token } = useSelector((state) => state.auth);
  const [usersData, setUsersData] = useState(initalData.users);
  const [totalRows, setTotalRows] = useState(initalData.totalUsers);
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false); // Disable load data when render component (react-data-table-component)
  const [modalIsOpen, setIsOpen] = useState(false);
  const { isLoading, action: actionDelete } = useAction(deleteUserAdmin);
  const idRef = useRef();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  async function fetchUsers(page, limit = perPage) {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8080/users?page=${page}&limit=${limit}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Could not fetch users.");
      }

      const resData = await response.json();
      setUsersData(resData.data.users);
      setTotalRows(resData.data.totalUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
    setLoading(false);
  }

  function handlePageChange(page) {
    if (!isMounted) return;

    setCurrentPage(page);
    fetchUsers(page, perPage);
  }

  async function handlePerRowsChange(newPerPage) {
    if (!isMounted) return;

    setPerPage(newPerPage);
    setCurrentPage(1);
    fetchUsers(1, newPerPage);
  }

  function openModal(id) {
    setIsOpen(true);
    idRef.current = id;
  }

  function closeModal() {
    setIsOpen(false);
  }

  async function handleDeleteItem() {
    await actionDelete(idRef.current);

    if (!isLoading) {
      closeModal();
      fetchUsers(currentPage, perPage);
    }
  }

  const columns = useMemo(
    () => [
      { name: "Họ tên", selector: (row) => row.name, sortable: true },
      { name: "Email", selector: (row) => row.email, sortable: true },
      {
        name: "Vai trò",
        selector: (row) => (
          <span
            className={`table-item__special ${
              row.role === "admin"
                ? "role-admin"
                : row.role === "guide"
                ? "role-guide"
                : "role-user"
            }`}
          >
            Role: {row.role}
          </span>
        ),
      },
      {
        name: "Ảnh đại diện",
        selector: (row) => (
          <LazyLoadImage
            effect="blur"
            className="table-img"
            src={`${row.photo}`}
          />
        ),
      },
      {
        name: "Ngày tạo",
        selector: (row) => formatVietnameseDate(row.createdAt),
        sortable: true,
      },
      {
        name: "Công cụ",
        cell: (row) => (
          <div className="table-action">
            <Link
              to={`/admin/users/${row._id}/detail`}
              className="action-btn action-btn__detail"
            >
              <i className="ri-eye-2-line"></i>
            </Link>
            <Link
              to={`/admin/users/${row._id}/edit`}
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
          <h5 className="table-title">Danh sách người dùng</h5>
          <Link to="/admin/users/add" className="button d-flex gap-1 fw-bold">
            <i className="ri-add-circle-line"></i>
            <span>Thêm mới người dùng</span>
          </Link>
        </div>
        <div className="mb-2">
          <img src={headingBorderImg} alt="Heading Border Image" />
        </div>
        <TableData
          columns={columns}
          data={usersData}
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
            <h5 className="sm p-2">Bạn có chắc xoá người dùng này?</h5>
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

export default ManageUserPage;

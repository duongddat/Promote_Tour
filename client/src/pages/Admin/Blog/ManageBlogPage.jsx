import { useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLoaderData } from "react-router-dom";

import ShowModal from "../../../components/common/ShowModal";
import headingBorderImg from "../../../assets/img/heading-border.webp";
import TableData from "../../../components/Table/TableData";
import Spin from "../../../components/common/Spin";
import { useAction } from "../../../hooks/useAction";
import { deleteBlog } from "../../../utils/Admin/adminHttps";
import { formatVietnameseDate } from "../../../helper/formattingDate";

function ManageBlogPage() {
  const { blogs: initalData } = useLoaderData();
  const { userInfo } = useSelector((state) => state.auth);
  const [blogsData, setBlogsData] = useState(initalData.posts);
  const [totalRows, setTotalRows] = useState(initalData.totalPosts);
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false); // Disable load data when render component (react-data-table-component)
  const [modalIsOpen, setIsOpen] = useState(false);
  const { isLoading, action: actionDeleteBlog } = useAction(deleteBlog);
  const idRef = useRef();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  async function fetchBlogs(page, limit = perPage) {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8080/posts?page=${page}&limit=${limit}`
      );

      if (!response.ok) {
        throw new Error("Could not fetch posts.");
      }

      const resData = await response.json();
      setBlogsData(resData.data.posts);
      setTotalRows(resData.data.totalPosts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
    setLoading(false);
  }

  function handlePageChange(page) {
    if (!isMounted) return;

    setCurrentPage(page);
    fetchBlogs(page, perPage);
  }

  async function handlePerRowsChange(newPerPage) {
    if (!isMounted) return;

    setPerPage(newPerPage);
    setCurrentPage(1);
    fetchBlogs(1, newPerPage);
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
      fetchBlogs(currentPage, perPage);
    }
  }

  const columns = useMemo(
    () => [
      {
        name: "Tiêu đề",
        selector: (row) => row.title,
        sortable: true,
      },
      { name: "Chủ đề", selector: (row) => row.country.name, sortable: true },
      {
        name: "Người đăng",
        selector: (row) => (
          <div className="table-item__2t">
            <span>{row.user.name}</span>
            <span
              className={`table-item__special ${
                row.user.role === "admin"
                  ? "role-admin"
                  : row.user.role === "guide"
                  ? "role-guide"
                  : "role-user"
              }`}
            >
              role: {row.user.role}
            </span>
          </div>
        ),
      },
      {
        name: "Ngày đăng",
        selector: (row) => formatVietnameseDate(row.createdAt),
        sortable: true,
      },
      {
        name: "Công cụ",
        cell: (row) => (
          <div className="table-action">
            <Link
              to={`/admin/blogs/${row._id}/detail`}
              className="action-btn action-btn__detail"
            >
              <i className="ri-eye-2-line"></i>
            </Link>
            {userInfo._id === row.user._id && (
              <Link
                to={`/admin/blogs/${row._id}/edit`}
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
          <h5 className="table-title">Danh sách bài viết</h5>
          <Link to="/admin/blogs/add" className="button d-flex gap-1 fw-bold">
            <i className="ri-add-circle-line"></i>
            <span>Thêm mới bài viết</span>
          </Link>
        </div>
        <div className="mb-2">
          <img src={headingBorderImg} alt="Heading Border Image" />
        </div>
        <TableData
          columns={columns}
          data={blogsData}
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
            <h5 className="sm p-2">Bạn có chắc xoá bài viết này?</h5>
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

export default ManageBlogPage;

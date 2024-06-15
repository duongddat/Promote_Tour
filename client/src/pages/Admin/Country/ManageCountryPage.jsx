/* eslint-disable no-unused-vars */
import { Link, useLoaderData } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";

import headingBorderImg from "../../../assets/img/heading-border.webp";
import TableData from "../../../components/Table/TableData";
import ShowModal from "../../../components/common/ShowModal";
import Spin from "../../../components/common/Spin";
import { useAction } from "../../../hooks/useAction";
import { deleteCountryAdmin } from "../../../utils/Admin/adminHttps";

function ManageCountryPage() {
  const { countries: initalData } = useLoaderData();
  const [countriesData, setCountriesData] = useState(initalData.countries);
  const [totalRows, setTotalRows] = useState(initalData.totalCountries);
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false); // Disable load data when render component (react-data-table-component)
  const [modalIsOpen, setIsOpen] = useState(false);
  const { isLoading, action: actionDeleteCountry } =
    useAction(deleteCountryAdmin);
  const idRef = useRef();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  async function fetchCountries(page, limit = perPage) {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8080/countries?page=${page}&limit=${limit}`
      );

      if (!response.ok) {
        throw new Error("Could not fetch countries.");
      }

      const resData = await response.json();
      setCountriesData(resData.data.countries);
      setTotalRows(resData.data.totalCountries);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
    setLoading(false);
  }

  function handlePageChange(page) {
    if (!isMounted) return;

    setCurrentPage(page);
    fetchCountries(page, perPage);
  }

  async function handlePerRowsChange(newPerPage) {
    if (!isMounted) return;

    setPerPage(newPerPage);
    setCurrentPage(1);
    fetchCountries(1, newPerPage);
  }

  function openModal(id) {
    setIsOpen(true);
    idRef.current = id;
  }

  function closeModal() {
    setIsOpen(false);
  }

  async function handleDeleteBlog() {
    await actionDeleteCountry(idRef.current);

    if (!isLoading) {
      closeModal();
      fetchCountries(currentPage, perPage);
    }
  }

  const columns = useMemo(
    () => [
      {
        name: "#",
        cell: (row, index) => index + 1,
      },
      {
        name: "Tên quốc gia",
        selector: (row) => row.name,
        sortable: true,
      },
      {
        name: "Công cụ",
        cell: (row) => (
          <div className="table-action">
            <Link
              to={`/admin/countries/${row._id}/detail`}
              className="action-btn action-btn__detail"
            >
              <i className="ri-eye-2-line"></i>
            </Link>
            <Link
              to={`/admin/countries/${row._id}/edit`}
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
          <h5 className="table-title">Danh sách quốc gia</h5>
          <Link
            to="/admin/countries/add"
            className="button d-flex gap-1 fw-bold"
          >
            <i className="ri-add-circle-line"></i>
            <span>Thêm mới quốc gia</span>
          </Link>
        </div>
        <div className="mb-2">
          <img src={headingBorderImg} alt="Heading Border Image" />
        </div>

        <TableData
          columns={columns}
          data={countriesData}
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
            <h5 className="sm p-2">Bạn có chắc xoá quốc gia này?</h5>
          </div>
          <div className="d-flex justify-content-center align-items-center column-gap-3 mt-4">
            <button
              onClick={() => handleDeleteBlog()}
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

export default ManageCountryPage;

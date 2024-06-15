import ReactPaginate from "react-paginate";
import "./Pagination.css";

function Pagination({ pageCount, onPageClick, pageCurrent = 1 }) {
  return (
    <div className="text-center">
      <ReactPaginate
        containerClassName="d-flex p-0 flex-wrap align-items-center justify-content-center"
        pageClassName="d-flex align-items-center justify-content-center btn-pagination"
        activeClassName="btn-active"
        breakLabel="..."
        nextLabel={
          <span
            className={`d-flex align-items-center justify-content-center btn-pagination btn-pagination-icon btn-icon ${
              pageCount === 1 ? "btn-disable" : ""
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M16 12L10 18V6L16 12Z"></path>
            </svg>
          </span>
        }
        onPageChange={onPageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel={
          <span
            className={`d-flex align-items-center justify-content-center btn-pagination btn-pagination-icon btn-icon ${
              pageCount === 1 ? "btn-disable disabled" : ""
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M8 12L14 6V18L8 12Z"></path>
            </svg>
          </span>
        }
        renderOnZeroPageCount={null}
        forcePage={pageCurrent - 1}
      />
    </div>
  );
}

export default Pagination;

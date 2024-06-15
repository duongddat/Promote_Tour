import TourItem from "./TourItem.jsx";

import NoData from "../../assets/img/NoData.png";
import Pagination from "../Pagination/Pagination.jsx";

function TourListPagination({
  tours,
  pageNumber,
  pageCurrent,
  classes,
  onPagination,
}) {
  const handlePageClick = (event) => {
    const page = event.selected + 1;
    onPagination(page);
  };

  return (
    <div className="row row-gap-5 sticky">
      {tours.length > 0 &&
        tours.map((tour) => (
          <div key={tour.id} className={classes}>
            <TourItem tour={tour} />
          </div>
        ))}
      {tours.length === 0 && (
        <div className="card card-message">
          <div className="message-img">
            <img src={NoData} alt="Message image" />
          </div>
          <div className="d-flex flex-column gap-2">
            <h4>Rất tiết, HoYoViVu không thể tìm thấy kết quả phù hợp</h4>
            <p className="md" style={{ color: "#475467" }}>
              Vui lòng tìm kiếm tour du lịch khác!!!
            </p>
          </div>
        </div>
      )}
      {tours.length > 0 && (
        <Pagination
          pageCount={pageNumber}
          pageCurrent={pageCurrent}
          onPageClick={handlePageClick}
        />
      )}
    </div>
  );
}

export default TourListPagination;

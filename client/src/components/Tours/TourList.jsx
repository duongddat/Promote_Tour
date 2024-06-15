import TourItem from "./TourItem.jsx";

import NoData from "../../assets/img/NoData.png";
// import tours from "../../assets/data/tour";

function TourList({ tours, classes }) {
  return (
    <div className="row row-gap-5 sticky">
      {tours.length > 0 &&
        tours.map((tour) => (
          <div key={tour.id} className={classes}>
            <TourItem tour={tour} />
          </div>
        ))}
      {tours.length === 0 && (
        <div className="card card-message m-4 d-flex justify-content-center">
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
    </div>
  );
}

export default TourList;

import { Link } from "react-router-dom";
import "./Tours.css";
import { currencyFormatter } from "../../helper/formattingPrice";
import { LazyLoadImage } from "react-lazy-load-image-component";

function TourItem({ tour }) {
  return (
    <div className="card">
      <div className="card__header">
        <div className="card__picture">
          <LazyLoadImage
            effect="blur"
            className="card__picture-img"
            src={`${tour.imageCover}`}
            alt={tour.title}
          />
        </div>
        <div className="card__ratings item__ratings d-flex justify-content-center align-items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M11.9998 17L6.12197 20.5902L7.72007 13.8906L2.48926 9.40983L9.35479 8.85942L11.9998 2.5L14.6449 8.85942L21.5104 9.40983L16.2796 13.8906L17.8777 20.5902L11.9998 17ZM11.9998 14.6564L14.8165 16.3769L14.0507 13.1664L16.5574 11.0192L13.2673 10.7554L11.9998 7.70792L10.7323 10.7554L7.44228 11.0192L9.94893 13.1664L9.18311 16.3769L11.9998 14.6564Z"></path>
          </svg>
          <label className="xs">{`${tour.ratingsAverage} ratings (${tour.ratingsQuantity})`}</label>
        </div>
        {tour.priceDiscount && (
          <div className="ribbon">
            <span>Giảm giá</span>
          </div>
        )}
        <h3 className="heading-tertirary">
          <span>{tour.title}</span>
        </h3>
      </div>
      <div className="card__details">
        <h4 className="card__sub-heading">Thời lượng: {tour.duration} ngày</h4>
        <div className="card__data">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="card__icon"
          >
            <path d="M12 20.8995L16.9497 15.9497C19.6834 13.2161 19.6834 8.78392 16.9497 6.05025C14.2161 3.31658 9.78392 3.31658 7.05025 6.05025C4.31658 8.78392 4.31658 13.2161 7.05025 15.9497L12 20.8995ZM12 23.7279L5.63604 17.364C2.12132 13.8492 2.12132 8.15076 5.63604 4.63604C9.15076 1.12132 14.8492 1.12132 18.364 4.63604C21.8787 8.15076 21.8787 13.8492 18.364 17.364L12 23.7279ZM12 13C13.1046 13 14 12.1046 14 11C14 9.89543 13.1046 9 12 9C10.8954 9 10 9.89543 10 11C10 12.1046 10.8954 13 12 13ZM12 15C9.79086 15 8 13.2091 8 11C8 8.79086 9.79086 7 12 7C14.2091 7 16 8.79086 16 11C16 13.2091 14.2091 15 12 15Z"></path>
          </svg>
          <span>{tour.country.name}</span>
        </div>
        <div className="card__data">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="card__icon"
          >
            <path d="M6 4H4V2H20V4H18V6C18 7.61543 17.1838 8.91468 16.1561 9.97667C15.4532 10.703 14.598 11.372 13.7309 12C14.598 12.628 15.4532 13.297 16.1561 14.0233C17.1838 15.0853 18 16.3846 18 18V20H20V22H4V20H6V18C6 16.3846 6.81616 15.0853 7.8439 14.0233C8.54682 13.297 9.40202 12.628 10.2691 12C9.40202 11.372 8.54682 10.703 7.8439 9.97667C6.81616 8.91468 6 7.61543 6 6V4ZM8 4V6C8 6.68514 8.26026 7.33499 8.77131 8H15.2287C15.7397 7.33499 16 6.68514 16 6V4H8ZM12 13.2219C10.9548 13.9602 10.008 14.663 9.2811 15.4142C9.09008 15.6116 8.92007 15.8064 8.77131 16H15.2287C15.0799 15.8064 14.9099 15.6116 14.7189 15.4142C13.992 14.663 13.0452 13.9602 12 13.2219Z"></path>
          </svg>
          <span>{tour.duration} ngày</span>
        </div>
        <div className="card__data">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="card__icon"
          >
            <path d="M12.382 3C12.7607 3 13.107 3.214 13.2764 3.55279L14 5H20C20.5523 5 21 5.44772 21 6V17C21 17.5523 20.5523 18 20 18H13.618C13.2393 18 12.893 17.786 12.7236 17.4472L12 16H5V22H3V3H12.382ZM11.7639 5H5V14H13.2361L14.2361 16H19V7H12.7639L11.7639 5Z"></path>
          </svg>
          <span>{tour.locations.length} điểm dừng</span>
        </div>
        <div className="card__data">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="card__icon"
          >
            <path d="M4 22C4 17.5817 7.58172 14 12 14C16.4183 14 20 17.5817 20 22H18C18 18.6863 15.3137 16 12 16C8.68629 16 6 18.6863 6 22H4ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM12 11C14.21 11 16 9.21 16 7C16 4.79 14.21 3 12 3C9.79 3 8 4.79 8 7C8 9.21 9.79 11 12 11Z"></path>
          </svg>
          <span>{tour.maxGroupSize} người</span>
        </div>
      </div>
      <div className="card__footer d-flex justify-content-between align-items-center">
        <div className="d-flex flex-column">
          <div className="card__footer-price">
            <span className="card__footer-value">
              {tour.priceDiscount
                ? currencyFormatter.format(tour.priceDiscount)
                : currencyFormatter.format(tour.price)}
            </span>
            <span className="card__footer-text"> / khách</span>
          </div>
          {tour.priceDiscount && (
            <span className="card__footer-priceDiscount">
              {currencyFormatter.format(tour.price)}
            </span>
          )}
        </div>
        <Link className="button text-center" to={`/tours/detail/${tour.slug}`}>
          Xem chi tiết
        </Link>
      </div>
    </div>
  );
}

export default TourItem;

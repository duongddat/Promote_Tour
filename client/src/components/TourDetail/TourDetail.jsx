import { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { io } from "socket.io-client";
import parse from "html-react-parser";

import TourImgGallery from "./TourImgGallery.jsx";
import headingBorderImg from "../../assets/img/heading-border.webp";
import { currencyFormatter } from "../../helper/formattingPrice";
import MapBox from "./MapBox.jsx";
import ReviewTour from "./ReviewTour.jsx";
import MapBoxStart from "./MapBoxStart.jsx";
import noDataMessage from "../../assets/img/no-data-message.png";
import ShowModal from "../common/ShowModal.jsx";
import "./TourDetail.css";

function TourDetail({ tour }) {
  const [tourData, setTourData] = useState(tour);
  const [modalIsOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const socket = io(import.meta.env.VITE_API_SITE_URL);

    socket.on("update_reviews", (newTour) => {
      setTourData(newTour);
    });
  }, []);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <div className="tour-content">
        <div className="tour__header">
          <div className="d-flex flex-wrap gap-16">
            <div className="d-flex flex-column flex-grow-1 gap-16">
              <h4 className="fw-bold tour-title">{tourData.title}</h4>
              <div className="d-flex gap-8">
                <div className="item__ratings d-flex justify-content-center align-items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M11.9998 17L6.12197 20.5902L7.72007 13.8906L2.48926 9.40983L9.35479 8.85942L11.9998 2.5L14.6449 8.85942L21.5104 9.40983L16.2796 13.8906L17.8777 20.5902L11.9998 17ZM11.9998 14.6564L14.8165 16.3769L14.0507 13.1664L16.5574 11.0192L13.2673 10.7554L11.9998 7.70792L10.7323 10.7554L7.44228 11.0192L9.94893 13.1664L9.18311 16.3769L11.9998 14.6564Z"></path>
                  </svg>
                  <label className="xs">{`${tourData.ratingsAverage} ratings (${tourData.ratingsQuantity})`}</label>
                </div>
              </div>
            </div>
            <div className="tour-wrapper__price">
              <span className="tour-price tour-title">
                {tourData.priceDiscount
                  ? currencyFormatter.format(tour.priceDiscount)
                  : currencyFormatter.format(tour.price)}
                /khách
              </span>
              {tourData.priceDiscount && (
                <span className="tour-price__old">
                  {currencyFormatter.format(tour.price)}
                </span>
              )}
            </div>
          </div>
          <div className="mt-2">
            <img src={headingBorderImg} alt="Heading Border Image" />
          </div>
        </div>
        <div className="tour-ImgCover">
          <LazyLoadImage
            effect="blur"
            src={`${tourData.imageCover}`}
            alt={tourData.title}
            className="img-tour__cover"
          />
        </div>
        <div className="mt-4 p-2">
          <div className="row row-gap-4 mb-4">
            <div className="overview-box__group col-md-6">
              <h5 className="heading-secondary">Thông tin nhanh</h5>
              <div className="mb-3">
                <img src={headingBorderImg} alt="Heading Border Image" />
              </div>
              <div className="overview-box__detail">
                <svg
                  className="overview-box__icon"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 20.8995L16.9497 15.9497C19.6834 13.2161 19.6834 8.78392 16.9497 6.05025C14.2161 3.31658 9.78392 3.31658 7.05025 6.05025C4.31658 8.78392 4.31658 13.2161 7.05025 15.9497L12 20.8995ZM12 23.7279L5.63604 17.364C2.12132 13.8492 2.12132 8.15076 5.63604 4.63604C9.15076 1.12132 14.8492 1.12132 18.364 4.63604C21.8787 8.15076 21.8787 13.8492 18.364 17.364L12 23.7279ZM12 13C13.1046 13 14 12.1046 14 11C14 9.89543 13.1046 9 12 9C10.8954 9 10 9.89543 10 11C10 12.1046 10.8954 13 12 13ZM12 15C9.79086 15 8 13.2091 8 11C8 8.79086 9.79086 7 12 7C14.2091 7 16 8.79086 16 11C16 13.2091 14.2091 15 12 15Z"></path>
                </svg>
                <span className="overview-box__label">Quốc gia:</span>
                <span className="overview-box__text md">
                  {tourData.country.name}
                </span>
              </div>
              <div className="overview-box__detail">
                <svg
                  className="overview-box__icon"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M6 4H4V2H20V4H18V6C18 7.61543 17.1838 8.91468 16.1561 9.97667C15.4532 10.703 14.598 11.372 13.7309 12C14.598 12.628 15.4532 13.297 16.1561 14.0233C17.1838 15.0853 18 16.3846 18 18V20H20V22H4V20H6V18C6 16.3846 6.81616 15.0853 7.8439 14.0233C8.54682 13.297 9.40202 12.628 10.2691 12C9.40202 11.372 8.54682 10.703 7.8439 9.97667C6.81616 8.91468 6 7.61543 6 6V4ZM8 4V6C8 6.68514 8.26026 7.33499 8.77131 8H15.2287C15.7397 7.33499 16 6.68514 16 6V4H8ZM12 13.2219C10.9548 13.9602 10.008 14.663 9.2811 15.4142C9.09008 15.6116 8.92007 15.8064 8.77131 16H15.2287C15.0799 15.8064 14.9099 15.6116 14.7189 15.4142C13.992 14.663 13.0452 13.9602 12 13.2219Z"></path>
                </svg>
                <span className="overview-box__label">Thời lượng:</span>
                <span className="overview-box__text md">
                  {tourData.duration} ngày
                </span>
              </div>
              <div className="overview-box__detail">
                <svg
                  className="overview-box__icon"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M2 22C2 17.5817 5.58172 14 10 14C14.4183 14 18 17.5817 18 22H2ZM10 13C6.685 13 4 10.315 4 7C4 3.685 6.685 1 10 1C13.315 1 16 3.685 16 7C16 10.315 13.315 13 10 13ZM17.3628 15.2332C20.4482 16.0217 22.7679 18.7235 22.9836 22H20C20 19.3902 19.0002 17.0139 17.3628 15.2332ZM15.3401 12.9569C16.9728 11.4922 18 9.36607 18 7C18 5.58266 17.6314 4.25141 16.9849 3.09687C19.2753 3.55397 21 5.57465 21 8C21 10.7625 18.7625 13 16 13C15.7763 13 15.556 12.9853 15.3401 12.9569Z"></path>
                </svg>
                <span className="overview-box__label">Tối đa:</span>
                <span className="overview-box__text md">
                  {tourData.maxGroupSize} người
                </span>
              </div>
            </div>
            <div className="overview-box__group col-md-6">
              <h5 className="heading-secondary">Hướng dẫn viên</h5>
              <div className="mb-3">
                <img src={headingBorderImg} alt="Heading Border Image" />
              </div>
              {tourData.guides.length > 0 &&
                tour.guides.map((guide) => (
                  <div key={guide._id} className="overview-box__detail">
                    <LazyLoadImage
                      effect="blur"
                      className="overview-box__img"
                      src={`${guide.photo}`}
                      alt={guide.name}
                    />
                    <div className="d-flex flex-column">
                      <span className="overview-box__label">Tour guide</span>
                      <span className="overview-box__text md">
                        {guide.name}
                      </span>
                    </div>
                  </div>
                ))}
              {tourData.guides.length === 0 && (
                <div className="text-center md text-message">
                  Đang cập nhật...
                </div>
              )}
            </div>
          </div>
          {tourData.startLocation && (
            <div className="overview-box__group mb-4">
              <h5 className="heading-secondary">Thông tin khởi hành</h5>
              <div className="mb-3">
                <img src={headingBorderImg} alt="Heading Border Image" />
              </div>
              <div className="row row-gap-4">
                <div className="col-lg-6 col-md-6 col-12">
                  <div className="overview-box__detail flex-wrap">
                    <div className="d-flex align-items-center gap-15">
                      <svg
                        className="overview-box__icon"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM16.0043 12.8777C15.6589 12.3533 15.4097 11.9746 14.4622 12.1248C12.6717 12.409 12.4732 12.7224 12.3877 13.2375L12.3636 13.3943L12.3393 13.5597C12.2416 14.2428 12.2453 14.5012 12.5589 14.8308C13.8241 16.1582 14.582 17.115 14.8116 17.6746C14.9237 17.9484 15.2119 18.7751 15.0136 19.5927C16.2372 19.1066 17.3156 18.3332 18.1653 17.3559C18.2755 16.9821 18.3551 16.5166 18.3551 15.9518V15.8472C18.3551 14.9247 18.3551 14.504 17.7031 14.1314C17.428 13.9751 17.2227 13.881 17.0582 13.8064C16.691 13.6394 16.4479 13.5297 16.1198 13.0499C16.0807 12.9928 16.0425 12.9358 16.0043 12.8777ZM12 3.83333C9.68259 3.83333 7.59062 4.79858 6.1042 6.34896C6.28116 6.47186 6.43537 6.64453 6.54129 6.88256C6.74529 7.34029 6.74529 7.8112 6.74529 8.22764C6.74488 8.55621 6.74442 8.8672 6.84992 9.09302C6.99443 9.40134 7.6164 9.53227 8.16548 9.64736C8.36166 9.68867 8.56395 9.73083 8.74797 9.78176C9.25405 9.92233 9.64554 10.3765 9.95938 10.7412C10.0896 10.8931 10.2819 11.1163 10.3783 11.1717C10.4286 11.1356 10.59 10.9608 10.6699 10.6735C10.7307 10.4547 10.7134 10.2597 10.6239 10.1543C10.0648 9.49445 10.0952 8.2232 10.268 7.75495C10.5402 7.01606 11.3905 7.07058 12.012 7.11097C12.2438 7.12589 12.4626 7.14023 12.6257 7.11976C13.2482 7.04166 13.4396 6.09538 13.575 5.91C13.8671 5.50981 14.7607 4.9071 15.3158 4.53454C14.3025 4.08382 13.1805 3.83333 12 3.83333Z"></path>
                      </svg>
                      <span className="overview-box__label">Địa điểm:</span>
                    </div>
                    <span className="overview-box__text md">
                      {tourData.startLocation.address}
                    </span>
                  </div>
                  <div className="overview-box__detail flex-wrap">
                    <div className="d-flex align-items-center gap-15">
                      <div>
                        <svg
                          className="overview-box__icon"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M17.0839 15.812C19.6827 13.0691 19.6379 8.73845 16.9497 6.05025C14.2161 3.31658 9.78392 3.31658 7.05025 6.05025C4.36205 8.73845 4.31734 13.0691 6.91612 15.812C7.97763 14.1228 9.8577 13 12 13C14.1423 13 16.0224 14.1228 17.0839 15.812ZM12 23.7279L5.63604 17.364C2.12132 13.8492 2.12132 8.15076 5.63604 4.63604C9.15076 1.12132 14.8492 1.12132 18.364 4.63604C21.8787 8.15076 21.8787 13.8492 18.364 17.364L12 23.7279ZM12 12C10.3431 12 9 10.6569 9 9C9 7.34315 10.3431 6 12 6C13.6569 6 15 7.34315 15 9C15 10.6569 13.6569 12 12 12Z"></path>
                        </svg>
                      </div>
                      <span className="overview-box__label">
                        Tập trung đón khách:
                      </span>
                    </div>
                    <span className="overview-box__text md">
                      {tourData.startLocation.description}
                    </span>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-12">
                  <div className="overview-box__detail mb-3">
                    <svg
                      className="overview-box__icon"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M16.9497 11.9497C18.7347 10.1648 19.3542 7.65558 18.8081 5.36796L21.303 4.2987C21.5569 4.18992 21.8508 4.30749 21.9596 4.56131C21.9862 4.62355 22 4.69056 22 4.75827V19L15 22L9 19L2.69696 21.7013C2.44314 21.8101 2.14921 21.6925 2.04043 21.4387C2.01375 21.3765 2 21.3094 2 21.2417V7L5.12892 5.65904C4.70023 7.86632 5.34067 10.2402 7.05025 11.9497L12 16.8995L16.9497 11.9497ZM15.5355 10.5355L12 14.0711L8.46447 10.5355C6.51184 8.58291 6.51184 5.41709 8.46447 3.46447C10.4171 1.51184 13.5829 1.51184 15.5355 3.46447C17.4882 5.41709 17.4882 8.58291 15.5355 10.5355Z"></path>
                    </svg>
                    <div className="overview-box__label">
                      Bản đồ điểm khởi hành:
                    </div>
                  </div>
                  <MapBoxStart startLocation={tourData.startLocation} />
                </div>
              </div>
            </div>
          )}
          <div className="description-box">
            <h4 className="heading-secondary">Thông tin về {tourData.title}</h4>
            <div className="mb-3">
              <img src={headingBorderImg} alt="Heading Border Image" />
            </div>
            <div className="description__text  ql-editor">
              {parse(tour.description)}
            </div>
            <div className="text-detail" onClick={() => openModal()}>
              {">> Xem bản đồ"}
            </div>
          </div>
        </div>
        {/* ======================Gallery section (start)=========================== */}
        <div className="p-2 mb-4">
          <h4 className="heading-secondary">Giới thiệu</h4>
          <div className="mb-3">
            <img src={headingBorderImg} alt="Heading Border Image" />
          </div>
          {tourData.images.length > 0 && (
            <TourImgGallery images={tourData.images} />
          )}
          {tourData.images.length === 0 && (
            <div className="text-center md text-message">
              Đang cập nhật hình ảnh...
            </div>
          )}
        </div>
        {/* =====================Gallery section (end)====================== */}
      </div>
      <div className="tour-content mt-3">
        {/* =======================Review section(start)============================ */}
        <div className="mt-2 p-2 tour__reviews">
          <h4 className="heading-secondary">
            Đánh giá ({tourData.ratingsQuantity})
          </h4>
          <div className="mb-3">
            <img src={headingBorderImg} alt="Heading Border Image" />
          </div>
          <ReviewTour reviews={tourData.reviews} tourId={tourData._id} />
        </div>
        {/* =======================Review section (end)============================= */}
      </div>
      {/* =========================Map section (start)========================== */}
      <ShowModal isOpen={modalIsOpen} onClose={closeModal}>
        <div className="p-3 modal-container">
          <div className="modal-close">
            <i className="ri-close-circle-fill" onClick={closeModal}></i>
          </div>
          <div className="modal-content map-content">
            <h4 className="heading-secondary">Bản đồ</h4>
            <div className="mb-3">
              <img src={headingBorderImg} alt="Heading Border Image" />
            </div>
            {tourData.locations.length > 0 && (
              <MapBox locations={tourData.locations} heightMap={400} />
            )}
            {tourData.locations.length === 0 && (
              <div className="mhy-data-lg medium-heigth">
                <img src={noDataMessage} alt="No data" />
                <p className="mhy-data-lg_text">Đang cập nhật địa điểm~</p>
              </div>
            )}
          </div>
        </div>
      </ShowModal>
      {/* =======================Map section (end)================================ */}
    </>
  );
}

export default TourDetail;

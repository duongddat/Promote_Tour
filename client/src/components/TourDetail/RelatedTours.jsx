// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";

// import required modules
import { Pagination, Autoplay } from "swiper/modules";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";

import { currencyFormatter } from "../../helper/formattingPrice";

function RelatedTours({ relatedTours }) {
  return (
    <>
      {relatedTours.length > 0 && (
        <div className="tour-content p-0">
          <Swiper
            loop={true}
            spaceBetween={30}
            pagination={{
              clickable: true,
            }}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            modules={[Autoplay, Pagination]}
            className="mySwiper"
          >
            {relatedTours.map((tour, i) => (
              <SwiperSlide key={`${i}`}>
                <Link
                  to={`/tours/detail/${tour.slug}`}
                  className="tour-related"
                >
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
                  <LazyLoadImage
                    effect="blur"
                    src={`${tour.imageCover}`}
                    alt={i}
                    className="img-gallery"
                  />
                  <div className="tour-ralated__bottom">
                    <h6>{tour.title}</h6>
                    <div className="tour-related__price">
                      {tour.priceDiscount
                        ? currencyFormatter.format(tour.priceDiscount)
                        : currencyFormatter.format(tour.price)}
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
      {relatedTours.length === 0 && (
        <p className="mt-3 text-center text-footer-font">
          Không có tour liên quan!!!
        </p>
      )}
    </>
  );
}

export default RelatedTours;

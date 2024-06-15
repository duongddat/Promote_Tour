// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { LazyLoadImage } from "react-lazy-load-image-component";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import ava01 from "../../assets/img/ava-3.jpg";
import "./Testimonial.css";

function Testimonial({ reviews }) {
  return (
    <Swiper
      slidesPerView={3}
      spaceBetween={30}
      pagination={{
        clickable: true,
      }}
      modules={[Autoplay, Pagination]}
      autoplay={{
        delay: 2000,
        disableOnInteraction: false,
      }}
      breakpoints={{
        320: {
          slidesPerView: 1,
        },
        640: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
      }}
    >
      {reviews.map((review) => (
        <SwiperSlide key={review._id}>
          <div className="testimonial py-4 px-3">
            <div className="swiper-client-msg">
              <p>{review.review}</p>
            </div>
            <div className="swiper-client-data d-flex justify-content-center align-items-center gap-4 mt-3">
              <LazyLoadImage
                src={`http://localhost:8080/img/user/${review.user.photo}`}
                alt={review.user._id}
              />
              <div className="client-data-details">
                <h6 className="mb-0 mt-3">{review.user.name}</h6>
                <p>Role: {review.user.role}</p>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default Testimonial;

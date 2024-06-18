// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";

// import required modules
import { Pagination, Autoplay } from "swiper/modules";
import { LazyLoadImage } from "react-lazy-load-image-component";

export default function App({ images }) {
  return (
    <>
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
        {images.map((img, i) => (
          <SwiperSlide key={i}>
            <LazyLoadImage
              effect="blur"
              src={`${img}`}
              alt={i}
              className="img-gallery"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

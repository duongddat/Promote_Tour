import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import "./BlogSwiperGallery.css";

function BlogSwiperGallery({ photos }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <div>
      {photos && (
        <>
          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={10}
            slidesPerView={5}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="article-swiper-wrapper"
          >
            {photos.map((photo, index) => (
              <SwiperSlide key={index}>
                <img className="article-swiper-thumbs" src={`${photo}`} />
              </SwiperSlide>
            ))}
          </Swiper>
          <Swiper
            style={{
              "--swiper-navigation-color": "#fff",
              "--swiper-pagination-color": "#fff",
            }}
            spaceBetween={10}
            thumbs={{
              swiper:
                thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
            }}
            modules={[FreeMode, Thumbs]}
            className="article-swiper-slider"
          >
            {photos.map((photo, index) => (
              <SwiperSlide key={index}>
                <img className="article-swiper-img" src={`${photo}`} />
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      )}
      {!photos && <span className="sm">Đang cập nhật ảnh...</span>}
    </div>
  );
}

export default BlogSwiperGallery;

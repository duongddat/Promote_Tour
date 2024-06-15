import { Suspense } from "react";
import { Await, useLoaderData, Link } from "react-router-dom";

import Subtitle from "../../../shared/Subtitle";
import heroImg from "../../../assets/img/hero-img01.jpg";
import heroImg02 from "../../../assets/img/hero-img02.jpg";
import heroVideo from "../../../assets/video/hero-video.mp4";
import worldImg from "../../../assets/img/world.png";
import headingBorderImg from "../../../assets/img/heading-border.webp";
import experienceImg from "../../../assets/img/tour.webp";

import "./HomePage.css";
import SearchBar from "../../../shared/SearchBar";
import TourList from "../../../components/Tours/TourList";
import ServiceList from "../../../components/Service/ServiceList";
import CountryList from "../../../components/CountryHeader/CountryList";
import MasonnryImageGallery from "../../../components/Gallery/MasonnryImageGallery";
import Testimonial from "../../../components/Testimonial/Testimonial";

export default function HomePage() {
  const { tours, countries, reviews } = useLoaderData();
  return (
    <>
      {/*========================Hero section(start)===============================*/}
      <section>
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="hero__content">
                <div className="hero__subtitle d-flex align-items-center">
                  <Subtitle subtitle="Know Before You Go" />
                  <img loading="lazy" src={worldImg} alt="World Image" />
                </div>
                <h1>
                  Traveling opens the door to creating
                  <span className="hinglight"> memories</span>
                </h1>
                <p>
                  Tận hưởng sự xa hoa và đẳng cấp tối đa với các tour du lịch
                  mới nhất và phổ biến nhất. Khám phá một hành trình tuyệt vời
                  đưa bạn vào thế giới của sự sang trọng, tiện nghi và trải
                  nghiệm không thể quên.
                </p>
                <div>
                  <img src={headingBorderImg} alt="Heading Border Image" />
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-md-4">
              <div className="hero__img-box">
                <img src={heroImg} alt="Hero Image" />
              </div>
            </div>
            <div className="col-lg-2 col-md-4">
              <div className="hero__img-box mt-4">
                <video src={heroVideo} alt="Hero Video" muted autoPlay loop />
              </div>
            </div>
            <div className="col-lg-2 col-md-4">
              <div className="hero__img-box mt-5-md-size">
                <img src={heroImg02} alt="Hero Image 02" />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*========================Hero section(end)===============================*/}
      <SearchBar />
      {/*=========================== Featured tour section (start)=========================== */}
      <section className="mt-5">
        <div className="container">
          <div className="row align-items-center mb-5">
            <div className="col-lg-6 gap-40">
              <h5 className="services__subtitle">What about tour</h5>
              <h3 className="header__title">
                Tour du lịch mới và phổ biến nhất
              </h3>
              <div>
                <img src={headingBorderImg} alt="Heading Border Image" />
              </div>
            </div>
            <div className="col-lg-6">
              <p className="lg services__description">
                Chuyên tour du lịch Cao cấp giá rẻ đầu tiên tại Việt Nam. Với
                sản phẩm tour đa dạng phong phú, dịch vụ chất lượng và uy tín.
                Mở ra nhiều trải nghiệm mới mẻ cùng chúng tôi HoYoViVu
              </p>
            </div>
          </div>
          <div className="mt-10">
            <Suspense
              fallback={<p style={{ textAlign: "center" }}>Loading Tour...</p>}
            >
              <Await resolve={tours}>
                {(loadedTours) => (
                  <TourList
                    tours={loadedTours}
                    classes="col-xl-3 col-lg-4 col-md-6 col-sm-12"
                  />
                )}
              </Await>
            </Suspense>
          </div>
        </div>
      </section>
      <div className="d-flex justify-content-center">
        <Link
          to="/tours"
          className="button btn-see-more d-flex align-items-center"
        >
          <div className="md me-2">Xem tất cả tour</div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
          </svg>
        </Link>
      </div>
      {/*=========================== Featured tour section (end)=========================== */}
      {/*========================== Service section (start)================================== */}
      <section>
        <div className="section-bg">
          <div className="container p-5">
            <div className="row align-items-center mb-5">
              <div className="col-lg-3 gap-40">
                <h5 className="services__subtitle">What we service</h5>
                <h3 className="header__title">
                  HoYoViVu phục vụ bạn với những dịch vụ tốt nhất!
                </h3>
                <div>
                  <img src={headingBorderImg} alt="Heading Border Image" />
                </div>
              </div>
              <div className="col-lg-9">
                <ServiceList />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*========================== Service section (end)================================== */}
      {/*=========================== Country section (start) ==============================*/}
      <section>
        <div className="section-bg section-bg-color">
          <div className="container section-container">
            <div className="section-header text-center gap-16">
              <div className="section-title">
                <h4 className="header__title">Các địa điểm của HoYoViVu</h4>
              </div>
              <label className="section-description lg">
                Khám phá vẻ đẹp tuyệt vời của những địa điểm du lịch: Hành trình
                khám phá vẻ đẹp và độc đáo của những quốc gia tuyệt vời trên thế
                giới
              </label>
              <div>
                <img src={headingBorderImg} alt="Heading Border Image" />
              </div>
            </div>
            <div className="mt-5">
              <Suspense
                fallback={
                  <p style={{ textAlign: "center" }}>Loading Country...</p>
                }
              >
                <Await resolve={countries}>
                  {(loadedCountries) => (
                    <CountryList countries={loadedCountries} />
                  )}
                </Await>
              </Suspense>
            </div>
          </div>
        </div>
      </section>
      {/*=========================== Country section (end) ==============================*/}
      {/*=========================== Experience section (start) ==============================*/}
      <section>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="experience__content">
                <Subtitle subtitle="Experience" />
                <h4 className="header__title">
                  Với tất cả kinh nghiệm của chúng tôi
                  <br /> chúng tôi sẽ phục vụ bạn
                </h4>
                <p>
                  Sự tận tâm và am hiểu về nhu cầu của khách hàng là chìa khóa
                  để tạo ra trải nghiệm du lịch đặc biệt.
                  <br /> Chúng tôi luôn cố gắng tạo ra một không khí thoải mái
                  và giao tiếp tích cực, giúp du khách cảm thấy như là một phần
                  của cộng đồng du lịch.
                </p>
              </div>
              <div className="counter__wrapper d-flex align-item-center gap-5">
                <div className="counter__box">
                  <span>12k+</span>
                  <h6>Follower</h6>
                </div>
                <div className="counter__box">
                  <span>2k+</span>
                  <h6>Member</h6>
                </div>
                <div className="counter__box">
                  <span>6k+</span>
                  <h6>Tour</h6>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="experience__img">
                <img src={experienceImg} alt="Experience imgae" />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*=========================== Experience section (end) ==============================*/}
      {/*=========================== Gallery section (start) ==============================*/}
      <section>
        <div className="section-bg p-5">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <Subtitle subtitle="Gallery" />
                <h4 className="gallery__title header__title">
                  Bộ sưu tập tour du lịch của khách hàng
                </h4>
              </div>
              <div className="col-lg-12">
                <MasonnryImageGallery />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*=========================== Gallery section (end) ==============================*/}
      {/*=========================== Testimonial section (start) ==============================*/}
      <section>
        <div className="section-bg section-bg-color p-5">
          <div className="container">
            <div className="row d-flex align-items-center">
              <div className="col-lg-6">
                <Subtitle subtitle="Testimonial" />
                <h4 className="testimonial__title header__title">
                  Đánh giá từ những người đã trải nghiệm
                </h4>
                <div>
                  <img src={headingBorderImg} alt="Heading Border Image" />
                </div>
              </div>
              <div className="col-lg-6">
                <p className="lg services__description">
                  Khách hàng chia sẻ về những kỷ niệm tuyệt vời các tour du lịch
                  với chúng tôi.
                </p>
              </div>
            </div>
            <div className="row mt-5">
              <Suspense
                fallback={
                  <p style={{ textAlign: "center" }}>Loading Review...</p>
                }
              >
                <Await resolve={reviews}>
                  {(loadedReviews) => <Testimonial reviews={loadedReviews} />}
                </Await>
              </Suspense>
            </div>
          </div>
        </div>
      </section>
      {/*=========================== Testimonial section (end) ==============================*/}
    </>
  );
}

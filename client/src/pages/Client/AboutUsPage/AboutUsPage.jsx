import { Typewriter } from "react-simple-typewriter";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";

import AboutGif from "../../../assets/img/about.gif";
import CurveImg from "../../../assets/img/curve.png";
import AboutSocail from "../../../assets/img/about-travel.png";
import AboutImg1 from "../../../assets/img/about-1.png";
import AboutImg2 from "../../../assets/img/about-2.png";
import AboutImg3 from "../../../assets/img/about-3.png";
import AboutImg4 from "../../../assets/img/about-4.png";
import Subtitle from "../../../shared/Subtitle";
import "./AboutUsPage.css";

function AboutUsPage() {
  useEffect(() => {
    Aos.init({ duration: 1500 });
  }, []);

  return (
    <>
      <section className="banner section-bg">
        <div className="container mt-5 mb-5">
          <div className="row align-items-center row-gap-5">
            <div
              className="col-xl-7 col-lg-7 col-md-6 col-12"
              data-aos="fade-down"
            >
              <span className="tagline">Travel with us,</span>{" "}
              <span className="text-relative">
                HoYoViVu
                <img src={CurveImg} alt="curve image" className="curve" />
              </span>
              <h1 className="d-flex flex-column gap-2">
                {`Join us, `}
                <div className="wrap text-wrap">
                  <Typewriter
                    words={[
                      "Explore more!",
                      "Discover joy",
                      "Travel tales",
                      "Miraculous journey",
                      "More and more...",
                    ]}
                    loop={5}
                    cursor
                    cursorStyle="_"
                    typeSpeed={70}
                    deleteSpeed={50}
                    delaySpeed={1000}
                  />
                </div>
              </h1>
              <p className="mb-5 text-about">
                <strong>HoYoViVu</strong>, là điểm đến tuyệt vời dành cho những
                người yêu thích du lịch. Từ hướng dẫn chi tiết đến đánh giá chân
                thực và những góc ảnh đẹp mắt, chúng tôi mang đến trải nghiệm du
                lịch độc đáo và phong phú trên khắp thế giới. Hãy để{" "}
                <strong>HoYoViVu</strong> là nguồn cảm hứng cho mọi chuyến đi
                của bạn!
              </p>
              <Link to="https://www.facebook.com/profile.php?id=61558991602653">
                <button className="button">
                  Go to fanpage
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M8 7V11L2 6L8 1V5H13C17.4183 5 21 8.58172 21 13C21 17.4183 17.4183 21 13 21H4V19H13C16.3137 19 19 16.3137 19 13C19 9.68629 16.3137 7 13 7H8Z"></path>
                  </svg>
                </button>
              </Link>
            </div>
            <div
              className="col-xl-5 col-lg-5 col-md-6 col-12 h-100"
              data-aos="fade-up"
            >
              <div className="d-flex justify-content-center about-img">
                <img src={AboutGif} alt="Header About Image" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section-bg mt-5">
        <div className="container">
          <div className="text-end" data-aos="fade-right">
            <div className="d-flex">
              <div className="flex-grow-1"></div>
              <Subtitle subtitle="Service!" />
            </div>
            <h4 className="header__title">
              Khai mở những ký ức mới cùng
              <br /> HoYoViVu
            </h4>
          </div>
          <div className="row row-gap-5 mt-5 mb-5" data-aos="fade-up">
            <div className="col-xl-3 col-lg-4 col-md-6 col-12">
              <div className="card-about__info card__bg">
                <div className="icon">
                  <i className="ri-rocket-2-fill"></i>
                </div>
                <div className="content">
                  <h2>Dễ dàng thanh toán</h2>
                  <p>
                    Thực hiện thanh toán một cách thuận tiện chỉ trong vài bước
                    đơn giản. Không chỉ giúp tiết kiệm thời gian, chúng tôi còn
                    đảm bảo tính bảo mật tuyệt đối cho thông tin thanh toán của
                    bạn. Bạn có thể yên tâm rằng mọi giao dịch được xử lý một
                    cách an toàn và minh bạch.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4 col-md-6 col-12">
              <div className="card-about__info card-first__bg">
                <div className="icon">
                  <i className="ri-global-fill"></i>
                </div>
                <div className="content">
                  <h2>Rất quyền năng</h2>
                  <p>
                    Tại <strong>HoYoViVu</strong>, chúng tôi không chỉ cung cấp
                    những tour du lịch phong phú và đa dạng, mà còn mang đến
                    trải nghiệm du lịch độc đáo và đẳng cấp thông qua các tour
                    được tổ chức bởi các chuyên gia hàng đầu trong ngành du
                    lịch. Bạn sẽ được hưởng một dịch vụ chăm sóc khách hàng tận
                    tâm và chuyên nghiệp từ khi đặt tour cho đến khi kết thúc
                    chuyến đi.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4 col-md-6 col-12">
              <div className="card-about__info card-second__bg">
                <div className="icon">
                  <i className="ri-hand-coin-fill"></i>
                </div>
                <div className="content">
                  <h2>Chăm sóc khách hàng</h2>
                  <p>
                    Tại <strong>HoYoViVu</strong>, chúng tôi luôn đặt lợi ích và
                    sự thoải mái của khách hàng lên hàng đầu. Với đội ngũ nhân
                    viên chăm sóc khách hàng chuyên nghiệp và tận tâm, mỗi yêu
                    cầu và nhu cầu của bạn sẽ được đáp ứng một cách nhanh chóng
                    và chu đáo.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4 col-md-6 col-12">
              <div className="card-about__info card-third__bg">
                <div className="icon">
                  <i className="ri-gift-fill"></i>
                </div>
                <div className="content">
                  <h2>Chính sách ưu đãi</h2>
                  <p>
                    Có cơ hội nhận được các ưu đãi hấp dẫn như giảm giá đặc biệt
                    cho đặt tour sớm, các gói quà tặng giá trị và nhiều hơn nữa.
                    Chúng tôi cũng cung cấp các chính sách hoàn tiền linh hoạt
                    và các ưu đãi đặc biệt dành cho khách hàng thân thiết. Khám
                    phá thế giới một cách tiết kiệm và thú vị hơn bao giờ hết!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section-bg pb-5">
        <div className="container">
          <div className="text-start" data-aos="fade-right">
            <Subtitle subtitle="Our social!" />
            <h4 className="header__title">
              Cập nhật thông tin với trang thông tin.
              <br /> HoYoViVu
            </h4>
          </div>
          <div className="row align-items-center" data-aos="fade-down">
            <div className="col-lg-6 col-md-6 col-12">
              <p className="text-about">
                Hãy tham gia cùng chúng tôi xây dựng mạng xã hội để không bỏ lỡ
                bất kỳ thông tin hay cập nhật nào về các hành trình phiêu lưu
                độc đáo và đầy cảm hứng! Tại <strong>HoYoViVu</strong>, chúng
                tôi không chỉ là một trang web du lịch, mà còn là một cộng đồng
                đam mê khám phá và chia sẻ. Theo dõi chúng tôi trên các nền tảng
                xã hội dưới đây để tham gia vào cuộc trò chuyện, chia sẻ hình
                ảnh, và khám phá thêm về những nơi thú vị trên thế giới!
              </p>
              <div className="wrapper-social">
                <div className="socail-btn">
                  <div className="socail-icon">
                    <i className="ri-facebook-circle-fill"></i>
                  </div>
                  <span>Facebook</span>
                </div>
                <div className="socail-btn">
                  <div className="socail-icon">
                    <i className="ri-instagram-fill"></i>
                  </div>
                  <span>Instagram</span>
                </div>
                <div className="socail-btn">
                  <div className="socail-icon">
                    <i className="ri-twitter-fill"></i>
                  </div>
                  <span>Twitter</span>
                </div>
                <div className="socail-btn">
                  <div className="socail-icon">
                    <i className="ri-youtube-fill"></i>
                  </div>
                  <span>Youtube</span>
                </div>
                <div className="socail-btn">
                  <div className="socail-icon">
                    <i className="ri-tiktok-fill"></i>
                  </div>
                  <span>TikTok</span>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-12">
              <div className="d-flex justify-content-center">
                <img
                  src={AboutSocail}
                  alt="social image"
                  className="image-social"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section-bg pt-5 pb-5">
        <div className="text-center mb-5" data-aos="zoom-in">
          <div className="d-flex justify-content-center mb-2">
            <Subtitle subtitle="Community Support" />
          </div>
          <h4 className="header__title">
            Đồng hành và hỗ trợ bạn mỗi bước trên hành trình khám phá của mình.
          </h4>
        </div>
        <div className="container container-medium" data-aos="zoom-in">
          <div className="list-avatars">
            <img className="avatar" src={AboutImg1} alt="about-img 1" />
            <img className="avatar" src={AboutImg2} alt="about-img 2" />
            <img className="avatar" src={AboutImg3} alt="about-img 3" />
            <img className="avatar" src={AboutImg4} alt="about-img 4" />
            <img
              className="avatar"
              src="https://upload-os-bbs.hoyolab.com/upload/2022/07/29/df4e97e5d0ec3a1d99e93744be626546_260853733117766352.png"
              alt=""
            />
          </div>
        </div>
      </section>
      <section className="section-bg">
        <div className="text-center mb-5" data-aos="zoom-in-up">
          <div className="d-flex justify-content-center mb-2">
            <Subtitle subtitle="Give us feedback" />
          </div>
          <h4 className="header__title">
            Phản hồi đánh giá của bạn đối với chúng tôi. <br />
            HoYoViVu
          </h4>
        </div>
        <div className="container container-medium" data-aos="flip-down">
          <div className="tour-content bg-transparent">
            <div className="form-item-container pt-5 pb-2">
              <div className="mb-4">
                <label htmlFor="title" className="form-label">
                  Họ tên (<span className="text-red">*</span>):
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  className="form-control"
                  placeholder="Họ và tên"
                />
              </div>
              <div className="mb-4">
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-12">
                    <label htmlFor="country" className="form-label">
                      Email (<span className="text-red">*</span>):
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      className="form-control"
                      placeholder="Email của bạn"
                    />
                  </div>
                  <div className="col-lg-6 col-md-6 col-12">
                    <label htmlFor="country" className="form-label">
                      Số điện thoại (<span className="text-red">*</span>):
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      className="form-control"
                      placeholder="Số điện thoại của bạn"
                    />
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="country" className="form-label">
                  Nội dung (<span className="text-red">*</span>):
                </label>
                <div className="form-floating">
                  <textarea
                    className="form-control"
                    placeholder="Leave a comment here"
                    id="floatingTextarea"
                    style={{ height: 200 }}
                  ></textarea>
                  <label htmlFor="floatingTextarea">Nội dung phản hồi</label>
                </div>
              </div>
              <div className="my-5 w-100 d-flex justify-content-center align-items-center flex-wrap gap-3">
                <button type="reset" className="button btn-submit">
                  Phản hồi
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default AboutUsPage;

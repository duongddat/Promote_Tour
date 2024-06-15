import { Await, useLoaderData } from "react-router-dom";

import Subtitle from "../../../shared/Subtitle";
import headingBorderImg from "../../../assets/img/heading-border.webp";
import { Suspense } from "react";
import MyBooking from "../../../components/MyBooking/MyBooking";

function MyTourPage() {
  const { booking } = useLoaderData();

  return (
    <section className="section-bg">
      <div className="container">
        <div className="d-flex flex-column gap-16 blog-header">
          <div>
            <Subtitle subtitle="MyTour" />
            <h4 className="header__title">
              Explore the world, unlock unforgettable memories with HoYoViVu
              <br></br>- Where your adventure begins!
            </h4>
          </div>
          <p>
            Hãy sẵn sàng cho một cuộc hành trình kỳ diệu và hấp dẫn, nơi bạn có
            thể khám phá văn hóa mới, thưởng ngoạn những phong cảnh tuyệt đẹp và
            tạo ra những kỷ niệm vĩnh cửu.
            <br /> Cùng chúng tôi, mỗi chuyến đi sẽ là một chuyến đi đáng nhớ!
          </p>
          <div className="mb-5">
            <img src={headingBorderImg} alt="Heading Border Image" />
          </div>
        </div>
        <div className="mx-auto tour-content">
          <div className="d-flex flex-wrap justify-content-between align-items-center">
            <h5 className="table-title">Lịch sử đặt tour</h5>
            <div className="table-note">
              (<span className="text-red">*</span>)Lưu ý: Huỷ tour trước 2 ngày
              khởi hành
            </div>
          </div>
          <div className="mb-2">
            <img src={headingBorderImg} alt="Heading Border Image" />
          </div>
          <Suspense
            fallback={<p style={{ textAlign: "center" }}>Loading Booking...</p>}
          >
            <Await resolve={booking}>
              {(loadedBooking) => <MyBooking booking={loadedBooking} />}
            </Await>
          </Suspense>
        </div>
      </div>
    </section>
  );
}

export default MyTourPage;

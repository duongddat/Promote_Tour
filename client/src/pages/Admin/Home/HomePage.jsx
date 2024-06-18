import { useSelector } from "react-redux";
import { Await, Link, useLoaderData } from "react-router-dom";
import { defaults } from "chart.js/auto";
import { Doughnut } from "react-chartjs-2";

import headingBorderImg from "../../../assets/img/heading-border.webp";
import { formatVietnameseDate } from "../../../helper/formattingDate";
import "../Admin.css";
import { Suspense } from "react";

defaults.maintainAspectRatio = false;
defaults.responsive = true;

defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.font.size = 20;
defaults.plugins.title.padding = 20;
defaults.plugins.title.color = "black";

const generateRandomColor = () => {
  return {
    r: Math.floor(Math.random() * 256),
    g: Math.floor(Math.random() * 256),
    b: Math.floor(Math.random() * 256),
  };
};

const rgba = (color, alpha) => {
  return `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`;
};

const generateColors = (count, alphaBackground, alphaBorder) => {
  const backgroundColors = [];
  const borderColors = [];
  for (let i = 0; i < count; i++) {
    const baseColor = generateRandomColor();
    backgroundColors.push(rgba(baseColor, alphaBackground));
    borderColors.push(rgba(baseColor, alphaBorder));
  }
  return { backgroundColors, borderColors };
};

function HomePage() {
  const { chart, record } = useLoaderData();
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <section>
      <div className="row row-gap-4 mb-3">
        <Suspense
          fallback={<p style={{ textAlign: "center" }}>Loading Record...</p>}
        >
          <Await resolve={record}>
            {(loadedRecord) => {
              return (
                <>
                  <div className="col-xl-3 col-lg-4 col-md-6 col-12">
                    <div className="tour-content">
                      <div className="static-title">
                        <h6 className="d-flex align-items-center">
                          Tour
                          <span>| Hôm nay</span>
                        </h6>
                      </div>
                      <div className="d-flex align-items-center mb-3">
                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                          <i className="ri-btc-line"></i>
                        </div>
                        <div className="ps-3">
                          <div className="d-flex gap-2 align-items-end">
                            <h6 className="info-card">
                              {loadedRecord.Tour.new}
                            </h6>
                            <span>tạo mới</span>
                          </div>
                          <span className="text-success small pt-1 fw-bold">
                            {loadedRecord.Tour.total}
                          </span>
                          <span className="text-muted small pt-2 ps-1">
                            hiện có
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-4 col-md-6 col-12">
                    <div className="tour-content">
                      <div className="static-title">
                        <h6 className="d-flex align-items-center">
                          Bài viết
                          <span>| Hôm nay</span>
                        </h6>
                      </div>
                      <div className="d-flex align-items-center mb-3">
                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                          <i className="ri-blogger-fill"></i>
                        </div>
                        <div className="ps-3">
                          <div className="d-flex gap-2 align-items-end">
                            <h6 className="info-card">
                              {loadedRecord.Post.new}
                            </h6>
                            <span>tạo mới</span>
                          </div>
                          <span className="text-success small pt-1 fw-bold">
                            {loadedRecord.Post.total}
                          </span>
                          <span className="text-muted small pt-2 ps-1">
                            hiện có
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-4 col-md-6 col-12">
                    <div className="tour-content">
                      <div className="static-title">
                        <h6 className="d-flex align-items-center">
                          Bình luận
                          <span>| Hôm nay</span>
                        </h6>
                      </div>
                      <div className="d-flex align-items-center mb-3">
                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                          <i className="ri-chat-thread-line"></i>
                        </div>
                        <div className="ps-3">
                          <div className="d-flex gap-2 align-items-end">
                            <h6 className="info-card">
                              {loadedRecord.Review.new}
                            </h6>
                            <span>tạo mới</span>
                          </div>
                          <span className="text-success small pt-1 fw-bold">
                            {loadedRecord.Review.total}
                          </span>
                          <span className="text-muted small pt-2 ps-1">
                            hiện có
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-4 col-md-6 col-12">
                    <div className="tour-content">
                      <div className="static-title">
                        <h6 className="d-flex align-items-center">
                          Người dùng
                          <span>| Hôm nay</span>
                        </h6>
                      </div>
                      <div className="d-flex align-items-center mb-3">
                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                          <i className="ri-user-3-line"></i>
                        </div>
                        <div className="ps-3">
                          <div className="d-flex gap-2 align-items-end">
                            <h6 className="info-card">
                              {loadedRecord.User.new}
                            </h6>
                            <span>tạo mới</span>
                          </div>
                          <span className="text-success small pt-1 fw-bold">
                            {loadedRecord.User.total}
                          </span>
                          <span className="text-muted small pt-2 ps-1">
                            hiện có
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              );
            }}
          </Await>
        </Suspense>
      </div>
      <div className="row row-gap-4">
        <div className="col-xl-8 col-lg-6 col-md-12 col-12">
          <div className="col-12">
            <div className="tour-content">
              <div className="user-detail-content">
                <h5 className="user-detail__title fs-4 fw-bold">
                  Thông tin người dùng
                </h5>
                <div className="mb-2">
                  <img src={headingBorderImg} alt="Heading Border Image" />
                </div>
                <div className="user-detail__info">
                  <div className="user-detail__header">
                    <img
                      src={`${userInfo.photo}`}
                      alt={userInfo.name}
                      className="user-detail__img"
                    />
                    <Link
                      className="user-detail__update button"
                      to={
                        userInfo.role === "admin"
                          ? `/admin/users/${userInfo._id}/edit`
                          : "/user/update-info"
                      }
                    >
                      <i className="ri-pencil-fill"></i>
                      <span className="mx-2 d-none d-sm-inline">
                        Cập nhật thông tin
                      </span>
                    </Link>
                  </div>
                  <div className="user-detail__body">
                    <div className="user-detail__flied">
                      <i className="ri-id-card-fill"></i>
                      <strong>Tên người dùng:</strong>
                      <span>{userInfo.name}</span>
                    </div>
                    <div className="user-detail__flied">
                      <i className="ri-mail-fill"></i>
                      <strong>Email:</strong>
                      <span>{userInfo.email}</span>
                    </div>
                    <div className="user-detail__flied">
                      <i className="ri-phone-fill"></i>
                      <strong>Số điện thoại:</strong>
                      <span>{userInfo.phone || ""}</span>
                    </div>
                    <div className="user-detail__flied">
                      <i className="ri-home-3-fill"></i>
                      <strong>Địa chỉ:</strong>
                      <span>{userInfo.address || ""}</span>
                    </div>
                    <div className="user-detail__flied">
                      <i className="ri-information-fill"></i>
                      <strong>Chức vụ:</strong>
                      <span className="text-capitalize">{userInfo.role}</span>
                    </div>
                    <div className="user-detail__flied">
                      <i className="ri-calendar-event-line"></i>
                      <strong>Ngày tạo:</strong>
                      <span>{formatVietnameseDate(userInfo.createdAt)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-4 col-lg-6 col-md-12 col-12">
          <div className="tour-content h-100 sticky">
            <Suspense
              fallback={
                <p style={{ textAlign: "center" }}>Loading Reviews...</p>
              }
            >
              <Await resolve={chart}>
                {(loadedChart) => {
                  if (loadedChart) {
                    const chartData = loadedChart.map(
                      (data) => data.percentage
                    );
                    const chartLabels = loadedChart.map((data) => data.country);
                    const { backgroundColors, borderColors } = generateColors(
                      chartData.length,
                      0.4,
                      1
                    );

                    return (
                      <Doughnut
                        data={{
                          datasets: [
                            {
                              label: "Chiếm",
                              data: chartData,
                              backgroundColor: backgroundColors,
                              borderColor: borderColors,
                            },
                          ],
                          labels: chartLabels,
                        }}
                        options={{
                          plugins: {
                            title: {
                              text: "Phân bố tour",
                            },
                          },
                        }}
                      />
                    );
                  } else {
                    <p className="text-center">Some thing went wrong!</p>;
                  }
                }}
              </Await>
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomePage;

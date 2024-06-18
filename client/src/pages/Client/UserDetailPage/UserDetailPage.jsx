import { Suspense, useEffect } from "react";
import { Await, Link, useLoaderData } from "react-router-dom";

import headingBorderImg from "../../../assets/img/heading-border.webp";
import { formatVietnameseDate } from "../../../helper/formattingDate";
import "./UserDetailPage.css";

function UserDetailPage() {
  const { user } = useLoaderData();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="tour-content">
      <Suspense
        fallback={<p style={{ textAlign: "center" }}>Loading User...</p>}
      >
        <Await resolve={user}>
          {(loadedUser) => (
            <div className="user-detail-content">
              <h5 className="user-detail__title">Thông tin người dùng</h5>
              <div className="mb-3">
                <img src={headingBorderImg} alt="Heading Border Image" />
              </div>
              <div className="user-detail__info">
                <div className="user-detail__header">
                  <img
                    src={`${loadedUser.photo}`}
                    alt={loadedUser.name}
                    className="user-detail__img"
                  />
                  <Link
                    className="user-detail__update button"
                    to="/user/update-info"
                  >
                    <i className="ri-pencil-fill"></i>
                    <span className="mx-2 d-none d-sm-inline">
                      Cập nhật ảnh
                    </span>
                  </Link>
                </div>
                <div className="user-detail__body">
                  <div className="user-detail__flied">
                    <i className="ri-id-card-fill"></i>
                    <strong>Tên người dùng:</strong>
                    <span>{loadedUser.name}</span>
                  </div>
                  <div className="user-detail__flied">
                    <i className="ri-mail-fill"></i>
                    <strong>Email:</strong>
                    <span>{loadedUser.email}</span>
                  </div>
                  <div className="user-detail__flied">
                    <i className="ri-phone-fill"></i>
                    <strong>Số điện thoại:</strong>
                    <span>{loadedUser.phone || ""}</span>
                  </div>
                  <div className="user-detail__flied">
                    <i className="ri-home-3-fill"></i>
                    <strong>Địa chỉ:</strong>
                    <span>{loadedUser.address || ""}</span>
                  </div>
                  <div className="user-detail__flied">
                    <i className="ri-information-fill"></i>
                    <strong>Chức vụ:</strong>
                    <span className="text-capitalize">{loadedUser.role}</span>
                  </div>
                  <div className="user-detail__flied">
                    <i className="ri-calendar-event-line"></i>
                    <strong>Ngày tạo:</strong>
                    <span>{formatVietnameseDate(loadedUser.createdAt)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Await>
      </Suspense>
    </div>
  );
}

export default UserDetailPage;

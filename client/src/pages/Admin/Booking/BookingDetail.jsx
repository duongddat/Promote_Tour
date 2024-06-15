import { Suspense } from "react";
import { Await, Link, useLoaderData } from "react-router-dom";

import headingBorderImg from "../../../assets/img/heading-border.webp";
import {
  formatDateDefault,
  formatVietnameseDate,
} from "../../../helper/formattingDate";

function BookingDetail() {
  const { booking } = useLoaderData();

  return (
    <section>
      <div className="tour-content">
        <div className="d-flex justify-content-between align-items-center flex-wrap mt-3">
          <h5 className="table-title">Chi tiết booking</h5>
        </div>
        <div className="mb-2">
          <img src={headingBorderImg} alt="Heading Border Image" />
        </div>
        <div className="my-3">
          <Suspense
            fallback={<p style={{ textAlign: "center" }}>Loading data...</p>}
          >
            <Await resolve={booking}>
              {(loadedBooking) => (
                <div className="form-item-container">
                  <div className="row mb-4">
                    <div className="col-lg-6 col-md-6 col-12">
                      <div className="form-item__wrapper">
                        <div className="form-item__label">Thông tin tour:</div>
                        <div className="mb-4">
                          <label htmlFor="title" className="form-label">
                            Tên tour:
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            defaultValue={
                              loadedBooking ? loadedBooking.tour.title : ""
                            }
                            disabled
                          />
                        </div>
                        <div className="mb-4">
                          <label htmlFor="title" className="form-label">
                            Giá:
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            defaultValue={
                              loadedBooking ? loadedBooking.tour.price : ""
                            }
                            disabled
                          />
                        </div>
                        <div className="w-100 text-center">
                          <Link
                            to={`/tours/detail/${loadedBooking.tour.slug}`}
                            className="button btn-submit"
                          >
                            Chi tiết tour
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-12">
                      <div className="form-item__wrapper">
                        <div className="form-item__label">
                          Thông tin khách hành:
                        </div>
                        <div className="mb-4">
                          <label htmlFor="title" className="form-label">
                            Tên người dùng
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            defaultValue={
                              loadedBooking ? loadedBooking.user.name : ""
                            }
                            disabled
                          />
                        </div>
                        <div className="mb-4">
                          <label htmlFor="title" className="form-label">
                            Email
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            defaultValue={
                              loadedBooking ? loadedBooking.user.email : ""
                            }
                            disabled
                          />
                        </div>
                        <div className="w-100 text-center">
                          <Link
                            to={`/admin/users/${loadedBooking.user._id}/detail`}
                            className="button btn-submit"
                          >
                            Chi tiết người dùng
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row mb-4 row-gap-4">
                    <div className="col-lg-6 col-md-6 col-12">
                      <label htmlFor="country" className="form-label">
                        Số lượng:
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        defaultValue={
                          loadedBooking ? loadedBooking.guestSize : 0
                        }
                        disabled
                      />
                    </div>
                    <div className="col-lg-6 col-md-6 col-12">
                      <label htmlFor="country" className="form-label">
                        Ngày khởi hành:
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        defaultValue={
                          loadedBooking
                            ? formatDateDefault(loadedBooking.bookAt)
                            : ""
                        }
                        disabled
                      />
                    </div>
                    <div className="col-lg-6 col-md-6 col-12">
                      <label htmlFor="country" className="form-label">
                        Tổng tiền:
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        defaultValue={loadedBooking ? loadedBooking.price : 0}
                        disabled
                      />
                    </div>
                    <div className="col-lg-6 col-md-6 col-12">
                      <label htmlFor="country" className="form-label">
                        Ngày đặt:
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        defaultValue={
                          loadedBooking
                            ? formatVietnameseDate(loadedBooking.createdAt)
                            : ""
                        }
                        disabled
                      />
                    </div>
                  </div>
                  <p className="text-center my-5 text-footer-font">That all</p>
                </div>
              )}
            </Await>
          </Suspense>
        </div>
      </div>
    </section>
  );
}

export default BookingDetail;

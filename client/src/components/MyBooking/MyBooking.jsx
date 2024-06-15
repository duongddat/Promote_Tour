import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import noDataMessage from "../../assets/img/no-data-message.png";
import { currencyFormatter } from "../../helper/formattingPrice";
import { formatDateDefault } from "../../helper/formattingDate";
import BookingCountdown from "./BookingCountDown";
import { useAction } from "../../hooks/useAction";
import { cancelBooking } from "../../utils/Client/https";
import ShowModal from "../common/ShowModal";
import Spin from "../common/Spin";

function MyBooking({ booking }) {
  const navigative = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const { isLoading, action } = useAction(cancelBooking, "/my-tour");
  const [modalIsOpen, setIsOpen] = useState(false);
  const idRef = useRef();

  useEffect(() => {
    if (userInfo === null) {
      navigative("/");
    }
  }, [userInfo, navigative]);

  useEffect(() => {
    if (!isLoading) {
      closeModal();
    }
  }, [isLoading]);

  function openModal(id) {
    setIsOpen(true);
    idRef.current = id;
  }

  function closeModal() {
    setIsOpen(false);
  }

  function isCancellationAllowed(bookAt) {
    const currentDate = new Date();
    const bookingDate = new Date(bookAt);
    const twoDaysBeforeBookingDate = new Date(bookingDate);
    twoDaysBeforeBookingDate.setDate(bookingDate.getDate() - 2);

    return currentDate < twoDaysBeforeBookingDate;
  }

  function handleCancleBooking() {
    action(idRef.current);
  }

  return (
    <>
      {booking.length > 0 && (
        <div className="table-responsive mb-5">
          <table className="table table-hover align-middle text-center mb-5">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Tour</th>
                <th scope="col">Số người</th>
                <th scope="col">Ngày khởi hành</th>
                <th scope="col">Ngày đặt</th>
                <th scope="col">Trạng thái</th>
                <th scope="col">Tổng tiền</th>
                <th scope="col">Công cụ</th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
              {booking.map((book, index) => (
                <tr key={book._id}>
                  <th scope="row">{index + 1}</th>
                  <td>{book.tour.title}</td>
                  <td>{book.guestSize} người</td>
                  <td className="md">{formatDateDefault(book.bookAt)}</td>
                  <td className="md">{formatDateDefault(book.createdAt)}</td>
                  <td>
                    {!book.cancelled && (
                      <BookingCountdown bookAt={book.bookAt} />
                    )}
                    {book.cancelled && (
                      <span className="text-booking booking-remaining">
                        Đang xử lý huỷ
                      </span>
                    )}
                  </td>
                  <td>
                    <strong className="table-text__red">
                      {currencyFormatter.format(book.price)}
                    </strong>
                  </td>
                  <td>
                    <div className="table-action">
                      <Link
                        to={`/tours/detail/${book.tour.slug}`}
                        className="action-btn table-link action-btn__detail"
                      >
                        <i className="ri-eye-2-line"></i>
                      </Link>
                      {book.bookAt &&
                        !book.cancelled &&
                        isCancellationAllowed(book.bookAt) && (
                          <span
                            className="action-btn table-link action-btn__delete"
                            onClick={() => openModal(book._id)}
                          >
                            <i className="ri-close-circle-fill"></i>
                          </span>
                        )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-center md">That all~</p>
        </div>
      )}
      {booking.length === 0 && (
        <div className="mhy-data-lg">
          <img src={noDataMessage} alt="No data message blog" />
          <p className="mhy-data-lg_text">Bạn chưa đặt tour du lịch nào~</p>
        </div>
      )}
      <ShowModal isOpen={modalIsOpen} onClose={closeModal}>
        <div className="p-3 modal-container">
          <div className="modal-close">
            <i className="ri-close-circle-fill" onClick={closeModal}></i>
          </div>
          <div className="modal-title">
            <h5 className="sm p-2">Bạn có chắc muốn huỷ tour du lịch này?</h5>
          </div>
          <div className="d-flex justify-content-center align-items-center column-gap-3 mt-4">
            <button
              onClick={() => handleCancleBooking()}
              className="button text-white"
              disabled={isLoading}
            >
              {isLoading ? <Spin text="Huỷ..." /> : "Đồng ý"}
            </button>
            <button
              onClick={closeModal}
              className="button btn-red text-white"
              disabled={isLoading}
            >
              Đóng
            </button>
          </div>
        </div>
      </ShowModal>
    </>
  );
}

export default MyBooking;

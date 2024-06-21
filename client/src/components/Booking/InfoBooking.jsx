import { useSelector } from "react-redux";

function InfoBooking({ onChangeAmount, formValues, refs }) {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <div className="tour-content booking">
      <div className="booking__form my-3">
        <h5>Thông tin đặt tour:</h5>
        <div className="mb-5">
          <div className="mb-3">
            <input
              type="text"
              placeholder="Nhập họ tên"
              id="fullName"
              name="fullName"
              defaultValue={formValues.fullName}
              ref={refs.fullNameRef}
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              placeholder="Nhập số điện thoại"
              id="phone"
              name="phone"
              defaultValue={
                formValues.phone || (userInfo ? userInfo.phone : "")
              }
              ref={refs.phoneRef}
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              placeholder="Nhập email"
              id="email"
              name="email"
              defaultValue={
                formValues.email || (userInfo ? userInfo.email : "")
              }
              ref={refs.emailRef}
            />
          </div>
          <div className="mb-3 d-flex align-items-center gap-3">
            <input
              type="date"
              id="date"
              name="date"
              defaultValue={formValues.date}
              ref={refs.dateRef}
            />
            <input
              type="number"
              placeholder="Nhập số lượng"
              id="guestSize"
              name="guestSize"
              min={1}
              onChange={onChangeAmount}
              defaultValue={formValues.guestSize}
              ref={refs.guestSizeRef}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoBooking;

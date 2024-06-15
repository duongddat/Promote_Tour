import { Form, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";

import headingBorderImg from "../../../assets/img/heading-border.webp";
import { changePassword } from "../../../utils/Client/https";
import { setMessage } from "../../../store/message-slice";
import { setUser } from "../../../store/auth-slice";
import Spin from "../../../components/common/Spin";

function UserChangePassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  async function handleChangePassword(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());

    setIsLoading(true);
    try {
      const resData = await changePassword(data);
      dispatch(setMessage({ type: resData.status, message: resData.message }));
      if (resData.token || resData.status === "success") {
        localStorage.setItem("token", resData.token);
        dispatch(
          setUser({ token: resData.token, userInfo: resData.data.user })
        );
        navigate("/");
      }
    } catch (error) {
      dispatch(setMessage({ type: "error", message: error.message }));
    }
    setIsLoading(false);
  }

  return (
    <div className="tour-content">
      <div className="user-detail-content">
        <h5 className="user-detail__title">Đổi mật khẩu</h5>
        <div className="mb-3">
          <img src={headingBorderImg} alt="Heading Border Image" />
        </div>
        <Form onSubmit={handleChangePassword}>
          <div className="input-field mb-4">
            <input
              type="password"
              id="passwordCurrent"
              name="passwordCurrent"
              required
            />
            <label htmlFor="passwordCurrent">Mật khẩu cũ</label>
          </div>
          <div className="input-field mb-4">
            <input type="password" id="password" name="password" required />
            <label htmlFor="password">Mật khẩu mới</label>
          </div>
          <div className="input-field mb-5">
            <input
              type="password"
              id="passwordConfirm"
              name="passwordConfirm"
              required
            />
            <label htmlFor="passwordConfirm">Nhập lại mật khẩu</label>
          </div>
          <div className="input-field mb-3">
            <button
              type="submit"
              className="button btn-submit"
              disabled={isLoading}
            >
              {isLoading ? <Spin text="Xác nhận..." /> : "Xác nhận"}
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default UserChangePassword;

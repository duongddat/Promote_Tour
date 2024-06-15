import { Form, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { useAction } from "../../../hooks/useAction";
import { forgotPassword, verifyOTP } from "../../../utils/Client/https";
import Spin from "../../../components/common/Spin";
import "./ForgotPassword.css";
import { useEffect } from "react";

function OTPPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, action } = useAction(verifyOTP, "/reset-password");
  const { isLoading: isLoadingOTP, action: actionSendOTP } =
    useAction(forgotPassword);
  const email = localStorage.getItem("emailResetOTP");

  useEffect(() => {
    if (!email) {
      navigate("/forgot-password");
    }
  }, [navigate, email]);

  function handleSubmitOTP(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());

    action(data);
  }

  function handleSendOTP() {
    if (!email) {
      dispatch({ type: "error", message: "Fail to set email to send OTP!" });
      return;
    }

    actionSendOTP({ email });
  }

  return (
    <div className="wrapper">
      <div className="container h-100vh d-flex justify-content-center align-items-center">
        <div className="row container-size_sm">
          <div className="input-box d-flex justify-content-center align-items-center flex-column">
            <header className="mb-3 text-uppercase">
              <span>Xác nhận OTP</span>
              <p className="text-sm mt-2">
                Xác nhận OTP thông qua email của bạn! <br /> Vui lòng xác nhận
                trong vòng 10 phút
              </p>
            </header>
            <Form className="w-100 p-3" onSubmit={handleSubmitOTP}>
              <div className="input-field">
                <input type="text" id="otp" name="otp" required />
                <label htmlFor="otp">Mã OTP</label>
              </div>
              <div className="text-footer text-end mt-2 mb-4">
                <span className="text-pointer" onClick={handleSendOTP}>
                  Gửi lại OTP
                </span>
              </div>
              <div className="input-field">
                <button
                  type="submit"
                  className="button btn-submit"
                  disabled={isLoading || isLoadingOTP}
                >
                  {isLoading || isLoadingOTP ? (
                    <Spin text="Xác thực..." />
                  ) : (
                    "Xác nhận"
                  )}
                </button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OTPPage;

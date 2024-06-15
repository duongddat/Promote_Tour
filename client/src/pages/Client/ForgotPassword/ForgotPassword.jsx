import { Form, Link } from "react-router-dom";

import { useAction } from "../../../hooks/useAction";
import { forgotPassword } from "../../../utils/Client/https";
import Spin from "../../../components/common/Spin";

function ForgotPassword() {
  const { isLoading, action } = useAction(forgotPassword, "/verify-otp");

  function handleSubmitEmail(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());

    action(data);
  }

  return (
    <div className="wrapper">
      <div className="container h-100vh d-flex justify-content-center align-items-center">
        <div className="row container-size_sm">
          <div className="input-box d-flex justify-content-center align-items-center flex-column">
            <header className="mb-1 text-uppercase">
              <span>Quên mật khẩu</span>
              <p className="text-sm mt-2">
                Vui lòng nhập đúng email để xác thực chức năng!
              </p>
            </header>
            <Form className="w-100 p-3" onSubmit={handleSubmitEmail}>
              <div className="input-field">
                <input type="email" id="email" name="email" required />
                <label htmlFor="otp">Email</label>
              </div>
              <div className="text-footer text-end mt-2 mb-4">
                <span>Trở về </span>
                <Link to="/login">đăng nhập</Link>
                <span> / </span>
                <Link to="/register">tạo tài khoản</Link>
              </div>
              <div className="input-field">
                <button
                  type="submit"
                  className="button btn-submit"
                  disabled={isLoading}
                >
                  {isLoading ? <Spin text="Xác thực..." /> : " Xác nhận"}
                </button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;

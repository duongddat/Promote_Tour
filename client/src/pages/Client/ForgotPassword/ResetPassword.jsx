import { Form, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useCallback, useEffect, useState } from "react";

import { resetPassword } from "../../../utils/Client/https";
import { setMessage } from "../../../store/message-slice";
import Spin from "../../../components/common/Spin";
import { setUser } from "../../../store/auth-slice";

function ResetPassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const resetToken = localStorage.getItem("resetToken");

    if (!resetToken) {
      navigate("/forgot-password");
    }
  }, [navigate]);

  const handleResetPassword = useCallback(
    async function handleResetPassword(event) {
      event.preventDefault();

      const fd = new FormData(event.target);
      const data = Object.fromEntries(fd.entries());
      const { password, passwordConfirm } = data;

      if (password !== passwordConfirm) {
        dispatch(
          setMessage({
            type: "error",
            message: "Xác nhận mật khẩu không thành công!",
          })
        );
        return;
      }

      setIsLoading(true);
      try {
        const resData = await resetPassword(data);
        dispatch(
          setMessage({ type: resData.status, message: resData.message })
        );
        if (resData.status === "success") {
          dispatch(
            setUser({ token: resData.token, userInfo: resData.data.user })
          );
          navigate("/");
        }
      } catch (error) {
        dispatch(setMessage({ type: "error", message: error.message }));
      }
      setIsLoading(false);
    },
    [dispatch, navigate]
  );

  return (
    <div className="wrapper">
      <div className="container h-100vh d-flex justify-content-center align-items-center">
        <div className="row container-size_sm">
          <div className="input-box d-flex justify-content-center align-items-center flex-column">
            <header className="mb-3 text-uppercase">
              <span>Đổi mật khẩu</span>
            </header>
            <Form className="w-100 p-3" onSubmit={handleResetPassword}>
              <div className="input-field mb-4">
                <input type="password" id="password" name="password" required />
                <label htmlFor="password">Mật khẩu</label>
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
              <div className="input-field">
                <button
                  type="submit"
                  className="button btn-submit"
                  disabled={isLoading}
                >
                  {isLoading ? <Spin text="Xác thực..." /> : "Xác nhận"}
                </button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;

import { Form, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import LoginImg from "../../../assets/img/login.png";
import BgLogin from "../../../assets/img/bg-login-2.jpg";
import { userLogin } from "../../../store/auth-action.js";
import Spin from "../../../components/common/Spin.jsx";
import OAuth from "../../../components/OAuth/OAuth.jsx";
import "./LoginPage.css";

function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, userInfo } = useSelector((state) => state.auth);
  const { fcmToken } = useSelector((state) => state.notifications);
  const [loadingOAuth, setLoadingOAuth] = useState(false);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  function handleSubmit(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());
    dispatch(userLogin({ ...data, fcmToken }));
  }

  return (
    <div className="wrapper">
      <div className="container h-100vh d-flex justify-content-center align-items-center">
        <div className="row container-size">
          <div
            className="col-md-6 side-image"
            style={{ backgroundImage: `url(${BgLogin})` }}
          >
            <div className="text">
              <p>HoYoViVu</p>
            </div>
          </div>
          <div className="col-md-6 d-flex justify-content-center align-items-center">
            <div className="input-box">
              <header>
                <span>Đăng nhập</span>
                <img src={LoginImg} alt="Login image" />
              </header>
              <Form onSubmit={handleSubmit}>
                <div className="input-field mb-4">
                  <input type="email" id="email" name="email" required />
                  <label htmlFor="email">Email</label>
                </div>
                <div className="input-field">
                  <input
                    type="password"
                    id="password"
                    name="password"
                    required
                  />
                  <label htmlFor="password">Mật khẩu</label>
                </div>
                <div className="text-footer text-end mt-2 mb-3 mx-3">
                  <Link to="/forgot-password">Quên mật khẩu?</Link>
                </div>
                <div className="input-field">
                  <button
                    type="submit"
                    className="button btn-submit"
                    disabled={loading}
                  >
                    {loading ? <Spin text="Đăng nhập" /> : "Đăng nhập"}
                  </button>
                </div>
              </Form>
              <OAuth loading={loadingOAuth} setLoading={setLoadingOAuth} />
              <div className="text-footer text-center mt-3">
                <span>Chưa có tài khoản? </span>
                <Link to="/register">Tạo tài khoản ngay</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;

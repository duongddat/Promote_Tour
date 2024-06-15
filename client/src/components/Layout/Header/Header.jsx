import { Link } from "react-router-dom";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import NavItem from "./NavItem";
import DropdownItem from "./DropdownItem";
import "./Header.css";
import { logout } from "../../../store/auth-slice";
import { setMessage } from "../../../store/message-slice";

function Header() {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const refOffCanvas = useRef();
  const refBtnClose = useRef();

  function handleToggle() {
    const classes = refOffCanvas.current.className;

    if (classes.includes("show")) {
      refBtnClose.current.click();
    }
  }

  function handleLogOut() {
    dispatch(logout());
    localStorage.removeItem("token");
    dispatch(setMessage({ type: "success", message: "Đăng xuất thành công!" }));
  }

  return (
    <header>
      <nav className="navbar navbar-expand-lg fixed-top">
        <div className="container">
          <Link className="navbar-brand show-on-pc" to="/">
            HoYoViVu
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            ref={refOffCanvas}
            className="offcanvas offcanvas-end"
            tabIndex="-1"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
                HoYoViVu
              </h5>
              <button
                ref={refBtnClose}
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-center flex-grow-1 pe-3 column-gap-3">
                <NavItem title="Home" to="/" onToggle={handleToggle} />
                <NavItem title="Tour" to="/tours" onToggle={handleToggle} />
                <NavItem title="Blog" to="/blog" onToggle={handleToggle} />
                <NavItem
                  title="About us"
                  to="/about-us"
                  onToggle={handleToggle}
                />
              </ul>
            </div>
          </div>
          <div className="navbar-user ms-auto column-gap-3">
            {userInfo && (
              <>
                <div className="nav-item dropdown">
                  <button
                    className="nav-link dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <img
                      src={`http://localhost:8080/img/user/${userInfo.photo}`}
                      alt="user avatar"
                      className="nav-user-avatar"
                    />
                    <span>{userInfo.name}</span>
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end mt-3">
                    {(userInfo.role === "admin" ||
                      userInfo.role === "guide") && (
                      <>
                        <DropdownItem
                          title="Trang quản trị"
                          to="/admin"
                          icon={"ri-admin-fill"}
                        />
                        <DropdownItem divider />
                      </>
                    )}
                    <DropdownItem
                      title="Quản lý tài khoản"
                      to="/user/detail"
                      icon={"ri-settings-5-fill"}
                    />
                    <DropdownItem
                      title="Quản lý bài viết"
                      to="/blog/manage"
                      icon={"ri-inbox-2-fill"}
                    />
                    <DropdownItem
                      title="Lịch sử đặt tour"
                      to="/my-tour"
                      icon={"ri-history-fill"}
                    />
                    <DropdownItem divider />
                    <li>
                      <button className="dropdown-item" onClick={handleLogOut}>
                        <i className="ri-logout-box-r-fill"></i>
                        <span>Đăng xuất</span>
                      </button>
                    </li>
                  </ul>
                </div>
              </>
            )}
            {!userInfo && (
              <>
                <Link to="/login" className="button">
                  Đăng nhập
                </Link>
                <Link to="/register" className="button">
                  Đăng ký
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
export default Header;

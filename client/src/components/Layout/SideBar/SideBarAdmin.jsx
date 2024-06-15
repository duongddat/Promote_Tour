import { NavLink, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";

import "./SideBarAdmin.css";
import { logout } from "../../../store/auth-slice";
import { setMessage } from "../../../store/message-slice";

function SideBarAdmin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  const sideRef = useRef();

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const sideBarElement = sideRef.current;
    if (!sideBarElement) return;

    if (windowSize.width < 768) {
      sideBarElement.classList.remove("expand");
    } else {
      sideBarElement.classList.add("expand");
    }
  }, [windowSize]);

  function handleToggleSideBar() {
    if (windowSize.width > 500) {
      const sideBarElement = sideRef.current;

      sideBarElement.classList.toggle("expand");
    }
  }

  function handleLogOut() {
    navigate("/login");
    dispatch(logout());
    localStorage.removeItem("token");
    dispatch(setMessage({ type: "success", message: "Đăng xuất thành công!" }));
  }

  return (
    <aside ref={sideRef} id="sidebar-admin" className="expand">
      <div className="d-flex align-items-center">
        <button id="toggle-btn" type="button" onClick={handleToggleSideBar}>
          <i className="ri-layout-grid-fill"></i>
        </button>
        <div className="sidebar-logo">
          <Link to="/admin">HoYoViVu</Link>
        </div>
      </div>
      <ul className="sidebar-nav">
        <li className="sidebar-item">
          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "active-admin" : ""}`
            }
          >
            <i className="ri-home-line"></i>
            <span>Trang chủ</span>
          </NavLink>
        </li>
        {userInfo.role === "admin" && (
          <>
            <li className="sidebar-item">
              <NavLink
                to="/admin/tours"
                className={({ isActive }) =>
                  `sidebar-link ${isActive ? "active-admin" : ""}`
                }
              >
                <i className="ri-btc-line"></i>
                <span>Tour</span>
              </NavLink>
            </li>
            <li className="sidebar-item">
              <NavLink
                to="/admin/countries"
                className={({ isActive }) =>
                  `sidebar-link ${isActive ? "active-admin" : ""}`
                }
              >
                <i className="ri-compass-line"></i>
                <span>Quốc gia</span>
              </NavLink>
            </li>
            <li className="sidebar-item">
              <NavLink
                to="/admin/discounts"
                className={({ isActive }) =>
                  `sidebar-link ${isActive ? "active-admin" : ""}`
                }
              >
                <i className="ri-discount-percent-line"></i>
                <span>Mã giảm giá</span>
              </NavLink>
            </li>
            <li className="sidebar-item">
              <NavLink
                to="/admin/users"
                className={({ isActive }) =>
                  `sidebar-link ${isActive ? "active-admin" : ""}`
                }
              >
                <i className="ri-user-3-line"></i>
                <span>Người dùng</span>
              </NavLink>
            </li>
            <li className="sidebar-item">
              <NavLink
                to="/admin/booking"
                className={({ isActive }) =>
                  `sidebar-link ${isActive ? "active-admin" : ""}`
                }
              >
                <i className="ri-coins-line"></i>
                <span>Booking</span>
              </NavLink>
            </li>
          </>
        )}
        <li className="sidebar-item">
          <NavLink
            to="/admin/blogs"
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "active-admin" : ""}`
            }
          >
            <i className="ri-blogger-fill"></i>
            <span>Bài viết</span>
          </NavLink>
        </li>
        <li className="sidebar-item">
          <NavLink
            to="/admin/reviews"
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "active-admin" : ""}`
            }
          >
            <i className="ri-chat-thread-line"></i>
            <span>Bình luận</span>
          </NavLink>
        </li>
        <li className="sidebar-item">
          <div
            className="sidebar-link has-dropdown collapsed"
            data-bs-toggle="collapse"
            data-bs-target="#auth"
            aria-expanded="false"
            aria-controls="auth"
          >
            <i className="ri-pie-chart-2-line"></i>
            <span>Thống kê</span>
          </div>
          <ul
            id="auth"
            className="sidebar-dropdown accordion-collapse list-unstyled collapse"
            data-bs-parent="#sidebar"
          >
            {userInfo.role === "admin" && (
              <li className="sidebar-item">
                <NavLink
                  to="/admin/revenue"
                  className={({ isActive }) =>
                    `sidebar-link ${isActive ? "active-admin" : ""}`
                  }
                >
                  <div className="sidebar-dropdown__item">Doanh thu</div>
                </NavLink>
              </li>
            )}
            <li className="sidebar-item">
              <NavLink
                to="/admin/schedule"
                className={({ isActive }) =>
                  `sidebar-link ${isActive ? "active-admin" : ""}`
                }
              >
                <div className="sidebar-dropdown__item">Lịch trình</div>
              </NavLink>
            </li>
          </ul>
        </li>
      </ul>
      <div className="sidebar-footer">
        <div className="sidebar-link" onClick={handleLogOut}>
          <i className="ri-logout-box-line"></i>
          <span>Log out</span>
        </div>
      </div>
    </aside>
  );
}

export default SideBarAdmin;

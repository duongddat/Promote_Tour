import { NavLink } from "react-router-dom";

function MenuBar() {
  return (
    <div className="tour-content h-none pxy-sm-2 d-flex flex-column sticky">
      <h5 className=" md menu-header d-none d-sm-inline">Quản lý tài khoản</h5>
      <ul className="nav nav-pills flex-sm-column">
        <li className="nav-item fs-4 my-1">
          <NavLink to="/user/detail" className="nav-link text-start fs-6">
            <i className="ri-user-settings-fill"></i>
            <span className="ms-3 d-none d-sm-inline">Thông tin chi tiết</span>
          </NavLink>
        </li>
        <li className="nav-item fs-4 my-1">
          <NavLink to="/user/update-info" className="nav-link text-start fs-6">
            <i className="ri-edit-circle-line"></i>
            <span className="ms-3 d-none d-sm-inline">Cập nhật thông tin</span>
          </NavLink>
        </li>
        <li className="nav-item fs-4 my-1">
          <NavLink
            to="/user/update-password"
            className="nav-link text-start fs-6"
          >
            <i className="ri-key-fill"></i>
            <span className="ms-3 d-none d-sm-inline">Đổi mật khẩu</span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default MenuBar;

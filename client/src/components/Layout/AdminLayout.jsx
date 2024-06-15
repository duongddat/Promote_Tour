import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import SideBarAdmin from "./SideBar/SideBarAdmin";
import "./Layout.css";

function AdminLayout({ children }) {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <div className="d-flex section-bg section-bg-color">
      <SideBarAdmin />
      <div className="main-admin p-3">
        <div className="admin-header">
          <div className="admin-info">
            <div className="admin-info__image">
              <img src={`http://localhost:8080/img/user/${userInfo.photo}`} />
            </div>
            <div className="admin-info__name">
              <h5>{userInfo.name}</h5>
              <span>Role: {userInfo.role}</span>
            </div>
          </div>
          <div className="button h-100">
            <Link to="/" className="fw-bold">
              <span>HoYoViVu client</span>{" "}
              <i className="ri-arrow-right-line"></i>
            </Link>
          </div>
        </div>
        {children}
        <div className="layout-admin__footer">
          <div className="item-block_text text-center">
            <p>Copyright © X.A.D. All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;

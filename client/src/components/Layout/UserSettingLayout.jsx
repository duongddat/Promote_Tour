import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import MenuBar from "./SideBar/MenuBar";
import "./Layout.css";

function UserSettingLayout({ children }) {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo === null) {
      navigate("/");
    }
  }, [userInfo, navigate]);

  return (
    <section className="section-bg">
      <div className="container container-user">
        <div className="row row-gap-4">
          <div className="col-lg-4 col-md-4 col-auto">
            <MenuBar />
          </div>
          <div className="col-lg-8 col-md-8 col-12">{children}</div>
        </div>
      </div>
    </section>
  );
}

export default UserSettingLayout;

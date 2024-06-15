import { Link } from "react-router-dom";

import UserForm from "../../../components/User/UserForm.jsx";
import headingBorderImg from "../../../assets/img/heading-border.webp";
import { useAction } from "../../../hooks/useAction.js";
import { createUserAdmin } from "../../../utils/Admin/adminHttps.js";

function AddUserPage() {
  const { isLoading, action } = useAction(createUserAdmin, "/admin/users");

  return (
    <section>
      <div className="tour-content">
        <div className="d-flex justify-content-between align-items-center flex-wrap mt-3">
          <h5 className="table-title">Thêm mới người dùng</h5>
          <Link to="/admin/users" className="button d-flex gap-1 fw-bold">
            <i className="ri-file-list-3-line"></i>
            <span>Danh sách người dùng</span>
          </Link>
        </div>
        <div className="mb-2">
          <img src={headingBorderImg} alt="Heading Border Image" />
        </div>
        <div className="my-3">
          <UserForm isLoading={isLoading} action={action} />
        </div>
      </div>
    </section>
  );
}

export default AddUserPage;

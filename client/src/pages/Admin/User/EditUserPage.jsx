import { Await, Link, useLoaderData } from "react-router-dom";
import { Suspense } from "react";

import headingBorderImg from "../../../assets/img/heading-border.webp";
import { useAction } from "../../../hooks/useAction.js";
import { editUserAdmin } from "../../../utils/Admin/adminHttps.js";
import UserForm from "../../../components/User/UserForm.jsx";

function EditUserPage() {
  const { user } = useLoaderData();
  const { isLoading, action } = useAction(editUserAdmin, "/admin/users");

  return (
    <section>
      <div className="tour-content">
        <div className="d-flex justify-content-between align-items-center flex-wrap mt-3">
          <h5 className="table-title">Chỉnh sửa người dùng</h5>
          <Link to="/admin/users" className="button d-flex gap-1 fw-bold">
            <i className="ri-file-list-3-line"></i>
            <span>Danh sách người dùng</span>
          </Link>
        </div>
        <div className="mb-2">
          <img src={headingBorderImg} alt="Heading Border Image" />
        </div>
        <div className="my-3">
          <Suspense
            fallback={<p style={{ textAlign: "center" }}>Loading User...</p>}
          >
            <Await resolve={user}>
              {(loadedUser) => (
                <UserForm
                  isLoading={isLoading}
                  action={action}
                  user={loadedUser}
                />
              )}
            </Await>
          </Suspense>
        </div>
      </div>
    </section>
  );
}

export default EditUserPage;

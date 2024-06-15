import { Await, Link, useLoaderData } from "react-router-dom";
import { Suspense, useEffect, useState } from "react";
import Select from "react-select";

import headingBorderImg from "../../../assets/img/heading-border.webp";

function DetailUserPage() {
  const { user } = useLoaderData();
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    if (user !== null) {
      setSelectedOption({
        value: user.role,
        label: "Role " + user.role,
      });
    }
  }, [user]);

  return (
    <section>
      <div className="tour-content">
        <div className="d-flex justify-content-between align-items-center flex-wrap mt-3">
          <h5 className="table-title">Chi tiết người dùng</h5>
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
            fallback={<p style={{ textAlign: "center" }}>Loading data...</p>}
          >
            <Await resolve={user}>
              {(loadedUser) => (
                <div className="form-item-container">
                  <div className="mb-4">
                    <div className="row row-gap-4">
                      <div className="col-lg-6 col-md-6 col-12">
                        <label htmlFor="name" className="form-label">
                          Họ và tên (<span className="text-red">*</span>):
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          defaultValue={loadedUser ? loadedUser.name : ""}
                          disabled
                        />
                      </div>
                      <div className="col-lg-6 col-md-6 col-12">
                        <label htmlFor="email" className="form-label">
                          Email (<span className="text-red">*</span>):
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          defaultValue={loadedUser ? loadedUser.email : ""}
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="row row-gap-4">
                      <div className="col-lg-6 col-md-6 col-12">
                        <label htmlFor="role" className="form-label">
                          Vai trò:
                        </label>
                        <Select
                          value={selectedOption}
                          defaultValue={selectedOption}
                          onChange={setSelectedOption}
                          isDisabled
                        />
                      </div>
                      <div className="col-lg-6 col-md-6 col-12">
                        <label htmlFor="phone" className="form-label">
                          Số điện thoại:
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          defaultValue={loadedUser ? loadedUser.phone : ""}
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="row row-gap-4">
                      <div className="col-lg-6 col-md-6 col-12">
                        <label htmlFor="address" className="form-label">
                          Địa chỉ:
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          defaultValue={loadedUser ? loadedUser.address : ""}
                          disabled
                        />
                      </div>
                      {user != null && (
                        <div className="col-lg-6 col-md-6 col-12">
                          <label className="form-label text-default">
                            Đại diện hiện tại:
                          </label>
                          <div className="form-img-upload__img">
                            <img
                              src={`http://localhost:8080/img/user/${loadedUser.photo}`}
                              alt="image upload"
                              className="upload-img"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <p className="text-center my-5 text-footer-font">That all</p>
                </div>
              )}
            </Await>
          </Suspense>
        </div>
      </div>
    </section>
  );
}

export default DetailUserPage;

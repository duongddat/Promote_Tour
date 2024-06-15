import { Await, Link, useLoaderData } from "react-router-dom";

import headingBorderImg from "../../../assets/img/heading-border.webp";
import { Suspense } from "react";

function DetailCountryPage() {
  const { country } = useLoaderData();

  return (
    <section>
      <div className="tour-content">
        <div className="d-flex justify-content-between align-items-center flex-wrap mt-3">
          <h5 className="table-title">Chi tiết quốc gia</h5>
          <Link to="/admin/countries" className="button d-flex gap-1 fw-bold">
            <i className="ri-file-list-3-line"></i>
            <span>Danh sách quốc gia</span>
          </Link>
        </div>
        <div className="mb-2">
          <img src={headingBorderImg} alt="Heading Border Image" />
        </div>
        <div className="my-3">
          <Suspense
            fallback={<p style={{ textAlign: "center" }}>Loading Country...</p>}
          >
            <Await resolve={country}>
              {(loadedCountry) => (
                <div className="form-item-container mb-5">
                  <div className="mb-4">
                    <label htmlFor="name" className="form-label">
                      Tên quốc gia (<span className="text-red">*</span>):
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue={
                        loadedCountry != null ? loadedCountry.name : ""
                      }
                      disabled
                    />
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

export default DetailCountryPage;

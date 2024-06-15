import { Await, Link, useLoaderData } from "react-router-dom";
import { Suspense } from "react";

import headingBorderImg from "../../../assets/img/heading-border.webp";
import CountryForm from "../../../components/Country/CountryFormAdmin";
import { useAction } from "../../../hooks/useAction";
import { editCountryAdmin } from "../../../utils/Admin/adminHttps";

function EditCountryPage() {
  const { country } = useLoaderData();
  const { isLoading, action } = useAction(editCountryAdmin, "/admin/countries");

  return (
    <section>
      <div className="tour-content">
        <div className="d-flex justify-content-between align-items-center flex-wrap mt-3">
          <h5 className="table-title">Chỉnh sửa quốc gia</h5>
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
                <CountryForm
                  action={action}
                  isLoading={isLoading}
                  country={loadedCountry}
                />
              )}
            </Await>
          </Suspense>
        </div>
      </div>
    </section>
  );
}

export default EditCountryPage;

import { Link } from "react-router-dom";

import headingBorderImg from "../../../assets/img/heading-border.webp";
import CountryForm from "../../../components/Country/CountryFormAdmin";
import { createCountryAdmin } from "../../../utils/Admin/adminHttps";
import { useAction } from "../../../hooks/useAction.js";

function AddCountryPage() {
  const { isLoading, action } = useAction(
    createCountryAdmin,
    "/admin/countries"
  );

  return (
    <section>
      <div className="tour-content">
        <div className="d-flex justify-content-between align-items-center flex-wrap mt-3">
          <h5 className="table-title">Thêm mới quốc gia</h5>
          <Link to="/admin/countries" className="button d-flex gap-1 fw-bold">
            <i className="ri-file-list-3-line"></i>
            <span>Danh sách quốc gia</span>
          </Link>
        </div>
        <div className="mb-2">
          <img src={headingBorderImg} alt="Heading Border Image" />
        </div>
        <div className="my-3">
          <CountryForm action={action} isLoading={isLoading} />
        </div>
      </div>
    </section>
  );
}

export default AddCountryPage;

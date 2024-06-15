import { Link, useLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";

import TourFormAdmin from "../../../components/Tours/TourFormAdmin.jsx";
import headingBorderImg from "../../../assets/img/heading-border.webp";
import { useAction } from "../../../hooks/useAction.js";
import { editTourAdmin } from "../../../utils/Admin/adminHttps.js";

function EditTourPage() {
  const [tourData, setTourData] = useState();
  const [countriesData, setCountriesData] = useState([]);
  const [guidesData, setGuidesData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { isLoading: loading, action } = useAction(
    editTourAdmin,
    "/admin/tours"
  );

  const { tour, countries, guides } = useLoaderData();

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      try {
        setTourData(await tour);
        setCountriesData(await countries);
        setGuidesData(await guides);
      } catch (error) {
        console.error("Error loading tour data:", error);
      }
      setIsLoading(false);
    }

    getData();
  }, [countries, guides, tour]);

  return (
    <section>
      <div className="tour-content">
        <div className="d-flex justify-content-between align-items-center flex-wrap mt-3">
          <h5 className="table-title">Chỉnh sửa tour</h5>
          <Link to="/admin/tours" className="button d-flex gap-1 fw-bold">
            <i className="ri-file-list-3-line"></i>
            <span>Danh sách tour</span>
          </Link>
        </div>
        <div className="mb-2">
          <img src={headingBorderImg} alt="Heading Border Image" />
        </div>
        <div className="my-3">
          {isLoading && <p className="text-center">Loading data....</p>}
          {!isLoading && (
            <TourFormAdmin
              countries={countriesData}
              guides={guidesData}
              action={action}
              isLoading={loading}
              tour={tourData}
            />
          )}
        </div>
      </div>
    </section>
  );
}

export default EditTourPage;

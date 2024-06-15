import { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";

import headingBorderImg from "../../../assets/img/heading-border.webp";
import { useAction } from "../../../hooks/useAction";
import { editDiscountAdmin } from "../../../utils/Admin/adminHttps";
import DiscountForm from "../../../components/Discount/DiscountForm";

function EditDiscountPage() {
  const { discount, countries } = useLoaderData();
  const [loading, setLoading] = useState(false);
  const [discountData, setDiscountData] = useState();
  const [countriesData, setCountriesData] = useState([]);

  const { isLoading, action } = useAction(
    editDiscountAdmin,
    "/admin/discounts"
  );

  useEffect(() => {
    async function getData() {
      setLoading(true);
      try {
        setDiscountData(await discount);
        setCountriesData(await countries);
      } catch (error) {
        console.error("Error loading tour data:", error);
      }
      setLoading(false);
    }

    getData();
  }, [countries, discount]);

  return (
    <section>
      <div className="tour-content">
        <div className="d-flex justify-content-between align-items-center flex-wrap mt-3">
          <h5 className="table-title">Chỉnh sửa mã giảm giá</h5>
          <Link to="/admin/discounts" className="button d-flex gap-1 fw-bold">
            <i className="ri-file-list-3-line"></i>
            <span>Danh sách mã giảm giá</span>
          </Link>
        </div>
        <div className="mb-2">
          <img src={headingBorderImg} alt="Heading Border Image" />
        </div>
        <div className="my-3">
          {loading && <p className="text-center">Loading data....</p>}
          {!loading && (
            <DiscountForm
              discount={discountData}
              countries={countriesData}
              isLoading={isLoading}
              action={action}
            />
          )}
        </div>
      </div>
    </section>
  );
}

export default EditDiscountPage;

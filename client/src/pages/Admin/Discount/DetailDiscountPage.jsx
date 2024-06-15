import { Suspense, useEffect, useState } from "react";
import { Await, Link, useLoaderData } from "react-router-dom";
import Select from "react-select";

import headingBorderImg from "../../../assets/img/heading-border.webp";

function DetailDiscountPage() {
  const { discount } = useLoaderData();
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    if (discount !== null) {
      setSelectedOption({
        value: discount.country._id,
        label: discount.country.name,
      });
    }
  }, [discount]);

  return (
    <section>
      <div className="tour-content">
        <div className="d-flex justify-content-between align-items-center flex-wrap mt-3">
          <h5 className="table-title">Chi tiết mã giảm giá</h5>
          <Link to="/admin/discounts" className="button d-flex gap-1 fw-bold">
            <i className="ri-file-list-3-line"></i>
            <span>Danh sách mã giảm giá</span>
          </Link>
        </div>
        <div className="mb-2">
          <img src={headingBorderImg} alt="Heading Border Image" />
        </div>
        <div className="my-3">
          <Suspense
            fallback={<p style={{ textAlign: "center" }}>Loading data...</p>}
          >
            <Await resolve={discount}>
              {(loadedDiscount) => (
                <div className="form-item-container">
                  <div className="mb-4 row row-gap-4">
                    <div className="col-lg-6 col-md-6 col-12">
                      <label htmlFor="code" className="form-label">
                        Mã giảm giá (<span className="text-red">*</span>):
                      </label>
                      <input
                        type="text"
                        id="code"
                        name="code"
                        className="form-control"
                        defaultValue={
                          loadedDiscount != null ? loadedDiscount.code : ""
                        }
                        disabled
                      />
                    </div>
                    <div className="col-lg-6 col-md-6 col-12">
                      <label htmlFor="percentage" className="form-label">
                        Phân trăm giảm giá (<span className="text-red">*</span>
                        ):
                      </label>
                      <input
                        type="number"
                        id="percentage"
                        name="percentage"
                        className="form-control"
                        defaultValue={
                          discount !== undefined ? discount.percentage : ""
                        }
                        disabled
                      />
                    </div>
                  </div>
                  <div className="mb-4 row row-gap-4">
                    <div className="col-lg-6 col-md-6 col-12">
                      <label htmlFor="expiryDate" className="form-label">
                        Ngày hết hạn (<span className="text-red">*</span>):
                      </label>
                      <input
                        type="date"
                        id="expiryDate"
                        name="expiryDate"
                        className="form-control"
                        defaultValue={
                          discount ? discount.expiryDate.substring(0, 10) : ""
                        }
                        disabled
                      />
                    </div>
                    <div className="col-lg-6 col-md-6 col-12">
                      <label htmlFor="country" className="form-label">
                        Danh mục (<span className="text-red">*</span>)
                      </label>
                      <Select
                        value={selectedOption}
                        defaultValue={selectedOption}
                        onChange={setSelectedOption}
                        isDisabled
                      />
                    </div>
                  </div>
                  {discount && (
                    <div className="mb-4">
                      <label className="form-label">Trạng thái:</label>
                      <div className="d-flex align-item-center gap-3">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="isActive"
                            id="op1"
                            defaultChecked={discount.isActive === true}
                            disabled
                          />
                          <label className="form-check-label sm" htmlFor="op1">
                            Active
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="isActive"
                            id="op2"
                            defaultChecked={discount.isActive === false}
                            disabled
                          />
                          <label className="form-check-label sm" htmlFor="op2">
                            Inactive
                          </label>
                        </div>
                      </div>
                    </div>
                  )}

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

export default DetailDiscountPage;

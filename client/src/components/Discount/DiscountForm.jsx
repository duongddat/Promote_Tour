import { Form } from "react-router-dom";
import { useEffect, useState } from "react";
import Select from "react-select";

import { convertToSelectOptions } from "../../helper/setValueOption";
import Spin from "../common/Spin";
import { useDispatch } from "react-redux";
import { setMessage } from "../../store/message-slice";

function DiscountForm({ action, isLoading, countries, discount = null }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const optionsCountry = convertToSelectOptions(countries, "_id", "name");

  const dispatch = useDispatch();

  useEffect(() => {
    if (discount !== null) {
      setSelectedOption({
        value: discount.country._id,
        label: discount.country.name,
      });
    }
  }, [discount]);

  function handleSubmitForm(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const formData = Object.fromEntries(fd.entries());
    formData["country"] = selectedOption.value;

    const { expiryDate } = formData;

    const selectedDate = new Date(expiryDate);
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 1);
    if (selectedDate < currentDate) {
      dispatch(
        setMessage({
          type: "error",
          message:
            "Vui lòng chọn một ngày ít nhất là 1 ngày sau ngày hiện tại!",
        })
      );
      return;
    }

    const data = { formData };

    if (discount !== null) {
      data.idDiscount = discount._id;
    }

    action(data);
  }

  return (
    <Form onSubmit={handleSubmitForm} className="mb-5">
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
              placeholder="Nhập mã giảm giá"
              defaultValue={discount != null ? discount.code : ""}
              required
            />
          </div>
          <div className="col-lg-6 col-md-6 col-12">
            <label htmlFor="percentage" className="form-label">
              Phân trăm giảm giá (<span className="text-red">*</span>):
            </label>
            <input
              type="number"
              id="percentage"
              name="percentage"
              className="form-control"
              placeholder="Nhập phần trăm giảm giá"
              min={1}
              defaultValue={
                discount && discount.percentage !== undefined
                  ? discount.percentage
                  : ""
              }
              required
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
                discount && discount.expiryDate
                  ? discount.expiryDate.substring(0, 10)
                  : ""
              }
              required
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
              options={optionsCountry}
              placeholder="Chọn danh mục áp dụng"
              required
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
                  defaultValue={true}
                  defaultChecked={discount.isActive === true}
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
                  defaultValue={false}
                  defaultChecked={discount.isActive === false}
                />
                <label className="form-check-label sm" htmlFor="op2">
                  Inactive
                </label>
              </div>
            </div>
          </div>
        )}

        <div className="my-5 w-100 d-flex justify-content-center align-items-center flex-wrap gap-3">
          <button type="reset" className="button btn-submit btn-red">
            Khôi phục
          </button>
          <button
            type="submit"
            className="button btn-submit"
            disabled={isLoading}
          >
            {isLoading ? <Spin text={"Loading..."} /> : "Xác nhận"}
          </button>
        </div>
      </div>
    </Form>
  );
}

export default DiscountForm;

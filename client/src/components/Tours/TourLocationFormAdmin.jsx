import { useState } from "react";
import { useDispatch } from "react-redux";

import { setMessage } from "../../store/message-slice";

function TourLocationFormAdmin({ onSubmit }) {
  const dispatch = useDispatch();

  const [locationData, setLocationData] = useState({
    locationLong: "",
    locationLat: "",
    locationDay: "",
    locationDescription: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setLocationData({ ...locationData, [name]: value });
  }

  function isValidLongitude(longitude) {
    // Kiểm tra xem kinh độ có nằm trong khoảng [-180, 180] không
    return !isNaN(parseFloat(longitude)) && Math.abs(longitude) <= 180;
  }

  function isValidLatitude(latitude) {
    // Kiểm tra xem vĩ độ có nằm trong khoảng [-90, 90] không
    return !isNaN(parseFloat(latitude)) && Math.abs(latitude) <= 90;
  }

  function validate(data) {
    if (!isValidLongitude(data.locationLong)) {
      dispatch(setMessage({ type: "error", message: "Kinh độ không hợp lệ!" }));
      return true;
    }

    if (!isValidLatitude(data.locationLat)) {
      dispatch(setMessage({ type: "error", message: "Vị độ không hợp lệ!" }));
      return true;
    }

    if (isNaN(parseFloat(data.locationDay))) {
      dispatch(setMessage({ type: "error", message: "Ngày không hợp lệ!" }));
      return true;
    }

    if (!data.locationDescription.trim()) {
      dispatch(setMessage({ type: "error", message: "Mô tả không hợp lệ!" }));
      return true;
    }

    return false;
  }

  function handleSubmitLocation() {
    const errors = validate(locationData);
    if (!errors) {
      onSubmit(locationData);
      setLocationData({
        locationLong: "",
        locationLat: "",
        locationDay: "",
        locationDescription: "",
      });
    }
  }

  return (
    <div className="form-item__wrapper">
      <div className="form-item__label">Điểm du lịch:</div>
      <div className="row row-gap-3 mb-4">
        <div className="col-lg-6 col-md-6 col-12">
          <label htmlFor="locationLong" className="form-label">
            Kinh độ (<span className="text-red">*</span>):
          </label>
          <input
            type="number"
            id="locationLong"
            name="locationLong"
            className="form-control"
            placeholder="Kinh độ"
            value={locationData.locationLong}
            onChange={handleChange}
          />
        </div>
        <div className="col-lg-6 col-md-6 col-12">
          <label htmlFor="locationLat" className="form-label">
            Vĩ độ (<span className="text-red">*</span>):
          </label>
          <input
            type="number"
            id="locationLat"
            name="locationLat"
            className="form-control"
            placeholder="Vĩ độ"
            value={locationData.locationLat}
            onChange={handleChange}
          />
        </div>
        <div className="col-lg-6 col-md-6 col-12">
          <label htmlFor="locationDay" className="form-label">
            Ngày (<span className="text-red">*</span>):
          </label>
          <input
            type="number"
            id="locationDay"
            name="locationDay"
            className="form-control"
            placeholder="Ngày tham quang"
            value={locationData.locationDay}
            onChange={handleChange}
          />
        </div>
        <div className="col-lg-6 col-md-6 col-12">
          <label htmlFor="locationDescription" className="form-label">
            Mô tả (<span className="text-red">*</span>):
          </label>
          <input
            type="text"
            id="locationDescription"
            name="locationDescription"
            className="form-control"
            placeholder="Mô tả điểm du lịch"
            value={locationData.locationDescription}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="w-100 text-center">
        <button
          type="button"
          className="button btn-submit"
          onClick={handleSubmitLocation}
        >
          Thêm địa điểm
        </button>
      </div>
    </div>
  );
}

export default TourLocationFormAdmin;

import { useRef } from "react";
import { useNavigate } from "react-router-dom";

import "./SearchBar.css";

function SearchBar() {
  const navigate = useNavigate();
  const keyRef = useRef();
  const durationRef = useRef();
  const maxGroupSizeRef = useRef();

  function handleSearch() {
    const key = keyRef.current.value;
    const duration = durationRef.current.value;
    const maxGroupSize = maxGroupSizeRef.current.value;

    const params = new URLSearchParams();
    if (key !== "") {
      params.append("key", key);
    }

    if (duration !== "") {
      params.append("duration", duration);
    }

    if (maxGroupSize !== "") {
      params.append("maxGroupSize", maxGroupSize);
    }

    const searchQuery = params.toString();
    const redirectUrl = searchQuery
      ? `/tours/search?${searchQuery}`
      : "/tours/search";

    navigate(redirectUrl);
  }

  function handleKeyPress(event) {
    if (event.key === "Enter") {
      handleSearch();
    }
  }

  return (
    <div className="container">
      <div className="card search-box d-flex flex-column justify-content-center gap-40">
        <div className="d-flex flex-column gap-16">
          <h4 className="text-center">Bạn lựa chọn tour du lịch nào?</h4>
          <p className="lg text-center opacity-75">
            Hơn hàng nghìn tour du lịch giá tốt đang chờ bạn
          </p>
        </div>
        <div className="row row-gap-3">
          <div className="col-lg-4">
            <label className="input-search">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M11 2C15.968 2 20 6.032 20 11C20 15.968 15.968 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2ZM11 18C14.8675 18 18 14.8675 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18ZM19.4853 18.0711L22.3137 20.8995L20.8995 22.3137L18.0711 19.4853L19.4853 18.0711Z"></path>
              </svg>
              <input
                ref={keyRef}
                name="key"
                className="input"
                placeholder="Nhập tên tour du lịch"
                onKeyDown={handleKeyPress}
              />
            </label>
          </div>
          <div className="col-lg-3">
            <label className="input-search">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M6 4H4V2H20V4H18V6C18 7.61543 17.1838 8.91468 16.1561 9.97667C15.4532 10.703 14.598 11.372 13.7309 12C14.598 12.628 15.4532 13.297 16.1561 14.0233C17.1838 15.0853 18 16.3846 18 18V20H20V22H4V20H6V18C6 16.3846 6.81616 15.0853 7.8439 14.0233C8.54682 13.297 9.40202 12.628 10.2691 12C9.40202 11.372 8.54682 10.703 7.8439 9.97667C6.81616 8.91468 6 7.61543 6 6V4ZM8 4V6C8 6.68514 8.26026 7.33499 8.77131 8H15.2287C15.7397 7.33499 16 6.68514 16 6V4H8ZM12 13.2219C10.9548 13.9602 10.008 14.663 9.2811 15.4142C9.09008 15.6116 8.92007 15.8064 8.77131 16H15.2287C15.0799 15.8064 14.9099 15.6116 14.7189 15.4142C13.992 14.663 13.0452 13.9602 12 13.2219Z"></path>
              </svg>
              <input
                ref={durationRef}
                name="duration"
                className="input"
                placeholder="Khoảng thời gian"
                onKeyDown={handleKeyPress}
              />
            </label>
          </div>
          <div className="col-lg-3">
            <label className="input-search">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M2 22C2 17.5817 5.58172 14 10 14C14.4183 14 18 17.5817 18 22H2ZM10 13C6.685 13 4 10.315 4 7C4 3.685 6.685 1 10 1C13.315 1 16 3.685 16 7C16 10.315 13.315 13 10 13ZM17.3628 15.2332C20.4482 16.0217 22.7679 18.7235 22.9836 22H20C20 19.3902 19.0002 17.0139 17.3628 15.2332ZM15.3401 12.9569C16.9728 11.4922 18 9.36607 18 7C18 5.58266 17.6314 4.25141 16.9849 3.09687C19.2753 3.55397 21 5.57465 21 8C21 10.7625 18.7625 13 16 13C15.7763 13 15.556 12.9853 15.3401 12.9569Z"></path>
              </svg>
              <input
                ref={maxGroupSizeRef}
                name="maxGroupSize"
                className="input"
                placeholder="Số lượng tham gia"
                onKeyDown={handleKeyPress}
              />
            </label>
          </div>
          <div className="col-lg-2">
            <button
              type="button"
              className="button btn-search"
              onClick={handleSearch}
            >
              Tìm kiếm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;

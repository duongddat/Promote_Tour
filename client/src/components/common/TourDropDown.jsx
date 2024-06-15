function TourDropdown({
  handleToggleFilter,
  handleNoSort,
  handleSortTourIncrease,
  handleSortTourDecrease,
  isShowDropDown,
  sortTour,
}) {
  return (
    <div className="search-detail-filter dropdown">
      <div className="md btn btn-filter btn-icon" onClick={handleToggleFilter}>
        {sortTour.name === ""
          ? "Không sắp xếp"
          : sortTour.name === "increase"
          ? "Giá thấp đến cao"
          : "Giá cao đến thấp"}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z"></path>
        </svg>
      </div>
      {isShowDropDown && (
        <div className="dropdown-container search-detail-dropdown">
          <ul className="dropdown-list">
            <li className="dropdown-item" onClick={handleNoSort}>
              Không sắp xếp
            </li>
            <li className="dropdown-item" onClick={handleSortTourIncrease}>
              Giá thấp đến cao
            </li>
            <li className="dropdown-item" onClick={handleSortTourDecrease}>
              Giá cao đến thấp
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default TourDropdown;

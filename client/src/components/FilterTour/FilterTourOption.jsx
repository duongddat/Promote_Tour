import "./FilterTour.css";

function FilterTourOption({
  onFilter,
  ratingFilter,
  setRatingFilter,
  durationFilter,
  setDurationFilter,
}) {
  function handleReset() {
    setRatingFilter("");
    setDurationFilter("");
    onFilter("resetFilter");
  }

  return (
    <div className="card card-filter mb-3">
      <div className="card-padding title-filter">
        <h5 className="md">Lọc kết quả</h5>
        <div className="text-center btn-text">
          <div className="sm" onClick={handleReset}>
            Đặt lại
          </div>
        </div>
      </div>
      <div className="card-padding card-filter-detail">
        <div className="md">Xếp hạng sao</div>
        <label
          id="ratingsAverage[lte]=3"
          className="checkbox_container"
          onClick={() => {
            setRatingFilter("ratingsAverage[lte]=3");
            onFilter("rating", "ratingsAverage[lte]=3");
          }}
        >
          <input
            id="ratingsAverage[lte]=3"
            type="radio"
            name="rating"
            checked={ratingFilter === "ratingsAverage[lte]=3"}
            onChange={() => {}}
          />
          <div className="sm">{`<= 3 sao`}</div>
        </label>
        <label
          id="ratingsAverage[gte]=3&ratingsAverage[lte]=4"
          className="checkbox_container"
          onClick={() => {
            setRatingFilter("ratingsAverage[gte]=3&ratingsAverage[lte]=4");
            onFilter("rating", "ratingsAverage[gte]=3&ratingsAverage[lte]=4");
          }}
        >
          <input
            id="ratingsAverage[gte]=3&ratingsAverage[lte]=4"
            type="radio"
            name="rating"
            checked={
              ratingFilter === "ratingsAverage[gte]=3&ratingsAverage[lte]=4"
            }
            onChange={() => {}}
          />
          <div className="sm">{`>= 3 sao và <= 4 sao`}</div>
        </label>
        <label
          id="ratingsAverage[gte]=4"
          className="checkbox_container"
          onClick={() => {
            setRatingFilter("ratingsAverage[gte]=4");
            onFilter("rating", "ratingsAverage[gte]=4");
          }}
        >
          <input
            id="ratingsAverage[gte]=4"
            type="radio"
            name="rating"
            checked={ratingFilter === "ratingsAverage[gte]=4"}
            onChange={() => {}}
          />
          <div className="sm">{`>= 4 sao`}</div>
        </label>
      </div>
      <div className="card-padding card-filter-detail">
        <div className="md">Xếp hạng thời lượng</div>
        <label
          id="duration[lte]=5"
          className="checkbox_container"
          onClick={() => {
            setDurationFilter("duration[lte]=5");
            onFilter("duration", "duration[lte]=5");
          }}
        >
          <input
            id="duration[lte]=5"
            type="radio"
            name="duration"
            checked={durationFilter === "duration[lte]=5"}
            onChange={() => {}}
          />
          <div className="sm">{`<= 5 ngày`}</div>
        </label>
        <label
          id="duration[gte]=5"
          className="checkbox_container"
          onClick={() => {
            setDurationFilter("duration[gte]=5");
            onFilter("duration", "duration[gte]=5");
          }}
        >
          <input
            id="duration[gte]=5"
            type="radio"
            name="duration"
            checked={durationFilter === "duration[gte]=5"}
            onChange={() => {}}
          />
          <div className="sm">{`>= 5 ngày`}</div>
        </label>
      </div>
    </div>
  );
}

export default FilterTourOption;

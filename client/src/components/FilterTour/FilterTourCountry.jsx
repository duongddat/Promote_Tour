import { NavLink } from "react-router-dom";
import "./FilterTour.css";

function FilterTour({ countries, onReset }) {
  return (
    <div className="card card-filter">
      <div className="card-padding title-filter">
        <h5 className="md">Quốc gia</h5>
      </div>
      <div className="card-padding card-filter-detail">
        <div className="card-filter-item md">
          <NavLink
            to="/tours"
            className={({ isActive }) =>
              isActive ? "active-country" : undefined
            }
            end
            onClick={onReset}
          >
            Tất cả
          </NavLink>
        </div>
        {countries.length > 0 &&
          countries.map((country) => (
            <div key={country._id} className="card-filter-item md">
              <NavLink
                to={`/tours/search/${country.slug}`}
                className={({ isActive }) =>
                  isActive ? "active-country" : undefined
                }
                onClick={onReset}
              >
                {country.name}
              </NavLink>
            </div>
          ))}
      </div>
    </div>
  );
}

export default FilterTour;

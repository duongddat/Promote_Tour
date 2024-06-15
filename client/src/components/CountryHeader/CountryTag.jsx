import { NavLink } from "react-router-dom";

function CountryTag({ countries }) {
  return (
    <>
      <h5 className="footer-item_title mb-3">Chủ đề</h5>
      <div className="country__list justify-content-start">
        <NavLink
          to={`/blog`}
          className={({ isActive }) =>
            isActive ? "active-tag blog-country sm tag" : "blog-country sm tag"
          }
          end
        >
          # Tất cả
        </NavLink>
        {countries.map((country, index) => (
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "active-tag blog-country sm tag"
                : "blog-country sm tag"
            }
            key={index}
            to={`/blog/country/${country.slug}`}
          >
            # {country.name}
          </NavLink>
        ))}
      </div>
    </>
  );
}

export default CountryTag;

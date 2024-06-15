import { Link } from "react-router-dom";

function CountryItem({ country }) {
  return (
    <div className="country__item">
      <Link className="country__link" to={`/tours/search/${country.slug}`}>
        {country.name}
      </Link>
    </div>
  );
}

export default CountryItem;

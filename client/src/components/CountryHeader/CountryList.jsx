import CountryItem from "./CountryItem.jsx";
import "./Country.css";

function CountryList({ countries }) {
  return (
    <div className="country__list">
      {countries.map((country, index) => (
        <CountryItem key={index} country={country} />
      ))}
    </div>
  );
}

export default CountryList;

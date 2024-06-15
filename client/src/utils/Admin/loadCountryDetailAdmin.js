/* eslint-disable no-unused-vars */
import { defer, json } from "react-router-dom";

async function loadCountryDetail(id) {
  const response = await fetch("http://localhost:8080/countries/" + id);

  if (!response.ok) {
    throw json(
      { message: "Could not fetch details for selected country" },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return resData.data.country;
  }
}

export async function loader({ request, params }) {
  const id = params.idCountry;

  return defer({
    country: await loadCountryDetail(id),
  });
}

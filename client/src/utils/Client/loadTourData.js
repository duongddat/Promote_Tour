/* eslint-disable no-unused-vars */
import { defer, json } from "react-router-dom";

async function loaderTour(requestUrl) {
  const limit = requestUrl.includes("?") ? "&limit=6" : "?limit=6";
  const response = await fetch(
    "http://localhost:8080/tours" + requestUrl + limit
  );

  if (!response.ok) {
    throw json(
      { message: "Could not fetch tours." },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return {
      tours: resData.data.tours,
      totalTours: resData.data.totalTours,
      pageNumber: resData.data.pageNumber,
    };
  }
}

async function loaderCountry() {
  const response = await fetch("http://localhost:8080/countries");

  if (!response.ok) {
    throw json(
      { message: "Could not fetch countries." },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return resData.data.countries;
  }
}

export async function loader({ request, params }) {
  const url = request.url;
  const match = url.match(/tours(.*)/);
  let requestUrl = "";

  if (match && match[1]) {
    let afterTours = match[1];

    if (afterTours.startsWith("/search") || afterTours.startsWith("?")) {
      requestUrl = afterTours;
    }
  }

  const [toursData, countriesData] = await Promise.all([
    loaderTour(requestUrl),
    loaderCountry(),
  ]);

  return {
    tours: toursData.tours,
    totalTours: toursData.totalTours,
    pageNumber: toursData.pageNumber,
    countries: countriesData,
  };
}

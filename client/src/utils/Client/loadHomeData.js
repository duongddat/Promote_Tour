import { defer, json } from "react-router-dom";

async function loaderTour() {
  const response = await fetch(
    "http://localhost:8080/tours/top-tour?sort=-ratingsAverage&page=1&limit=8"
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
    return resData.data.tours;
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

async function loaderReview() {
  const response = await fetch("http://localhost:8080/reviews/top-review");

  if (!response.ok) {
    throw json(
      { message: "Could not fetch reviews." },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return resData.data.reviews;
  }
}

export async function loader() {
  return defer({
    tours: await loaderTour(),
    countries: loaderCountry(),
    reviews: loaderReview(),
  });
}

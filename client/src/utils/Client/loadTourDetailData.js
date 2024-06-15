/* eslint-disable no-unused-vars */
import { defer, json } from "react-router-dom";

async function loadTourDetail(slug) {
  const response = await fetch("http://localhost:8080/tours/detail/" + slug);

  if (!response.ok) {
    throw json(
      { message: "Could not fetch details for selected tour." },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return resData.data.tour;
  }
}

export async function loader({ request, params }) {
  const slug = params.slug;

  return defer({
    tour: await loadTourDetail(slug),
  });
}

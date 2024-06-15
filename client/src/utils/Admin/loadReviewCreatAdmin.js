/* eslint-disable no-unused-vars */
import { defer, json } from "react-router-dom";

async function loadTours() {
  const response = await fetch("http://localhost:8080/tours?limit=999");

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

export async function loader({ request, params }) {
  return defer({
    tours: await loadTours(),
  });
}

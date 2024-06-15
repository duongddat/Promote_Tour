/* eslint-disable no-unused-vars */
import { defer, json } from "react-router-dom";

async function loadMyTour() {
  const token = localStorage.getItem("token");
  if (!token) {
    throw json(
      { message: "Please login to use this route." },
      {
        status: 400,
      }
    );
  }
  const response = await fetch("http://localhost:8080/booking/my-tour", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw json(
      { message: "Could not fetch your booking." },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return resData.data.booking;
  }
}

export async function loader({ request, params }) {
  return defer({
    booking: await loadMyTour(),
  });
}

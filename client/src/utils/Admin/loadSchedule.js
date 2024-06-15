/* eslint-disable no-unused-vars */
import { defer, json } from "react-router-dom";

async function loaderBookingOfGuide() {
  const token = localStorage.getItem("token");
  if (!token) {
    throw json(
      { message: "Please login to use this route." },
      {
        status: 400,
      }
    );
  }
  const response = await fetch(
    "http://localhost:8080/statis/booking-by-guide",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw json(
      { message: "Could not fetch statistic." },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return resData.data.statistics;
  }
}

async function loaderChart() {
  const token = localStorage.getItem("token");
  if (!token) {
    throw json(
      { message: "Please login to use this route." },
      {
        status: 400,
      }
    );
  }
  const response = await fetch("http://localhost:8080/statis/booking-statics", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw json(
      { message: "Could not fetch statistic." },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return resData.data.monthlyBookingStatistics;
  }
}

export async function loader({ request, params }) {
  return defer({
    booking: await loaderBookingOfGuide(),
    chart: await loaderChart(),
  });
}

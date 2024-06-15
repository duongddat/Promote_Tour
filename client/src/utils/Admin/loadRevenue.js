/* eslint-disable no-unused-vars */
import { defer, json } from "react-router-dom";

async function loaderYearRevenue() {
  const token = localStorage.getItem("token");
  if (!token) {
    throw json(
      { message: "Please login to use this route." },
      {
        status: 400,
      }
    );
  }
  const response = await fetch("http://localhost:8080/statis/year-static", {
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
    return resData.data.statistics;
  }
}

async function loaderRevenue(year) {
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
    "http://localhost:8080/statis/revenue-booking?year=" + year,
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

export async function loader({ request, params }) {
  const url = request.url;
  const searchParams = new URLSearchParams(new URL(url).search);
  const year = searchParams.get("year");
  let currentYear = new Date().getFullYear();

  if (year) {
    currentYear = year;
  }

  return defer({
    revenue: await loaderRevenue(currentYear),
    year: await loaderYearRevenue(),
  });
}

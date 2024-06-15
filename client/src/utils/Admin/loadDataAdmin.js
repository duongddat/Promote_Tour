import { defer, json } from "react-router-dom";

async function loaderCountTourOfCountry() {
  const token = localStorage.getItem("token");
  if (!token) {
    throw json(
      { message: "Please login to use this route." },
      {
        status: 400,
      }
    );
  }
  const response = await fetch("http://localhost:8080/tours/tour-of-country", {
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
    return resData.data.statistic;
  }
}

async function loaderNewRecord() {
  const token = localStorage.getItem("token");
  if (!token) {
    throw json(
      { message: "Please login to use this route." },
      {
        status: 400,
      }
    );
  }
  const response = await fetch("http://localhost:8080/statis/new-record", {
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
    return resData.data.statis;
  }
}

export async function loader() {
  return defer({
    chart: await loaderCountTourOfCountry(),
    record: loaderNewRecord(),
  });
}

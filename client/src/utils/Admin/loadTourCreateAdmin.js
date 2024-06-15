/* eslint-disable no-unused-vars */
import { defer, json } from "react-router-dom";

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

async function loaderGuide() {
  const token = localStorage.getItem("token");
  if (!token) {
    throw json(
      { message: "Please login to use this route." },
      {
        status: 400,
      }
    );
  }
  const response = await fetch("http://localhost:8080/users/list-guide", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw json(
      { message: "Could not fetch guide." },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return resData.data.users;
  }
}

export async function loader({ request, params }) {
  return defer({
    countries: await loaderCountry(),
    guides: await loaderGuide(),
  });
}

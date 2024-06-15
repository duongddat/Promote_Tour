/* eslint-disable no-unused-vars */
import { defer, json } from "react-router-dom";

async function loaderUser(id) {
  const token = localStorage.getItem("token");
  if (!token) {
    throw json(
      { message: "Please login to use this route." },
      {
        status: 400,
      }
    );
  }

  const response = await fetch(`http://localhost:8080/users/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw json(
      { message: "Could not fetch user detail." },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return resData.data.user;
  }
}

export async function loader({ request, params }) {
  const id = params.idUser;

  return defer({
    user: await loaderUser(id),
  });
}

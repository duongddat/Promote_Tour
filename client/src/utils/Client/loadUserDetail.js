/* eslint-disable no-unused-vars */
import { defer, json } from "react-router-dom";

async function loaderUserDetail() {
  const token = localStorage.getItem("token");
  if (!token) {
    throw json(
      { message: "Vui lòng đăng nhập!!!" },
      {
        status: 500,
      }
    );
  }

  const response = await fetch("http://localhost:8080/users/me", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
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
  return defer({
    user: await loaderUserDetail(),
  });
}

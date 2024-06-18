import { defer, json } from "react-router-dom";

async function loaderUsers() {
  const token = localStorage.getItem("token");
  if (!token) {
    throw json(
      { message: "Please login to use this route." },
      {
        status: 400,
      }
    );
  }

  const response = await fetch("http://localhost:8080/users?limit=10&page=1", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw json(
      { message: "Could not fetch tours." },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return resData.data;
  }
}

export async function loader() {
  return defer({
    users: await loaderUsers(),
  });
}

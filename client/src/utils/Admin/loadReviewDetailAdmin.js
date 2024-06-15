/* eslint-disable no-unused-vars */
import { defer, json } from "react-router-dom";

async function loaderReview(id) {
  const token = localStorage.getItem("token");
  if (!token) {
    throw json(
      { message: "Please login to use this route." },
      {
        status: 400,
      }
    );
  }

  const response = await fetch(`http://localhost:8080/reviews/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw json(
      { message: "Could not fetch review detail." },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return resData.data.review;
  }
}

export async function loader({ request, params }) {
  const id = params.idReview;
  return defer({
    review: await loaderReview(id),
  });
}

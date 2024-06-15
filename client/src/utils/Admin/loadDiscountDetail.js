/* eslint-disable no-unused-vars */
import { defer, json } from "react-router-dom";

async function loadDiscount(id) {
  const response = await fetch("http://localhost:8080/discounts/" + id);

  if (!response.ok) {
    throw json(
      { message: "Could not fetch details for selected discount." },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return resData.data.discount;
  }
}

export async function loader({ request, params }) {
  const id = params.idDiscount;
  return defer({
    discount: await loadDiscount(id),
  });
}

import { defer, json } from "react-router-dom";

async function loaderDiscounts() {
  const response = await fetch(
    "http://localhost:8080/discounts?limit=10&page=1"
  );

  if (!response.ok) {
    throw json(
      { message: "Could not fetch discounts." },
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
    discounts: await loaderDiscounts(),
  });
}

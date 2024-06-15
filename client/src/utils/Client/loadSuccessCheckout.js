/* eslint-disable no-unused-vars */

import { json } from "react-router-dom";

export async function loader({ request, params }) {
  const id = params.idBooking;
  if (!id) {
    throw json(
      { message: "Could not get booking id." },
      {
        status: 401,
      }
    );
  }

  const response = await fetch(
    "http://localhost:8080/booking/success/?id=" + id
  );

  if (!response.ok) {
    throw json(
      { message: "Could not fetch success checkout booking." },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return resData;
  }
}

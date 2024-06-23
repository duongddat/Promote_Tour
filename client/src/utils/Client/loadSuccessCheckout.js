/* eslint-disable no-unused-vars */

import { json } from "react-router-dom";

export async function loader({ request, params }) {
  const booking = params.booking;
  if (!booking) {
    throw json(
      { message: "Could not get booking data." },
      {
        status: 401,
      }
    );
  }

  const response = await fetch(
    "http://localhost:8080/booking/success/?booking=" + booking
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

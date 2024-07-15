/* eslint-disable no-unused-vars */
import { defer, json } from "react-router-dom";

async function loaderNotification() {
  const token = localStorage.getItem("token");
  if (!token) {
    throw json(
      { message: "Please login to manage your notification." },
      {
        status: 400,
      }
    );
  }
  const response = await fetch("http://localhost:8080/notifications", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw json(
      { message: "Could not fetch notifications." },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return {
      notifications: resData.data.notifications,
      limitNoti: resData.data.limitNoti,
    };
  }
}

export async function loader() {
  const notificationsData = await loaderNotification();
  return {
    notifications: notificationsData.notifications,
    limitNoti: notificationsData.limitNoti,
  };
}

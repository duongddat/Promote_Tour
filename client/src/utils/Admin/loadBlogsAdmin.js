/* eslint-disable no-unused-vars */
import { defer, json } from "react-router-dom";

async function loaderBlog() {
  const response = await fetch("http://localhost:8080/posts?limit=10&page=1");

  if (!response.ok) {
    throw json(
      { message: "Could not fetch blogs." },
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
    blogs: await loaderBlog(),
  });
}

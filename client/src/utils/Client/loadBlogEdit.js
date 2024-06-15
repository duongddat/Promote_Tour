/* eslint-disable no-unused-vars */
import { defer, json } from "react-router-dom";

async function loaderBlogDetail(idBlog) {
  const response = await fetch(`http://localhost:8080/posts/${idBlog}`);

  if (!response.ok) {
    throw json(
      { message: "Could not fetch blog." },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return resData.data.post;
  }
}

async function loaderCountry() {
  const response = await fetch("http://localhost:8080/countries");

  if (!response.ok) {
    throw json(
      { message: "Could not fetch countries." },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return resData.data.countries;
  }
}

export async function loader({ request, params }) {
  const idBlog = params.idBlog;

  return defer({
    blog: await loaderBlogDetail(idBlog),
    countries: loaderCountry(),
  });
}

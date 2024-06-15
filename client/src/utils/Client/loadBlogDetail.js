/* eslint-disable no-unused-vars */
import { defer, json } from "react-router-dom";

async function loadBlogDetail(idBlog) {
  const response = await fetch("http://localhost:8080/posts/" + idBlog);

  if (!response.ok) {
    throw json(
      { message: "Could not fetch details for selected post." },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return resData.data.post;
  }
}

async function loadRelatedBlog(idBlog) {
  const response = await fetch(
    "http://localhost:8080/posts/related-posts/" + idBlog
  );

  if (!response.ok) {
    throw json(
      { message: "Could not fetch details for selected post." },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return resData.data.posts;
  }
}

export async function loader({ request, params }) {
  const idBlog = params.idBlog;

  return defer({
    blog: await loadBlogDetail(idBlog),
    blogsRelated: loadRelatedBlog(idBlog),
  });
}

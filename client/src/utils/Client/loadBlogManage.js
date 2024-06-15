/* eslint-disable no-unused-vars */
import { defer, json } from "react-router-dom";

async function loadBlogManage() {
  const token = localStorage.getItem("token");
  if (!token) {
    throw json(
      { message: "Please login to manage your blog." },
      {
        status: 400,
      }
    );
  }
  const response = await fetch("http://localhost:8080/posts/my-post", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw json(
      { message: "Could not fetch your post." },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return {
      blogs: resData.data.posts,
      totalBlogs: resData.data.totalPosts,
      pageNumber: resData.data.pageNumber,
    };
  }
}

export async function loader({ request, params }) {
  const blogManage = await loadBlogManage();
  return {
    blogs: blogManage.blogs,
    pageNumber: blogManage.pageNumber,
  };
}

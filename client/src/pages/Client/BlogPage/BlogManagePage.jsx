import { useLoaderData, useNavigate } from "react-router-dom";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";

import BlogManage from "../../../components/Blogs/BlogManage";

function BlogManagePage() {
  const navigative = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const { blogs, pageNumber } = useLoaderData();
  const [blogsData, setBlogsData] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  //Socket
  const [blogRelateTime, setBlogRelateTime] = useState([]);
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = io("http://localhost:8080");

    socketRef.current.on("update_posts_manage", (updatedPosts) => {
      setBlogRelateTime(updatedPosts);
    });
  }, []);

  function handleSocketPost() {
    if (socketRef.current) {
      socketRef.current.emit("like_posts_manage", page, 6, userInfo._id);
    }
  }

  const displayBlogs = blogRelateTime.length !== 0 ? blogRelateTime : blogs;

  useEffect(() => {
    if (userInfo === null) {
      navigative("/blog");
    }
  }, [userInfo, navigative]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [page, blogsData] = await Promise.all([pageNumber, blogs]);

        setTotalPage(page);
        setBlogsData(blogsData);
      } catch (error) {
        console.error("Error loading tour data:", error);
      }
      setLoading(false);
    };

    fetchData();
  }, [blogs, pageNumber]);

  const loadBlogData = useCallback(
    async (requestUrl = "") => {
      try {
        const response = await fetch(
          `http://localhost:8080/posts/my-post${requestUrl}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Could not fetch blogs.");
        }

        const resData = await response.json();
        setBlogsData(resData.data.posts);
        setTotalPage(resData.data.pageNumber);
      } catch (error) {
        console.log(error);
      }
    },
    [userInfo]
  );

  const updateQuery = useCallback(
    (name = "", value = "") => {
      console.log(name, value);
      let queryOptions = [];

      if (name === "page" || page) {
        queryOptions.push(name === "page" ? value : `page=${page}`);
      }

      const queryString =
        queryOptions.length > 0
          ? `?limit=6&${queryOptions.join("&")}`
          : "?limit=6";

      console.log(queryString);

      loadBlogData(queryString);
    },
    [page, loadBlogData]
  );

  function handleCheckPageToDelete() {
    console.log("Check manage blog");
    if (blogsData.length === 1 && page > 1) {
      setPage((prevPage) => prevPage - 1);
      updateQuery("page", `page=${page - 1}`);
    }

    updateQuery("page", `page=${page}`);
  }

  return (
    <>
      {loading ? (
        <h5 className="text-center mt-5">Đang tải......</h5>
      ) : (
        <BlogManage
          userInfo={userInfo}
          blogs={displayBlogs}
          pageNumber={totalPage}
          setPage={setPage}
          onPaginate={updateQuery}
          onSocket={handleSocketPost}
          onDeleteBlog={handleCheckPageToDelete}
        />
      )}
    </>
  );
}

export default BlogManagePage;

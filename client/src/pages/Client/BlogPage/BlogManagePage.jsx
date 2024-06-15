import { useLoaderData } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import BlogManage from "../../../components/Blogs/BlogManage";

function BlogManagePage() {
  const { blogs, pageNumber } = useLoaderData();
  const [blogsData, setBlogsData] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

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

  const loadBlogData = useCallback(async (requestUrl = "") => {
    try {
      const response = await fetch(
        `http://localhost:8080/posts/my-post${requestUrl}`
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
  }, []);

  const updateQuery = useCallback(
    (name = "", value = "") => {
      let queryOptions = [];

      if (name === "page" || page) {
        queryOptions.push(name === "page" ? value : `page=${page}`);
      }

      const queryString =
        queryOptions.length > 0
          ? `?limit=6&${queryOptions.join("&")}`
          : "?limit=6";

      loadBlogData(queryString);
    },
    [page, loadBlogData]
  );

  return (
    <>
      {loading ? (
        <h5 className="text-center mt-5">Đang tải......</h5>
      ) : (
        <BlogManage
          blogs={blogsData}
          pageNumber={totalPage}
          setPage={setPage}
          onPaginate={updateQuery}
        />
      )}
    </>
  );
}

export default BlogManagePage;

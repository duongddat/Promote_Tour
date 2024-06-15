import { Link, useLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";

import BlogForm from "../../../components/Blogs/BlogForm";
import { useAction } from "../../../hooks/useAction";
import { editBlog } from "../../../utils/Client/https";

function BlogEditPage() {
  const { blog, countries } = useLoaderData();
  const [loading, setLoading] = useState(false);
  const [countriesData, setCountriesData] = useState([]);
  const [blogData, setBlogData] = useState();
  const { isLoading, action } = useAction(editBlog, "/blog");

  useEffect(() => {
    async function getData() {
      setLoading(true);
      try {
        setCountriesData(await countries);
        setBlogData(await blog);
      } catch (error) {
        console.error("Error loading tour data:", error);
      }
      setLoading(false);
    }

    getData();
  }, [countries, blog]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section>
      <div className="container container-medium">
        <div className="tour-content">
          <div className="blog-header__title sm fs-5 mb-4">
            <span>Chỉnh sửa bài</span>
            <Link to="/blog" className="button">
              <i className="ri-file-list-3-line"></i>
              <span>Trở về trang blog</span>
            </Link>
          </div>
          {loading && <p className="text-center">Loading data....</p>}
          {!loading && (
            <BlogForm
              countries={countriesData}
              isLoading={isLoading}
              action={action}
              blog={blogData}
            />
          )}
        </div>
      </div>
    </section>
  );
}

export default BlogEditPage;

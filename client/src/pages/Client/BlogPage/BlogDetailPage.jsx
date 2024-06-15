import { Await, Link, useLoaderData, useNavigate } from "react-router-dom";
import { Suspense, useEffect } from "react";

import BlogDetail from "../../../components/Blogs/BlogDetail";
import { useDispatch, useSelector } from "react-redux";
import { setMessage } from "../../../store/message-slice";
import BlogRelated from "../../../components/Blogs/BlogRelated";

function BlogDetailPage() {
  const { blog, blogsRelated } = useLoaderData();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  function handleCheckUser() {
    if (!userInfo) {
      dispatch(
        setMessage({
          type: "error",
          message: "Vui lòng đăng nhập để quản lý bài viết của bạn!",
        })
      );
      return;
    }

    navigate("/blog/manage");
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="section-bg">
      <div className="container">
        <div className="row row-gap-5">
          <div className="col-xl-9 col-lg-8 col-md-12 col-12">
            <div className="tour-content blog-container">
              <Suspense
                fallback={
                  <p style={{ textAlign: "center" }}>Loading Blog...</p>
                }
              >
                <Await resolve={blog}>
                  {(loadedBlog) => <BlogDetail blog={loadedBlog} />}
                </Await>
              </Suspense>
            </div>
          </div>
          <div className="col-xl-3 col-lg-4 col-md-12 col-sm-12">
            <div className="sticky">
              <div className="tour-content px-3 mb-4">
                <div className="text-center py-2 px-1 mb-2">
                  <h5 className="md fs-5 fw-bold mb-3">Creator HoYo</h5>
                  <p className="sm mb-2">
                    Hãy tham cùng chúng tôi! Cùng nhau chia sẽ những kỷ niệm
                  </p>
                </div>
                <div className="blog-tool__list">
                  <Link to="/blog/create" className="blog-tool__item">
                    <i className="ri-add-circle-fill"></i>
                    <span className="sm fs-6">Tạo bài viết</span>
                  </Link>
                  <div className="blog-tool__item" onClick={handleCheckUser}>
                    <i className="ri-settings-5-fill"></i>
                    <span className="sm fs-6">Quản lý bài viết</span>
                  </div>
                </div>
              </div>
              <Suspense
                fallback={
                  <p style={{ textAlign: "center" }}>Loading Blog...</p>
                }
              >
                <Await resolve={blogsRelated}>
                  {(loadedData) => <BlogRelated blogs={loadedData} />}
                </Await>
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BlogDetailPage;

import { Link, useLoaderData, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

import Subtitle from "../../../shared/Subtitle";
import headingBorderImg from "../../../assets/img/heading-border.webp";
import BlogList from "../../../components/Blogs/BlogList";
import CountryTag from "../../../components/CountryHeader/CountryTag";
import { setMessage } from "../../../store/message-slice";
import "./BlogPage.css";

function BlogPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { blogs, pageNumber, countries } = useLoaderData();

  const { userInfo } = useSelector((state) => state.auth);
  const [page, setPage] = useState(1);
  const [countriesData, setCountriesData] = useState([]);
  const [blogsData, setBlogsData] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const listRef = useRef(null);

  //Socket
  const [blogRelateTime, setBlogRelateTime] = useState([]);
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = io("http://localhost:8080");

    socketRef.current.on("update_posts", (updatedPosts) => {
      setBlogRelateTime(updatedPosts);
    });
  }, []);

  function handleSocketPost() {
    if (socketRef.current) {
      socketRef.current.emit("like_posts", page, 6);
    }
  }

  const displayBlogs = blogRelateTime.length !== 0 ? blogRelateTime : blogs;

  const loadBlogData = useCallback(async (slug = "", requestUrl = "") => {
    try {
      let slugCountry = slug ? `/country/${slug}` : "";
      const response = await fetch(
        `http://localhost:8080/posts${slugCountry}${requestUrl}`
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

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [page, blogsData, countriesData] = await Promise.all([
          pageNumber,
          blogs,
          countries,
        ]);

        setTotalPage(page);
        setBlogsData(blogsData);
        setCountriesData(countriesData);
      } catch (error) {
        console.error("Error loading tour data:", error);
      }
      setLoading(false);
    };

    fetchData();
  }, [blogs, countries, pageNumber]);

  const handleCheckUser = useCallback(() => {
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
  }, [userInfo, dispatch, navigate]);

  const handleScrollTopList = useCallback(() => {
    if (listRef.current) {
      const topPosition = listRef.current.offsetTop;
      window.scrollTo({ top: topPosition - 100, behavior: "smooth" });
    }
  }, []);

  const handlePagination = (page) => {
    setPage(page);
    updateQuery("page", `page=${page}`);
    handleScrollTopList();
  };

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

      loadBlogData(slug, queryString);
    },
    [page, loadBlogData, slug]
  );

  function handleCheckPageToDelete() {
    if (blogsData.length === 1 && page > 1) {
      setPage((prevPage) => prevPage - 1);
      updateQuery("page", `page=${page - 1}`);
    }

    updateQuery("page", `page=${page}`);
  }

  return (
    <section className="section-bg">
      <div className="container">
        <div className="d-flex flex-column gap-16 blog-header">
          <div>
            <Subtitle subtitle="Blog~" />
            <h4 className="header__title">
              Khám phá Sự đặc sắc và
              <br /> Cập nhật tin tức mới nhất
            </h4>
          </div>
          <p>
            HoYoViVu, nơi mà việc khám phá thế giới trở nên dễ dàng hơn bao giờ
            hết!
            <br /> Blog chuyên cung cấp thông tin về tour du lịch của chúng tôi
            là điểm đến lý tưởng cho những ai đam mê khám phá và trải nghiệm các
            điểm đến mới mẻ trên khắp thế giới.
          </p>
          <div>
            <img src={headingBorderImg} alt="Heading Border Image" />
          </div>
        </div>
        <div className="row row-gap-5 mt-5" ref={listRef}>
          <div className="col-xl-9 col-lg-9 col-md-12 col-12">
            {loading ? (
              <h5 className="text-center mt-5">Đang tải......</h5>
            ) : (
              <BlogList
                blogs={displayBlogs}
                pageNumber={totalPage}
                currentPage={page}
                onPaginate={handlePagination}
                onSocket={handleSocketPost}
                onDeleteBlog={handleCheckPageToDelete}
              />
            )}
          </div>
          <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12">
            <div className="sticky">
              <div className="tour-content px-3 mb-3">
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
              {loading ? (
                <h5 className="text-center mt-5">Đang tải......</h5>
              ) : (
                <CountryTag countries={countriesData} />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BlogPage;

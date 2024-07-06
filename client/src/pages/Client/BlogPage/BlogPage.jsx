import { Link, useLoaderData, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useRef, useState } from "react";

import { socket } from "../../../helper/socket";
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
  const [blogsData, setBlogsData] = useState(blogs);
  const [totalPage, setTotalPage] = useState(pageNumber);
  const listRef = useRef(null);
  const [blogRelateTime, setBlogRelateTime] = useState([]);

  // Fetch blogs function
  const fetchBlogs = useCallback(async (slug = "", requestUrl = "") => {
    try {
      let slugCountry = slug ? `/country/${slug}` : "";
      const response = await fetch(
        `http://localhost:8080/posts${slugCountry}${requestUrl}`
      );

      if (!response.ok) {
        throw new Error("Could not fetch blogs.");
      }

      const resData = await response.json();
      return { posts: resData.data.posts, pageNumber: resData.data.pageNumber };
    } catch (error) {
      console.error("Error fetching blogs:", error);
      throw error;
    }
  }, []);

  // // Fetch initial data
  // useEffect(() => {
  //   const fetchData = async () => {
  //     setLoading(true);
  //     try {
  //       const [loadedPageNumber, loadedBlogs, loadedCountries] =
  //         await Promise.all([pageNumber, blogs, countries]);

  //       setTotalPage(loadedPageNumber);
  //       setBlogsData(loadedBlogs);
  //       setCountriesData(loadedCountries);
  //     } catch (error) {
  //       console.error("Error loading initial data:", error);
  //     }
  //     setLoading(false);
  //   };

  //   fetchData();
  // }, [blogs, countries, pageNumber]);

  // Socket connection
  useEffect(() => {
    socket.on("update_posts", (updatedPosts) => {
      setBlogRelateTime(updatedPosts);
    });

    return () => {
      socket.off("update_posts", (updatedPosts) => {
        setBlogRelateTime(updatedPosts);
      });
    };
  }, []);

  // Handle socket event
  const handleSocketPost = () => {
    socket.emit("like_posts", page, 6);
  };

  // Update query and load new data
  const updateQuery = useCallback(
    async (name = "", value = "") => {
      let queryOptions = [];

      if (name === "page" || page) {
        queryOptions.push(name === "page" ? value : `page=${page}`);
      }

      const queryString =
        queryOptions.length > 0
          ? `?limit=6&${queryOptions.join("&")}`
          : "?limit=6";

      try {
        const { posts, pageNumber } = await fetchBlogs(slug, queryString);
        setBlogsData(posts);
        setTotalPage(pageNumber);
      } catch (error) {
        console.error("Error updating query:", error);
      }
    },
    [page, slug, fetchBlogs]
  );

  // Pagination handler
  const handlePagination = (newPage) => {
    setPage(newPage);
    updateQuery("page", `page=${newPage}`);
    handleScrollTopList();
  };

  // Scroll to top of list handler
  const handleScrollTopList = useCallback(() => {
    if (listRef.current) {
      const topPosition = listRef.current.offsetTop;
      window.scrollTo({ top: topPosition - 100, behavior: "smooth" });
    }
  }, []);

  // Check user authentication
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

  // Check if we need to adjust page number after deleting blog
  const handleCheckPageToDelete = () => {
    console.log("Delete blog");
    if (blogsData.length === 1 && page > 1) {
      setPage((prevPage) => prevPage - 1);
      updateQuery("page", `page=${page - 1}`);
    }

    updateQuery("page", `page=${page}`);
  };

  const displayBlogs = blogRelateTime.length !== 0 ? blogRelateTime : blogsData;

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
            <BlogList
              blogs={displayBlogs}
              pageNumber={totalPage}
              currentPage={page}
              onPaginate={handlePagination}
              onSocket={handleSocketPost}
              onDeleteBlog={handleCheckPageToDelete}
            />
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

              <CountryTag countries={countries} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BlogPage;

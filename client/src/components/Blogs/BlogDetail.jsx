import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import parse from "html-react-parser";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { socket } from "../../helper/socket";

import { formatVietnameseDate } from "../../helper/formattingDate";
import BlogSwiperGallery from "./BlogSwiperGallery";
import headingBorderImg from "../../assets/img/heading-border.webp";
import { setMessage } from "../../store/message-slice";
import { useAction } from "../../hooks/useAction";
import { deleteBlog, likeBlog } from "../../utils/Client/https";
import "./Blog.css";
import Spin from "../common/Spin";
import ShowModal from "../common/ShowModal";

function BlogDetail({ blog }) {
  const location = useLocation();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const [blogData, setBlogData] = useState(blog);
  const [liked, setLiked] = useState(
    userInfo && blog.likes.includes(userInfo._id)
  );
  const [modalIsOpen, setIsOpen] = useState(false);
  const { action } = useAction(likeBlog, null, false);
  const { isLoading, action: actionDeleteBlog } = useAction(
    deleteBlog,
    "/blog/manage"
  );

  useEffect(() => {
    socket.on("update_post_detail", (updatedPost) => {
      setBlogData(updatedPost);
      setLiked(userInfo && updatedPost.likes.includes(userInfo._id));
    });
  }, [userInfo]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  async function handleLikeBlog() {
    if (!userInfo) {
      dispatch(
        setMessage({
          type: "error",
          message: "Vui lòng đăng nhập để like bài viết",
        })
      );
    }
    await action({ blogId: blog._id });

    if (socket) {
      socket.emit("like_post_detail", blog._id);
      socket.emit("send_notification", blog.user._id);
    }
  }

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  async function handleDeleteBlog(blogId) {
    await actionDeleteBlog(blogId);

    if (!isLoading) {
      closeModal();
    }
  }

  return (
    <>
      <div className="blog-detail__container">
        <div className="d-flex flex-column gap-16">
          <div className="blog-detail__title mt-3">
            <div className="d-flex flex-column gap-8">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="section-title__header">{blogData.title}</h5>
                {userInfo &&
                  (userInfo._id === blogData.user._id ||
                    userInfo.role === "admin") && (
                    <div className="dropdown">
                      <i
                        className="ri-more-2-fill fs-5"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      ></i>
                      <ul className="dropdown-menu dropdown-menu-end mt-2">
                        {userInfo._id === blogData.user._id && (
                          <>
                            <li>
                              <Link
                                to={`/blog/edit/${blogData._id}`}
                                className="dropdown-item"
                              >
                                Chỉnh sửa
                              </Link>
                            </li>
                            <li>
                              <hr className="dropdown-divider" />
                            </li>
                          </>
                        )}
                        <li>
                          <div className="dropdown-item" onClick={openModal}>
                            Xoá
                          </div>
                        </li>
                      </ul>
                    </div>
                  )}
              </div>
              <div className="d-flex column-gap-3 align-items-center py-2">
                <div className="blog-user__avatar">
                  <LazyLoadImage
                    effect="blur"
                    className="user-avatar"
                    src={`${blogData.user.photo}`}
                    alt={blogData.user._id}
                  />
                </div>
                <div className="d-flex flex-column ">
                  <h5 className="md mb-1">{blogData.user.name}</h5>
                  <span className="sm blog-date">
                    {formatVietnameseDate(blogData.createdAt)}
                  </span>
                </div>
              </div>
              <div>
                <img src={headingBorderImg} alt="Heading Border Image" />
              </div>
            </div>
          </div>
          <div className="blog-detail__body">
            <BlogSwiperGallery photos={blogData.photo} />
            <div>
              <img src={headingBorderImg} alt="Heading Border Image" />
            </div>
            <div className="mhy-text__detail mb-2">
              <h5>Nội dung:</h5>
              <div className="text-description">
                {parse(blogData.description)}
              </div>
            </div>
            <div className="mhy-text__detail">
              <h5 className="mb-3">Chủ đề:</h5>
              <Link
                to={`/blog/country/${blogData.country.slug}`}
                className="blog-country sm tag"
              >
                # {blogData.country.name}
              </Link>
            </div>
          </div>
          <div className="blog-detail__footer">
            <div>
              <img src={headingBorderImg} alt="Heading Border Image" />
            </div>
            <div className="mhy-text__detail">
              <h5>Đánh giá:</h5>
              <div className="my-3 d-flex">
                <div
                  className={`blog-like ${liked ? "blog-liked" : ""}`}
                  onClick={handleLikeBlog}
                >
                  <span className="blog-like__icon">
                    <i className="ri-heart-fill"></i>
                  </span>
                  <span className="blog-like__text">
                    {liked ? "Liked" : "Like"}
                  </span>
                  <span>{blogData.likes.length}</span>
                </div>
              </div>
              <p className="mt-5 text-center text-footer-font">That all~</p>
            </div>
          </div>
        </div>
      </div>
      <ShowModal isOpen={modalIsOpen} onClose={closeModal}>
        <div className="p-3 modal-container">
          <div className="modal-close">
            <i className="ri-close-circle-fill" onClick={closeModal}></i>
          </div>
          <div className="modal-title">
            <h5 className="sm p-2">Bạn có chắc xoá bài?</h5>
          </div>
          <div className="d-flex justify-content-center align-items-center column-gap-3 mt-4">
            <button
              onClick={() => handleDeleteBlog(blogData._id)}
              className="button text-white"
              disabled={isLoading}
            >
              {isLoading ? <Spin text="Xoá..." /> : "Đồng ý"}
            </button>
            <button
              onClick={closeModal}
              className="button btn-red text-white"
              disabled={isLoading}
            >
              Đóng
            </button>
          </div>
        </div>
      </ShowModal>
    </>
  );
}

export default BlogDetail;

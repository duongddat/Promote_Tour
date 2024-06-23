import { LazyLoadImage } from "react-lazy-load-image-component";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import bgManage from "../../assets/img/bg.webp";
import borderAva from "../../assets/img/border-ava.png";
import BlogList from "./BlogList";

function BlogManage({
  userInfo,
  blogs,
  pageNumber,
  setPage,
  onPaginate,
  onSocket,
  onDeleteBlog,
}) {
  const listRef = useRef(null);
  const [totalLikes, setTotalLikes] = useState(0);

  useEffect(() => {
    let total = 0;
    blogs.forEach((post) => {
      total += post.likes.length;
    });
    setTotalLikes(total);
  }, [blogs]);

  function handleScrollTopList() {
    const topPosition = listRef.current.offsetTop;
    window.scrollTo({ top: topPosition - 100, behavior: "smooth" });
  }

  const handlePagination = (page) => {
    setPage(page);
    onPaginate("page", `page=${page}`);
    handleScrollTopList();
  };

  return (
    <div className="blog-manage">
      <div className="profile-container">
        <div className="profile-bg">
          <div className="profile-bg_wrapper">
            <img src={bgManage} alt="background manage" />
            <div className="profile-bg_bot-mark"></div>
          </div>
        </div>
        {userInfo && (
          <div className="profile-content">
            <div className="mhy-topbar">
              <div className="mhy-topbar_container">
                <div className="account-center-topbar_container">
                  <div className="account-cetner-avatar-wrap">
                    <div className="mhy-avatar">
                      <LazyLoadImage
                        effect="blur"
                        className="mhy-avatar_img"
                        src={`${userInfo.photo}`}
                        alt="user avatar"
                      />
                      <LazyLoadImage
                        effect="blur"
                        className="mhy-avatar_pendant"
                        src={borderAva}
                        alt="border image"
                      />
                    </div>
                  </div>
                  <div className="account-center-user-wrap">
                    <div className="account-center-basic-top">
                      <span className="user-basic-nickname">
                        {userInfo.name}
                      </span>
                      <div className="mhy-account-title_level">
                        <span>{userInfo.role}</span>
                      </div>
                    </div>
                    <div className="account-center-basic-bottom">
                      <div className="account-center-basic-item">
                        <span className="account-center-basic-num">
                          {blogs.length}
                        </span>
                        <span className="account-center-basic-name">
                          BÀI VIẾT
                        </span>
                        <span className="account-center-basic-split">/</span>
                      </div>
                      <div className="account-center-basic-item">
                        <span className="account-center-basic-num">
                          {totalLikes}
                        </span>
                        <span className="account-center-basic-name">
                          YÊU THÍCH
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="account-center-btn">
                    <Link to="/blog/create" className="button">
                      Tạo bài viết
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <section className="section-bg">
        <div className="container">
          <div className="row row-gap-3" ref={listRef}>
            <div className="col-xl-9 col-lg-9 col-md-12 col-12">
              <BlogList
                blogs={blogs}
                pageNumber={pageNumber}
                onPaginate={handlePagination}
                onSocket={onSocket}
                onDeleteBlog={onDeleteBlog}
              />
            </div>
            <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12">
              <div className="sticky">
                <div className="blog-manage__footer">
                  <div className="d-flex flex-column">
                    <h5 className="footer-item_title">Liên hệ</h5>
                    <div className="footer-item_block">
                      <div className="item-block_text">
                        <span>HoYoLAB hoyolab@hoyoverse.com</span>
                        <span>Genshin Impact genshin_cs@hoyoverse.com</span>
                        <span>Tears of Themis totcs_glb@hoyoverse.com</span>
                        <span>Honkai: Star Rail hsrcs_en@hoyoverse.com </span>
                        <span>
                          Content Creators contentcreator@hoyoverse.com
                        </span>
                        <span>MixiViVu info@mixivivu.com</span>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex flex-column">
                    <h5 className="footer-item_title">Bản quyền</h5>
                    <div className="item-block_text">
                      <p>Copyright © X.A.D. All Rights Reserved.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default BlogManage;

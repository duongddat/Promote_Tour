import { Link } from "react-router-dom";
import { formatVietnameseDate } from "../../helper/formattingDate";
import { LazyLoadImage } from "react-lazy-load-image-component";

function BlogRelated({ blogs }) {
  return (
    <>
      <h5 className="footer-item_title mb-3">Bài viết liên quan</h5>
      <div className="list-related">
        {blogs.length > 0 &&
          blogs.map((blog) => (
            <Link
              key={blog._id}
              className="item-related card card-border"
              to={`/blog/detail/${blog._id}`}
            >
              <div className="row">
                <div className="col-lg-5 col-md-5 col-5">
                  <LazyLoadImage
                    effect="blur"
                    className="item-related__img"
                    src={`${blog.photo[0]}`}
                    alt="image related"
                  />
                </div>
                <div className="col-lg-7 col-md-7 col-7">
                  <div className="card-blog__content">
                    <div className="blog__body">
                      <h5 className="blog-title fs-small pb-none">
                        {blog.title}
                      </h5>
                      <div className="d-flex column-gap-3 align-items-center">
                        <div className="blog-user__avatar">
                          <LazyLoadImage
                            effect="blur"
                            className="user-avatar "
                            src={`${blog.user[0].photo}`}
                            alt={blog.user[0]._id}
                          />
                        </div>
                        <div className="d-flex flex-column">
                          <h5 className="md fs-small mb-0">
                            {blog.user[0].name}
                          </h5>
                          <span className="sm blog-date sm-x">
                            {formatVietnameseDate(blog.createdAt)}
                          </span>
                        </div>
                      </div>
                      <p className="blog-country mt-2 sm-x">
                        # {blog.country[0].name}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}

        {blogs.length === 0 && (
          <span className="d-flex justify-content-center md">
            Không có bài viết liên quan nào!!!
          </span>
        )}
      </div>
    </>
  );
}

export default BlogRelated;

import Pagination from "../Pagination/Pagination";
import BlogItem from "./BlogItem";
import noDataMessage from "../../assets/img/no-data-message.png";

function BlogList({ blogs, pageNumber, pageCurrent, onPaginate }) {
  const handlePageClick = (event) => {
    const page = event.selected + 1;
    onPaginate(page);
  };

  return (
    <>
      {blogs.length > 0 && (
        <>
          <div className="row row-gap-4 mb-4">
            {blogs.map((blog) => (
              <div key={blog._id} className="col-lg-12 col-md-12 col-12">
                <BlogItem blog={blog} />
              </div>
            ))}
          </div>
          <Pagination
            pageCount={pageNumber}
            pageCurrent={pageCurrent}
            onPageClick={handlePageClick}
          />
        </>
      )}
      {blogs.length === 0 && (
        <div className="tour-content">
          <div className="mhy-data-lg">
            <img src={noDataMessage} alt="No data message blog" />
            <p className="mhy-data-lg_text">Bạn chưa có bài viết nào~</p>
          </div>
        </div>
      )}
    </>
  );
}

export default BlogList;

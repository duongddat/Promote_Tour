import { Await, Link, useLoaderData } from "react-router-dom";
import { Suspense, useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Select from "react-select";

import headingBorderImg from "../../../assets/img/heading-border.webp";

function DetailBlogPage() {
  const { blog } = useLoaderData();
  const [selectedOption, setSelectedOption] = useState(null);
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (blog !== null) {
      setSelectedOption({
        value: blog.country._id,
        label: blog.country.name,
      });

      setDescription(blog.description);
    }
  }, [blog]);

  return (
    <section>
      <div className="tour-content">
        <div className="d-flex justify-content-between align-items-center flex-wrap mt-3">
          <h5 className="table-title">Chi tiết bài viết</h5>
          <Link to="/admin/blogs" className="button d-flex gap-1 fw-bold">
            <i className="ri-file-list-3-line"></i>
            <span>Danh sách bài viết</span>
          </Link>
        </div>
        <div className="mb-2">
          <img src={headingBorderImg} alt="Heading Border Image" />
        </div>
        <div className="my-3">
          <Suspense
            fallback={<p style={{ textAlign: "center" }}>Loading data...</p>}
          >
            <Await resolve={blog}>
              {(loadedBlog) => (
                <div className="form-item-container">
                  <div className="mb-4">
                    <label htmlFor="title" className="form-label">
                      Tiêu đề
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue={loadedBlog ? loadedBlog.title : ""}
                      disabled
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="country" className="form-label">
                      Chủ đề
                    </label>
                    <Select
                      value={selectedOption}
                      defaultValue={selectedOption}
                      onChange={setSelectedOption}
                      isDisabled
                    />
                  </div>
                  <div className="mb-4">
                    {blog && blog.photo.length > 0 && (
                      <div className="mb-4">
                        <label className="form-label">Hình ảnh hiện tại</label>
                        <div className="form-img-upload__imgs">
                          {blog.photo.map((image, index) => (
                            <div key={index} className="form-img-upload__img">
                              <img
                                src={`http://localhost:8080/img/post/${image}`}
                                alt="image upload"
                                className="upload-img"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    <div className="mb-4">
                      <label htmlFor="description" className="form-label">
                        Bài viết
                      </label>
                      <ReactQuill
                        theme="snow"
                        className="quill-height"
                        value={description}
                        readOnly
                      />
                    </div>
                    <p className="text-center my-5 text-footer-font">
                      That all
                    </p>
                  </div>
                </div>
              )}
            </Await>
          </Suspense>
        </div>
      </div>
    </section>
  );
}

export default DetailBlogPage;

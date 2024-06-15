import { useEffect, useRef, useState } from "react";
import { Form } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Select from "react-select";

import "./Blog.css";
import Spin from "../common/Spin";
import { convertToSelectOptions } from "../../helper/setValueOption";
import { useDispatch } from "react-redux";
import { setMessage } from "../../store/message-slice";

function BlogForm({ countries, isLoading, action, blog = null }) {
  const dispatch = useDispatch();
  const inputPhotoRef = useRef();
  const [selectedImages, setSelectedImages] = useState([]);
  const [description, setDescription] = useState(blog ? blog.description : "");
  const [selectedOption, setSelectedOption] = useState(null);
  const optionsCountry = convertToSelectOptions(countries, "_id", "name");
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      ["blockquote"],
      ["link"],

      [{ header: 1 }, { header: 2 }],
      [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
  ];

  useEffect(() => {
    if (blog !== null) {
      setSelectedOption({
        value: blog.country._id,
        label: blog.country.name,
      });
    }
  }, [blog]);

  function handleImageClick() {
    inputPhotoRef.current.click();
  }

  function handleChangeImage(event) {
    const selectedFiles = event.target.files;
    const selectedFilesArray = Array.from(selectedFiles);

    const imagesArray = selectedFilesArray.map((file) => {
      return {
        file: file,
        url: URL.createObjectURL(file),
      };
    });

    setSelectedImages((prevImages) => [...prevImages, ...imagesArray]);
  }

  function handleRemoveImage(image) {
    const updatedImages = selectedImages.filter((e) => e !== image);
    setSelectedImages(updatedImages);

    if (updatedImages.length === 0 && inputPhotoRef.current) {
      inputPhotoRef.current.value = null;
    }
  }

  function handleReset() {
    setSelectedImages([]);
    setDescription("");
  }

  function handleSumbitForm(event) {
    event.preventDefault();

    if (blog === null && selectedImages.length === 0) {
      dispatch(
        setMessage({
          type: "error",
          message: "Vui lòng chọn ảnh cho bài viết!",
        })
      );
      return;
    }

    const formData = new FormData();
    formData.append("title", event.target.title.value);
    formData.append("country", selectedOption.value);
    formData.append("description", description);

    if (selectedImages.length > 0) {
      selectedImages.forEach((image) => {
        formData.append("photo", image.file);
      });
    }

    const data = { formData: formData };

    if (blog != null) {
      data.idBlog = blog._id;
    }

    action(data);
  }

  return (
    <Form className="mb-5" onSubmit={handleSumbitForm}>
      <div className="form-item-container">
        <div className="mb-4">
          <label htmlFor="title" className="form-label">
            Tiêu đề (<span className="text-red">*</span>):
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="form-control"
            placeholder="Tiêu đề blog"
            defaultValue={blog ? blog.title : ""}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="country" className="form-label">
            Chủ đề (<span className="text-red">*</span>)
          </label>
          <Select
            value={selectedOption}
            defaultValue={selectedOption}
            onChange={setSelectedOption}
            options={optionsCountry}
            placeholder="Chọn chủ đề"
            required
          />
        </div>
        <div className="mb-4">
          <label className="form-label">
            Hình ảnh (<span className="text-red">*</span>):
          </label>
          <div className="form-img-upload_tip">
            {
              "Có thể tải lên các file ảnh (định dạng jpg, png, jpeg, gif, webp)"
            }
          </div>
          <div className="form-img-upload__imgs">
            <div
              className="form-img-upload__add form-img-upload__img"
              onClick={handleImageClick}
            >
              <i className="ri-image-add-line"></i>
              <input
                type="file"
                name="photo"
                className="user-input__photo"
                ref={inputPhotoRef}
                multiple
                accept="image/jpg, image/png, image/jpeg, image/gif, image/webp"
                onChange={handleChangeImage}
              />
            </div>
            {selectedImages &&
              selectedImages.map((image, index) => (
                <div key={index} className="form-img-upload__img">
                  <img
                    src={image.url}
                    alt="image upload"
                    className="upload-img"
                  />
                  <div
                    className="upload-status"
                    onClick={() => handleRemoveImage(image)}
                  >
                    <i className="ri-close-line"></i>
                  </div>
                </div>
              ))}
          </div>
        </div>
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
            Bài viết (<span className="text-red">*</span>):
          </label>
          <ReactQuill
            theme="snow"
            className="quill-height"
            placeholder="Nội dung bài viết..."
            modules={modules}
            formats={formats}
            value={description}
            onChange={setDescription}
          />
        </div>
        <div className="my-5 w-100 d-flex justify-content-center align-items-center flex-wrap gap-3">
          <button
            type="reset"
            className="button btn-submit btn-red"
            onClick={handleReset}
          >
            Khôi phục
          </button>
          <button
            type="submit"
            className="button btn-submit"
            disabled={isLoading}
          >
            {isLoading ? <Spin text={"Loading..."} /> : "Đăng bài"}
          </button>
        </div>
      </div>
    </Form>
  );
}

export default BlogForm;

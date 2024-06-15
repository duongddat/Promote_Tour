import { useEffect, useRef, useState } from "react";
import { Form } from "react-router-dom";
import Select from "react-select";

import Spin from "../common/Spin";
import { useDispatch, useSelector } from "react-redux";
import { setMessage } from "../../store/message-slice";

function UserForm({ isLoading, action, user = null }) {
  const dispatch = useDispatch();
  const inputPhotoRef = useRef();
  const [selectedPhoto, setSelectedPhoto] = useState();
  const [selectedOption, setSelectedOption] = useState(null);
  const options = [
    { value: "user", label: "Role: user" },
    { value: "guide", label: "Role: guide" },
    { value: "admin", label: "Role: admin" },
  ];

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user !== null) {
      setSelectedOption({
        value: user.role,
        label: "Role: " + user.role,
      });
    }
  }, [user]);

  function handleImagePhotoClick() {
    inputPhotoRef.current.click();
  }

  function handleChangeImageCover(event) {
    const selectedFile = event.target.files[0];
    const urlImagePhoto = URL.createObjectURL(selectedFile);
    setSelectedPhoto(urlImagePhoto);
  }

  function handleRemoveImageCover() {
    setSelectedPhoto(null);
    inputPhotoRef.current.value = "";
  }

  function handleReset() {
    setSelectedPhoto();
  }

  function handleSubmitForm(event) {
    event.preventDefault();
    const {
      name,
      email,
      password,
      passwordConfirm,
      phone,
      address,
      imagePhoto,
    } = event.target;

    if (password.value !== passwordConfirm.value) {
      dispatch(
        setMessage({
          type: "error",
          message: "Vui lòng xác nhận đúng mật khẩu!",
        })
      );

      return;
    }

    const formData = new FormData();
    formData.append("name", name.value);
    formData.append("email", email.value);
    if (password.value) {
      formData.append("password", password.value);
    }
    if (passwordConfirm.value) {
      formData.append("passwordConfirm", passwordConfirm.value);
    }
    if (phone.value) {
      formData.append("phone", phone.value);
    }
    if (address.value) {
      formData.append("address", address.value);
    }

    if (selectedOption) {
      formData.append("role", selectedOption.value);
    }

    const imagePhotoFile = imagePhoto.files[0];
    if (imagePhotoFile && imagePhotoFile.name !== null) {
      formData.append("photo", imagePhotoFile);
    }

    const data = { formData: formData };

    if (user != null) {
      data.idUser = user._id;
    }

    action(data);
  }

  return (
    <Form
      className="mb-5"
      onSubmit={handleSubmitForm}
      encType="multipart/form-data"
    >
      <div className="form-item-container">
        <div className="mb-4">
          <div className="row row-gap-4">
            <div className="col-lg-4 col-md-6 col-12">
              <label htmlFor="name" className="form-label">
                Họ và tên (<span className="text-red">*</span>):
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-control"
                placeholder="Nhập họ và tên"
                defaultValue={user ? user.name : ""}
                disabled={user && user._id !== userInfo._id}
              />
            </div>
            <div className="col-lg-4 col-md-6 col-12">
              <label htmlFor="email" className="form-label">
                Email (<span className="text-red">*</span>):
              </label>
              <input
                type="text"
                id="email"
                name="email"
                className="form-control"
                placeholder="Nhập địa chỉ email"
                defaultValue={user ? user.email : ""}
                disabled={user && user._id !== userInfo._id}
              />
            </div>
            <div className="col-lg-4 col-md-6 col-12">
              <label htmlFor="role" className="form-label">
                Vai trò(<span className="text-red">*</span>):
              </label>
              <Select
                value={selectedOption}
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                options={options}
                placeholder="Chọn vai trò người dùng"
              />
            </div>
          </div>
        </div>
        <div className="mb-4">
          <div className="row row-gap-4">
            <div className="col-lg-4 col-md-4 col-12">
              <label htmlFor="email" className="form-label">
                Số điện thoại:
              </label>
              <input
                type="number"
                id="phone"
                name="phone"
                className="form-control"
                placeholder="Nhập số điện thoại"
                defaultValue={user ? user.phone : ""}
                disabled={user && user._id !== userInfo._id}
              />
            </div>
            <div className="col-lg-8 col-md-8 col-12">
              <label htmlFor="email" className="form-label">
                Địa chỉ:
              </label>
              <input
                type="text"
                id="address"
                name="address"
                className="form-control"
                placeholder="Nhập địa chỉ"
                defaultValue={user ? user.address : ""}
                disabled={user && user._id !== userInfo._id}
              />
            </div>
          </div>
        </div>
        {(!user || (user && user._id === userInfo._id)) && (
          <div className="mb-4">
            <div className="row row-gap-4">
              <div className="col-lg-6 col-md-6 col-12">
                <label htmlFor="password" className="form-label">
                  Mật khẩu
                  {user === null && (
                    <span>
                      (<span className="text-red">*</span>)
                    </span>
                  )}
                  :
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="form-control"
                  placeholder="Nhập mật khẩu"
                />
              </div>
              <div className="col-lg-6 col-md-6 col-12">
                <label htmlFor="password" className="form-label">
                  Xác nhận mật khẩu
                  {user === null && (
                    <span>
                      (<span className="text-red">*</span>)
                    </span>
                  )}
                  :
                </label>
                <input
                  type="password"
                  id="passwordConfirm"
                  name="passwordConfirm"
                  className="form-control"
                  placeholder="Nhập xác nhận mật khẩu"
                />
              </div>
            </div>
          </div>
        )}

        <div className="mb-4">
          <label className="form-label">Ảnh đại diện:</label>
          <div className="form-img-upload_tip">
            {"Có thể tải lên các file ảnh (định dạng jpg, png, jpeg, webp)"}
          </div>
          <div className="form-img-upload__imgs">
            <div
              className="form-img-upload__add form-img-upload__img"
              onClick={handleImagePhotoClick}
            >
              <i className="ri-image-add-line"></i>
              <input
                type="file"
                name="imagePhoto"
                className="user-input__photo"
                ref={inputPhotoRef}
                accept="image/jpg, image/png, image/jpeg, image/webp"
                onChange={handleChangeImageCover}
              />
            </div>
            {selectedPhoto && (
              <div className="form-img-upload__img">
                <img
                  src={selectedPhoto}
                  alt="image upload"
                  className="upload-img"
                />
                <div
                  className="upload-status"
                  onClick={() => handleRemoveImageCover()}
                >
                  <i className="ri-close-line"></i>
                </div>
              </div>
            )}
          </div>
        </div>
        {user != null && (
          <div className="mb-4">
            <label className="form-label text-default">
              Đại diện hiện tại:
            </label>
            <div className="form-img-upload__img">
              <img
                src={`http://localhost:8080/img/user/${user.photo}`}
                alt="image upload"
                className="upload-img"
              />
            </div>
          </div>
        )}
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
            {isLoading ? <Spin text={"Loading..."} /> : "Xác nhận"}
          </button>
        </div>
      </div>
    </Form>
  );
}

export default UserForm;

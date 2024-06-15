import { Suspense, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Await, Form, useLoaderData, useNavigate } from "react-router-dom";

import { setMessage } from "../../../store/message-slice";
import headingBorderImg from "../../../assets/img/heading-border.webp";
import { updateUserInfo } from "../../../utils/Client/https";
import Spin from "../../../components/common/Spin";
import { setCredentials } from "../../../store/auth-slice";

function UserUpdateInfor() {
  const { user } = useLoaderData();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState();
  const inputAvaRef = useRef();
  const [isLoading, setIsLoading] = useState(false);

  function handleImageClick() {
    inputAvaRef.current.click();
  }

  function handleImageChange(event) {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setAvatar(file);
    } else {
      event.target.value = null;
      dispatch(
        setMessage({ type: "error", message: "Vui lòng chọn đúng file ảnh!" })
      );
    }
  }

  async function handleUpdateInfo(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());
    const { name, email, photo, phone, address } = data;

    const requestData = { name, email };
    if (phone) {
      requestData.phone = phone;
    }
    if (address) {
      requestData.address = address;
    }
    if (photo.name !== null) {
      requestData.photo = photo;
    }
    setIsLoading(true);
    try {
      const resData = await updateUserInfo(requestData);
      dispatch(setMessage({ type: resData.status, message: resData.message }));
      if (resData.status === "success") {
        dispatch(setCredentials(resData));
        navigate("/user/detail");
      }
    } catch (error) {
      dispatch(setMessage({ type: "error", message: error.message }));
    }
    setIsLoading(false);
  }

  return (
    <div className="tour-content">
      <Suspense
        fallback={<p style={{ textAlign: "center" }}>Loading User...</p>}
      >
        <Await resolve={user}>
          {(loadedUser) => (
            <div className="user-detail-content">
              <h5 className="user-detail__title">Cập nhật thông tin</h5>
              <div className="mb-3">
                <img src={headingBorderImg} alt="Heading Border Image" />
              </div>
              <Form onSubmit={handleUpdateInfo}>
                <div className="mb-4 d-flex flex-column justify-content-center align-items-center">
                  {!avatar ? (
                    <img
                      src={`http://localhost:8080/img/user/${loadedUser.photo}`}
                      alt={loadedUser.name}
                      className="user-detail__img"
                      onClick={handleImageClick}
                    />
                  ) : (
                    <img
                      src={URL.createObjectURL(avatar)}
                      alt={loadedUser.name}
                      className="user-detail__img"
                      onClick={handleImageClick}
                    />
                  )}
                  <input
                    type="file"
                    name="photo"
                    id="photo"
                    ref={inputAvaRef}
                    onChange={handleImageChange}
                    className="user-input__photo"
                  />
                  <button
                    type="button"
                    onClick={handleImageClick}
                    className="mt-3 button"
                  >
                    Đổi ảnh đại diện
                  </button>
                </div>
                <div className="input-field mb-4">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    defaultValue={loadedUser.name}
                    required
                  />
                  <label htmlFor="name">Họ tên</label>
                </div>
                <div className="input-field mb-4">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    defaultValue={loadedUser.email}
                    required
                  />
                  <label htmlFor="email">Email</label>
                </div>
                <div className="input-field mb-4">
                  <input
                    type="number"
                    id="phone"
                    name="phone"
                    defaultValue={loadedUser.phone}
                  />
                  <label htmlFor="phone">Số điện thoại</label>
                </div>
                <div className="input-field mb-4">
                  <input
                    type="text"
                    id="address"
                    name="address"
                    defaultValue={loadedUser.address}
                  />
                  <label htmlFor="address">Địa chỉ</label>
                </div>
                <div className="input-field mt-2 mb-3">
                  <button
                    type="submit"
                    className="button btn-submit"
                    disabled={isLoading}
                  >
                    {isLoading ? <Spin text="Cập nhật..." /> : "Cập nhật"}
                  </button>
                </div>
              </Form>
            </div>
          )}
        </Await>
      </Suspense>
    </div>
  );
}

export default UserUpdateInfor;

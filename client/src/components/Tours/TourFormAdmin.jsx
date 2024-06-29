import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "react-router-dom";
import Select from "react-select";
import { NumericFormat as NumberFormat } from "react-number-format";

import TourLocationFormAdmin from "./TourLocationFormAdmin";
import { convertToSelectOptions } from "../../helper/setValueOption";
import { setMessage } from "../../store/message-slice";
import Spin from "../../components/common/Spin";
import { LazyLoadImage } from "react-lazy-load-image-component";
import RichText from "../RichText/RichText";
import ShowModal from "../common/ShowModal";
import MapBoxPoint from "../MapBox/MapBoxPoint";

function TourFormAdmin({ countries, guides, action, isLoading, tour = null }) {
  const dispatch = useDispatch();
  const locationPoint = useSelector((state) => state.location);
  const inputPhotoRef = useRef();
  const inputImageCoverRef = useRef();
  const [selectedImg, setSelectedImg] = useState();
  const [selectedImages, setSelectedImages] = useState([]);
  const [locations, setLocations] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedOptionCountry, setSelectedOptionCountry] = useState(null);
  const [price, setPrice] = useState(tour?.price || "");
  const [priceDiscount, setPriceDiscount] = useState(tour?.priceDiscount || "");
  const [description, setDescription] = useState(tour?.description || "");
  const [modalIsOpen, setIsOpen] = useState(false);
  const [openPoint, setOpenPoint] = useState("");
  const refs = useRef({
    startLong: null,
    startLat: null,
    startAddress: null,
  });

  function openModal(openPoint) {
    setOpenPoint(openPoint);
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    if (openPoint === "START_LOCATION" && locationPoint) {
      const { startLong, startLat, startAddress } = refs.current;
      if (startLong) startLong.value = locationPoint.lng || "";
      if (startLat) startLat.value = locationPoint.lat || "";
      if (startAddress) startAddress.value = locationPoint.name || "";
    }
  }, [locationPoint, openPoint]);

  function handlePriceChange(values) {
    const { value } = values;
    setPrice(value);
  }

  function handlePriceDiscountChange(values) {
    const { value } = values;
    setPriceDiscount(value);
  }

  useEffect(() => {
    if (tour != null) {
      const formattedLocations = tour.locations.map((location) => ({
        locationLat: location.coordinates[0].toString(),
        locationLong: location.coordinates[1].toString(),
        locationDay: location.day.toString(),
        locationDescription: location.description,
      }));

      const covertedOptionGuides = convertToSelectOptions(
        tour.guides,
        "_id",
        "name"
      );

      setLocations(formattedLocations);
      setSelectedOptionCountry({
        value: tour.country._id,
        label: tour.country.name,
      });
      setSelectedOption(covertedOptionGuides);
    }
  }, [tour]);

  const options = convertToSelectOptions(guides, "_id", "name");
  const optionsCountry = convertToSelectOptions(countries, "_id", "name");

  function handleImageCoverClick() {
    inputImageCoverRef.current.click();
  }

  function handleImageClick() {
    inputPhotoRef.current.click();
  }

  function handleChangeImageCover(event) {
    const selectedFile = event.target.files[0];
    const urlImageCover = URL.createObjectURL(selectedFile);
    setSelectedImg(urlImageCover);
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

  function handleRemoveImageCover() {
    setSelectedImg(null);
    inputImageCoverRef.current.value = "";
  }

  function handleRemoveImage(image) {
    const updatedImages = selectedImages.filter((e) => e !== image);
    setSelectedImages(updatedImages);

    if (updatedImages.length === 0 && inputPhotoRef.current) {
      inputPhotoRef.current.value = null;
    }
  }

  function handleResetImg() {
    setSelectedImg();
    setSelectedImages([]);
  }

  function handleAddLocation(newLocation) {
    setLocations([...locations, newLocation]);
  }

  function handleLocationDelete(index) {
    const updatedLocations = [...locations];
    updatedLocations.splice(index, 1);
    setLocations(updatedLocations);
  }

  function isValidLongitude(longitude) {
    // Kiểm tra xem kinh độ có nằm trong khoảng [-180, 180] không
    return !isNaN(parseFloat(longitude)) && Math.abs(longitude) <= 180;
  }

  function isValidLatitude(latitude) {
    // Kiểm tra xem vĩ độ có nằm trong khoảng [-90, 90] không
    return !isNaN(parseFloat(latitude)) && Math.abs(latitude) <= 90;
  }

  function handleSumbitForm(event) {
    event.preventDefault();
    const {
      startLat,
      startLong,
      startAddress,
      startDescription,
      title,
      duration,
      maxGroupSize,
    } = event.target;

    if (!selectedImg && tour === null) {
      dispatch(
        setMessage({
          type: "error",
          message: "Vui lòng chọn ảnh bìa cho tour!",
        })
      );
      return;
    }

    if (
      !isValidLatitude(startLat.value) ||
      !isValidLongitude(startLong.value)
    ) {
      dispatch(
        setMessage({
          type: "error",
          message: "Vĩ độ hoặc kinh độ của điểm bắt đầu không hợp lệ!",
        })
      );
      return;
    }

    const startLocation = {
      coordinates: [startLat.value * 1, startLong.value * 1],
      address: startAddress.value,
      description: startDescription.value,
    };

    const formData = new FormData();
    formData.append("title", title.value);
    formData.append("price", price);
    formData.append("duration", duration.value);
    formData.append("maxGroupSize", maxGroupSize.value);
    formData.append("description", description);
    formData.append("country", selectedOptionCountry.value);
    formData.append("startLocation", JSON.stringify(startLocation));

    //Thêm priceDiscount vào formData
    if (priceDiscount && (priceDiscount >= price || priceDiscount <= 0)) {
      dispatch(
        setMessage({ type: "error", message: "Giảm giá không hợp lệ!" })
      );
      return;
    }

    if (priceDiscount) {
      formData.append("priceDiscount", priceDiscount);
    }

    // Thêm imageCover vào formData
    const imageCover = event.target.imageCover.files[0];
    if (imageCover && imageCover.name !== null) {
      formData.append("imageCover", imageCover);
    }

    // Thêm các images vào formData
    if (selectedImages.length > 0) {
      selectedImages.forEach((image) => {
        formData.append("images", image.file);
      });
    }

    // Thêm guides vào formData
    if (selectedOption) {
      selectedOption.map((guide) => {
        formData.append("guides", guide.value);
      });
    }

    // Thêm các địa điểm từ locations vào formData
    if (locations && locations.length > 0) {
      const locationsArray = locations.map((location) => ({
        coordinates: [location.locationLat * 1, location.locationLong * 1],
        day: location.locationDay * 1,
        description: location.locationDescription,
      }));
      formData.append("locations", JSON.stringify(locationsArray));
    }

    const data = { formData: formData };

    if (tour !== null) {
      data.idTour = tour._id;
    }

    action(data);
  }

  return (
    <>
      <Form onSubmit={handleSumbitForm} className="mb-5">
        <div className="form-item-container">
          <div className="mb-4">
            <label htmlFor="title" className="form-label">
              Tên tour (<span className="text-red">*</span>):
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="form-control"
              placeholder="Tên tour du lịch"
              defaultValue={tour != null ? tour.title : ""}
              required
            />
          </div>
          <div className="row row-gap-4 mb-4">
            <div className="col-lg-3 col-md-4 col-12">
              <label htmlFor="price" className="form-label">
                Giá (<span className="text-red">*</span>):
              </label>
              <NumberFormat
                id="price"
                name="price"
                className="form-control"
                placeholder="Giá tour du lịch"
                value={price}
                onValueChange={handlePriceChange}
                thousandSeparator={"."}
                decimalSeparator={","}
                suffix={" ₫"}
                prefix={""}
                required
              />
            </div>
            <div className="col-lg-3 col-md-4 col-12">
              <label htmlFor="priceDiscount" className="form-label">
                Giám giá:
              </label>
              <NumberFormat
                id="priceDiscount"
                name="priceDiscount"
                className="form-control"
                placeholder="Giảm giá tour du lịch"
                value={priceDiscount}
                onValueChange={handlePriceDiscountChange}
                thousandSeparator={"."}
                decimalSeparator={","}
                suffix={" ₫"}
                prefix={""}
              />
            </div>
            <div className="col-lg-3 col-md-4 col-12">
              <label htmlFor="duration" className="form-label">
                Thời lượng (<span className="text-red">*</span>):
              </label>
              <input
                type="number"
                id="duration"
                name="duration"
                className="form-control"
                placeholder="Thời lượng tour du lịch"
                min={1}
                defaultValue={tour != null ? tour.duration : ""}
                required
              />
            </div>
            <div className="col-lg-3 col-md-4 col-12">
              <label htmlFor="maxGroupSize" className="form-label">
                Số lượng (<span className="text-red">*</span>):
              </label>
              <input
                type="number"
                id="maxGroupSize"
                name="maxGroupSize"
                className="form-control"
                placeholder="Số lượng khách"
                min={1}
                defaultValue={tour != null ? tour.maxGroupSize : ""}
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="form-label">
              Ảnh bìa (<span className="text-red">*</span>):
            </label>
            <div className="form-img-upload_tip">
              {"Có thể tải lên các file ảnh (định dạng jpg, png, jpeg, webp)"}
            </div>
            <div className="form-img-upload__imgs">
              <div
                className="form-img-upload__add form-img-upload__img"
                onClick={handleImageCoverClick}
              >
                <i className="ri-image-add-line"></i>
                <input
                  type="file"
                  name="imageCover"
                  className="user-input__photo"
                  ref={inputImageCoverRef}
                  accept="image/jpg, image/png, image/jpeg, image/webp"
                  onChange={handleChangeImageCover}
                />
              </div>
              {selectedImg && (
                <div className="form-img-upload__img">
                  <img
                    src={selectedImg}
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
          {tour != null && (
            <div className="mb-4">
              <label className="form-label text-default">
                Ảnh bìa hiện tại:
              </label>
              <div className="form-img-upload__img">
                <LazyLoadImage
                  effect="blur"
                  src={`${tour.imageCover}`}
                  alt="image upload"
                  className="upload-img"
                />
              </div>
            </div>
          )}
          <div className="mb-4">
            <label className="form-label">Ảnh thumbnail:</label>
            <div className="form-img-upload_tip">
              {"Có thể tải lên các file ảnh (định dạng jpg, png, jpeg, webp)"}
            </div>
            <div className="form-img-upload__imgs">
              <div
                className="form-img-upload__add form-img-upload__img"
                onClick={handleImageClick}
              >
                <i className="ri-image-add-line"></i>
                <input
                  type="file"
                  name="images"
                  className="user-input__photo"
                  ref={inputPhotoRef}
                  multiple
                  accept="image/jpg, image/png, image/jpeg, image/webp"
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
          {tour != null && (
            <div className="mb-4">
              <label className="form-label text-default">
                Ảnh thumbnail hiện tại:
              </label>
              {tour.images.length > 0 ? (
                <div className="form-img-upload__imgs">
                  {tour.images.map((image, index) => (
                    <div key={index} className="form-img-upload__img">
                      <LazyLoadImage
                        effect="blur"
                        src={`${image}`}
                        alt="image upload"
                        className="upload-img"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-default sm">
                  ~Chưa có ảnh nào!!!~
                </p>
              )}
            </div>
          )}
          <div className="mb-4">
            <label htmlFor="description" className="form-label">
              Lịch trình (<span className="text-red">*</span>):
            </label>
            <RichText
              content={description}
              setContent={setDescription}
              placeholder="Mô tả lịch trình..."
            />
          </div>
          <div className="row row-gap-4 mb-5">
            <div className="col-lg-6 col-md-6 col-12">
              <label htmlFor="country" className="form-label">
                Quốc gia (<span className="text-red">*</span>):
              </label>
              <Select
                value={selectedOptionCountry}
                defaultValue={selectedOptionCountry}
                onChange={setSelectedOptionCountry}
                options={optionsCountry}
                placeholder="Chọn hướng quốc gia"
                required
              />
            </div>
            <div className="col-lg-6 col-md-6 col-12">
              <label htmlFor="guide" className="form-label">
                Hướng dẫn viên:
              </label>
              <Select
                value={selectedOption}
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                options={options}
                placeholder="Chọn hướng dẫn viên"
                isMulti
              />
            </div>
          </div>
          <div className="form-item__wrapper mb-5">
            <div className="form-item__label">
              Vị trí bắt đầu (<span className="text-red">*</span>):
            </div>
            <div className="row row-gap-4">
              <div className="col-lg-2 col-md-6 col-12">
                <label htmlFor="startLong" className="form-label">
                  Kinh độ (<span className="text-red">*</span>):
                </label>
                <input
                  type="text"
                  id="startLong"
                  name="startLong"
                  className="form-control"
                  placeholder="Kinh độ"
                  defaultValue={
                    tour != null && tour.startLocation.coordinates != null
                      ? tour.startLocation.coordinates[1]
                      : ""
                  }
                  ref={(el) => (refs.current.startLong = el)}
                  required
                />
              </div>
              <div className="col-lg-2 col-md-6 col-12">
                <label htmlFor="startLat" className="form-label">
                  Vĩ độ (<span className="text-red">*</span>):
                </label>
                <input
                  type="text"
                  id="startLat"
                  name="startLat"
                  className="form-control"
                  placeholder="Vĩ độ"
                  defaultValue={
                    tour != null && tour.startLocation.coordinates != null
                      ? tour.startLocation.coordinates[0]
                      : ""
                  }
                  ref={(el) => (refs.current.startLat = el)}
                  required
                />
              </div>
              <div className="col-lg-4 col-md-6 col-12">
                <label htmlFor="startAddress" className="form-label">
                  Địa điểm (<span className="text-red">*</span>):
                </label>
                <input
                  type="text"
                  id="startAddress"
                  name="startAddress"
                  className="form-control"
                  placeholder="Địa điểm bắt đầu"
                  defaultValue={
                    tour != null && tour.startLocation.address != null
                      ? tour.startLocation.address
                      : ""
                  }
                  ref={(el) => (refs.current.startAddress = el)}
                  required
                />
              </div>
              <div className="col-lg-4 col-md-6 col-12">
                <div className="mb-4">
                  <label htmlFor="startDescription" className="form-label">
                    Mô tả (<span className="text-red">*</span>):
                  </label>
                  <input
                    type="text"
                    id="startDescription"
                    name="startDescription"
                    className="form-control"
                    placeholder="Mô tả điểm bắt đầu"
                    defaultValue={
                      tour != null && tour.startLocation.description != null
                        ? tour.startLocation.description
                        : ""
                    }
                    required
                  />
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-end">
              <div
                className="button btn-submit action-btn__detail"
                onClick={() => openModal("START_LOCATION")}
              >
                Mở bản đồ
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6 col-md-12 col-12">
              <TourLocationFormAdmin
                onSubmit={handleAddLocation}
                onMapBoxPoint={openModal}
                openPoint={openPoint}
              />
            </div>
            <div className="col-lg-6 col-md-12 col-12">
              <div className="form-item__wrapper">
                <div className="form-item__label">Danh sách điểm du lịch:</div>
                <div className="location-list">
                  {locations.map((location, index) => (
                    <div key={index} className="location-item">
                      <div className="location-item__info">
                        <p>
                          {`Ngày ${location.locationDay}: ${location.locationDescription}`}
                        </p>
                        <span>
                          {`Vị trị [${location.locationLat}:${location.locationLong}]`}
                        </span>
                      </div>
                      <div
                        className="button-form__icon"
                        onClick={() => handleLocationDelete(index)}
                      >
                        <i className="ri-close-line"></i>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="my-5 w-100 d-flex justify-content-center align-items-center flex-wrap gap-3">
            <button
              type="reset"
              className="button btn-submit btn-red"
              onClick={handleResetImg}
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
      {/* =========================Map box point (start)========================== */}
      <ShowModal isOpen={modalIsOpen} onClose={closeModal}>
        <div className="p-3 modal-container">
          <div className="modal-close">
            <i className="ri-close-circle-fill" onClick={closeModal}></i>
          </div>
          <div className="modal-content map-content">
            <h4 className="heading-secondary mb-4">Bản đồ</h4>
            <MapBoxPoint />
          </div>
        </div>
      </ShowModal>
      {/* =======================Map box point (end)================================ */}
    </>
  );
}

export default TourFormAdmin;

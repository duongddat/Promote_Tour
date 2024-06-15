import { Await, Link, useLoaderData } from "react-router-dom";
import Select from "react-select";
import { Suspense, useEffect, useState } from "react";

import headingBorderImg from "../../../assets/img/heading-border.webp";
import { convertToSelectOptions } from "../../../helper/setValueOption";
import { currencyFormatter } from "../../../helper/formattingPrice";

function DetailTourPage() {
  const { tour } = useLoaderData();
  const [locations, setLocations] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedOptionCountry, setSelectedOptionCountry] = useState(null);

  useEffect(() => {
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
  }, [tour]);

  return (
    <section>
      <div className="tour-content">
        <div className="d-flex justify-content-between align-items-center flex-wrap mt-3">
          <h5 className="table-title">Chi tiết tour</h5>
          <Link to="/admin/tours" className="button d-flex gap-1 fw-bold">
            <i className="ri-file-list-3-line"></i>
            <span>Danh sách tour</span>
          </Link>
        </div>
        <div className="mb-2">
          <img src={headingBorderImg} alt="Heading Border Image" />
        </div>
        <div className="my-3">
          <Suspense
            fallback={<p style={{ textAlign: "center" }}>Loading Tour...</p>}
          >
            <Await resolve={tour}>
              {(tour) => (
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
                      defaultValue={tour.title}
                      disabled
                    />
                  </div>
                  <div className="row row-gap-4 mb-4">
                    <div className="col-lg-3 col-md-4 col-12">
                      <label htmlFor="price" className="form-label">
                        Giá (<span className="text-red">*</span>):
                      </label>
                      <input
                        type="text"
                        id="price"
                        name="price"
                        className="form-control"
                        defaultValue={currencyFormatter.format(tour.price)}
                        disabled
                      />
                    </div>
                    <div className="col-lg-3 col-md-4 col-12">
                      <label htmlFor="price" className="form-label">
                        Giá (<span className="text-red">*</span>):
                      </label>
                      <input
                        type="text"
                        id="price"
                        name="price"
                        className="form-control"
                        defaultValue={
                          tour != null && tour.priceDiscount
                            ? currencyFormatter.format(tour.priceDiscount)
                            : ""
                        }
                        disabled
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
                        defaultValue={tour.duration}
                        disabled
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
                        defaultValue={tour.maxGroupSize}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="form-label">
                      Ảnh bìa (<span className="text-red">*</span>):
                    </label>
                    <div className="form-img-upload__imgs">
                      <div className="form-img-upload__img">
                        <img
                          src={`http://localhost:8080/img/tour/${tour.imageCover}`}
                          alt="image upload"
                          className="upload-img"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="form-label">Ảnh thumbnail:</label>
                    <div className="form-img-upload_tip">
                      {
                        "Có thể tải lên các file ảnh (định dạng jpg, png, jpeg, webp)"
                      }
                    </div>
                    {tour.images.length > 0 ? (
                      <div className="form-img-upload__imgs">
                        {tour.images.map((image, index) => (
                          <div key={index} className="form-img-upload__img">
                            <img
                              src={`http://localhost:8080/img/tour/${image}`}
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
                  <div className="mb-4">
                    <label htmlFor="description" className="form-label">
                      Mô tả (<span className="text-red">*</span>):
                    </label>
                    <textarea
                      rows={6}
                      id="description"
                      name="description"
                      className="form-control"
                      placeholder="Mô tả du lịch"
                      defaultValue={tour.description}
                      disabled
                    />
                  </div>
                  <div className="row row-gap-4 mb-5">
                    <div className="col-lg-6 col-md-6 col-12">
                      <label htmlFor="country" className="form-label">
                        Quốc gia (<span className="text-red">*</span>):
                      </label>
                      <Select
                        value={selectedOptionCountry}
                        placeholder="Chọn hướng quốc gia"
                        isDisabled
                      />
                    </div>
                    <div className="col-lg-6 col-md-6 col-12">
                      <label htmlFor="guide" className="form-label">
                        Hướng dẫn viên:
                      </label>
                      <Select
                        value={selectedOption}
                        placeholder="Chọn hướng dẫn viên"
                        isMulti
                        isDisabled
                      />
                    </div>
                  </div>
                  <div className="row row-gap-4 mb-4">
                    <div className="col-lg-6 col-md-6 col-12">
                      <div className="form-item__wrapper">
                        <div className="form-item__label">
                          Vị trí bắt đầu (<span className="text-red">*</span>):
                        </div>
                        <div className="row row-gap-4">
                          <div className="col-lg-4 col-md-6 col-12">
                            <label htmlFor="startLong" className="form-label">
                              Kinh độ (<span className="text-red">*</span>):
                            </label>
                            <input
                              type="text"
                              id="startLong"
                              name="startLong"
                              className="form-control"
                              defaultValue={tour.startLocation.coordinates[1]}
                              disabled
                            />
                          </div>
                          <div className="col-lg-4 col-md-6 col-12">
                            <label htmlFor="startLat" className="form-label">
                              Vĩ độ (<span className="text-red">*</span>):
                            </label>
                            <input
                              type="text"
                              id="startLat"
                              name="startLat"
                              className="form-control"
                              defaultValue={tour.startLocation.coordinates[0]}
                              disabled
                            />
                          </div>
                          <div className="col-lg-4 col-md-6 col-12">
                            <label
                              htmlFor="startAddress"
                              className="form-label"
                            >
                              Địa điểm (<span className="text-red">*</span>):
                            </label>
                            <input
                              type="text"
                              id="startAddress"
                              name="startAddress"
                              className="form-control"
                              defaultValue={tour.startLocation.address}
                              disabled
                            />
                          </div>
                          <div className="col-lg-12 col-md-12 col-12">
                            <div className="mb-4">
                              <label
                                htmlFor="startDescription"
                                className="form-label"
                              >
                                Mô tả (<span className="text-red">*</span>):
                              </label>
                              <input
                                type="text"
                                id="startDescription"
                                name="startDescription"
                                className="form-control"
                                defaultValue={tour.startLocation.description}
                                disabled
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-12">
                      <div className="form-item__wrapper">
                        <div className="form-item__label">
                          Danh sách điểm du lịch:
                        </div>
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
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </Await>
          </Suspense>
          <p className="text-center my-5 text-footer-font">That all</p>
        </div>
      </div>
    </section>
  );
}

export default DetailTourPage;

import { Await, Link, useLoaderData } from "react-router-dom";
import { Suspense, useEffect } from "react";

import TourDetail from "../../../components/TourDetail/TourDetail";

function DetailTourPage() {
  const { tour } = useLoaderData();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section>
      <div className="container">
        <div className="row row-gap-3">
          <div className="col-xl-9 col-lg-8 col-md-12 col-12">
            <Suspense
              fallback={<p style={{ textAlign: "center" }}>Loading Tour...</p>}
            >
              <Await resolve={tour}>
                {(loadedTour) => <TourDetail tour={loadedTour} />}
              </Await>
            </Suspense>
          </div>
          <div className="col-xl-3 col-lg-4 col-md-12 col-12">
            <div className="sticky">
              <div className="tour-content px-3 mb-3">
                <div className="text-center py-2 px-1 mb-2">
                  <h5 className="md fs-5 fw-bold mb-3">HoYoViVu</h5>
                  <p className="sm mb-2">
                    Hãy tham cùng chúng tôi! <br /> Cùng nhau chia sẽ những kỷ
                    niệm
                  </p>
                </div>
                <div className="blog-tool__list">
                  <Link
                    to={`/booking/${tour.slug}`}
                    className="blog-tool__item"
                  >
                    <i className="ri-add-circle-fill"></i>
                    <span className="sm fs-6">Đặt tour du lịch</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DetailTourPage;

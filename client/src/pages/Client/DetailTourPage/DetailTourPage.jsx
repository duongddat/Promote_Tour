import { Await, useLoaderData } from "react-router-dom";
import { Suspense, useEffect } from "react";

import TourDetail from "../../../components/TourDetail/TourDetail";
import Booking from "../../../components/Booking/Booking";

function DetailTourPage() {
  const { tour } = useLoaderData();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section>
      <div className="container">
        <div className="row row-gap-3">
          <div className="col-xl-8 col-lg-7 col-md-12 col-12">
            <Suspense
              fallback={<p style={{ textAlign: "center" }}>Loading Tour...</p>}
            >
              <Await resolve={tour}>
                {(loadedTour) => <TourDetail tour={loadedTour} />}
              </Await>
            </Suspense>
          </div>
          <div className="col-xl-4 col-lg-5 col-md-12 col-12">
            <Booking tour={tour} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default DetailTourPage;

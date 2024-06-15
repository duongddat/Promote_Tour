import { Suspense, useState } from "react";
import { Await, useLoaderData } from "react-router-dom";
import RevenueBar from "../../../components/Revenue/RevenueBar";
import RevenueSelect from "../../../components/Revenue/RevenueSelect";
import { getMonthName } from "../../../helper/getMonthName";

function Revenue() {
  const { revenue, year } = useLoaderData();
  const [statistics, setStatistics] = useState({
    text: "Thống kê số lượng",
    char: "price",
  });

  function handleChangeStatistics() {
    setStatistics((prevState) => ({
      text:
        prevState.char === "price" ? "Thống kê doanh thu" : "Thống kê số lượng",
      char: prevState.char === "price" ? "count" : "price",
    }));
  }

  return (
    <section className="section-mediumn">
      <Suspense
        fallback={<p style={{ textAlign: "center" }}>Loading Revenue...</p>}
      >
        <Await resolve={year}>
          {(loadedYear) => {
            return <RevenueSelect statistics={loadedYear} />;
          }}
        </Await>
      </Suspense>
      <Suspense
        fallback={<p style={{ textAlign: "center" }}>Loading Revenue...</p>}
      >
        <Await resolve={revenue}>
          {(loadedRevenue) => {
            const labels = loadedRevenue.map((data) =>
              getMonthName(data.month)
            );
            const totalRevenue = loadedRevenue.map((data) => data.totalRevenue);
            const totalBookings = loadedRevenue.map(
              (data) => data.totalBookings
            );

            return (
              <div className="tour-content revenueCard mb-4">
                <button
                  className="btn-revenue button"
                  onClick={handleChangeStatistics}
                >
                  <i className="ri-bar-chart-2-fill"></i>
                  <span className="d-none d-sm-inline">{statistics.text}</span>
                </button>
                {statistics.char === "price" && (
                  <RevenueBar
                    label={labels}
                    data={totalRevenue}
                    backgroundColor={["rgba(43, 63, 229, 0.4)"]}
                    borderColor={["rgba(43, 63, 229, 1)"]}
                    borderWidth="2"
                    title="Doanh thu"
                    text="Thống kê doanh thu"
                    xTitle="Số tiền"
                    yTitle="Tháng"
                  />
                )}
                {statistics.char === "count" && (
                  <RevenueBar
                    label={labels}
                    data={totalBookings}
                    backgroundColor={["rgba(253, 135, 135, 0.4)"]}
                    borderColor={["rgba(253, 135, 135, 1)"]}
                    borderWidth="2"
                    title="Tour"
                    text="Thống kê số tour đã đặt"
                    xTitle="Số lượng"
                    yTitle="Tháng"
                  />
                )}
              </div>
            );
          }}
        </Await>
      </Suspense>
    </section>
  );
}

export default Revenue;

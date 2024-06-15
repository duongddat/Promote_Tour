import { Await, Link, useLoaderData } from "react-router-dom";
import { Suspense } from "react";

import headingBorderImg from "../../../assets/img/heading-border.webp";
import BookingCountdown from "../../../components/MyBooking/BookingCountDown";
import noDataMessage from "../../../assets/img/no-data-message.png";
import RevenueBar from "../../../components/Revenue/RevenueBar";
import TableData from "../../../components/Table/TableData";
import { formatDateDefault } from "../../../helper/formattingDate";
import { currencyFormatter } from "../../../helper/formattingPrice";
import { getMonthName } from "../../../helper/getMonthName";

function Schedule() {
  const { booking, chart } = useLoaderData();

  const columns = [
    {
      name: "Tên tour",
      selector: (row) => row.tourInfo[0].title,
      sortable: true,
    },
    {
      name: "Khách hàng",
      selector: (row) => row.userInfo[0].name,
      sortable: true,
    },
    {
      name: "Số lượng",
      selector: (row) => row.guestSize + " người",
      sortable: true,
    },
    {
      name: "Ngày khởi hành",
      selector: (row) => formatDateDefault(row.bookAt),
      sortable: true,
    },
    {
      name: "Trại thái",
      selector: (row) =>
        row.cancelled === undefined || row.cancelled === false ? (
          <BookingCountdown bookAt={row.bookAt} />
        ) : (
          <span className="text-booking booking-remaining">Yêu cầu huỷ</span>
        ),
    },
    {
      name: "Tổng tiền",
      selector: (row) => currencyFormatter.format(row.price),
      sortable: true,
      style: {
        color: "red",
        fontWeight: "bold",
      },
    },
    {
      name: "Công cụ",
      cell: (row) => (
        <div className="table-action">
          <Link
            to={`/admin/booking/${row._id}/detail`}
            className="action-btn action-btn__detail"
          >
            <i className="ri-eye-2-line"></i>
          </Link>
        </div>
      ),
    },
  ];

  return (
    <section className="section-mediumn">
      <div className="tour-content mb-3">
        <h5 className="table-title fw-bold fs-5">Lịch trình</h5>
        <div className="mb-2">
          <img src={headingBorderImg} alt="Heading Border Image" />
        </div>
        <Suspense
          fallback={<p style={{ textAlign: "center" }}>Loading Revenue...</p>}
        >
          <Await resolve={booking}>
            {(loadedBooking) => {
              return (
                <>
                  {loadedBooking.length > 0 && (
                    <div className="mb-5">
                      <TableData columns={columns} data={loadedBooking} />
                      <p className="mt-5 text-center text-footer-font">
                        That all
                      </p>
                    </div>
                  )}
                  {loadedBooking.length === 0 && (
                    <div className="mhy-data-lg">
                      <img src={noDataMessage} alt="No data message blog" />
                      <p className="mhy-data-lg_text">
                        Chưa có tour du lịch được đặt nào~
                      </p>
                    </div>
                  )}
                </>
              );
            }}
          </Await>
        </Suspense>
      </div>
      <div className="tour-content revenueCard mb-3">
        <Suspense
          fallback={<p style={{ textAlign: "center" }}>Loading Revenue...</p>}
        >
          <Await resolve={chart}>
            {(loadedRevenue) => {
              const labels = loadedRevenue.map((data) =>
                getMonthName(data._id)
              );
              const totalBookings = loadedRevenue.map(
                (data) => data.totalBookings
              );

              return (
                <RevenueBar
                  type="line"
                  label={labels}
                  data={totalBookings}
                  backgroundColor={["rgba(43, 63, 229, 0.4)"]}
                  borderColor={["rgba(43, 63, 229, 1)"]}
                  borderWidth="2"
                  title="Tour"
                  text="Thống kê lịch trình"
                  xTitle="Số lượng"
                  yTitle="Tháng"
                />
              );
            }}
          </Await>
        </Suspense>
      </div>
    </section>
  );
}

export default Schedule;

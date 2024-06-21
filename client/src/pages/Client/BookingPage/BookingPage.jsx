import { useLoaderData } from "react-router-dom";
import CheckOutStepper from "../../../components/Booking/CheckOutStepper";

const CHECKOUT_STEP = [
  "Nhập thông tin",
  "Áp mã giảm giá",
  "Phương thức thanh toán",
];

function BookingPage() {
  const { tour } = useLoaderData();

  return (
    <div className="section-bg p-auto">
      <div className="container container-medium">
        <CheckOutStepper stepsConfig={CHECKOUT_STEP} tour={tour} />
      </div>
    </div>
  );
}

export default BookingPage;

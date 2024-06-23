import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import moment from "moment";

import { currencyFormatter } from "../../helper/formattingPrice";
import { getSessionStorage } from "../../helper/getSessionStorage";
import { setSessionStorage } from "../../helper/setSessionStorage";
import { setMessage } from "../../store/message-slice";
import Spin from "../../components/common/Spin";
import InfoBooking from "../../components/Booking/InfoBooking";
import ApplyDiscount from "../../components/Booking/ApplyDiscount";
import PaymentMethod from "../../components/Booking/PaymentMethod";
import PaymentImg1 from "../../assets/img/payment-1.png";
import PaymentImg2 from "../../assets/img/payment-2.png";
import PaymentImg3 from "../../assets/img/payment-3.jpg";
import PaymentImg4 from "../../assets/img/payment-4.webp";
import PaymentImg5 from "../../assets/img/payment-5.png";

import "./CheckOutStepper.css";

const PAYMENT_METHOD = [
  {
    name: "Master card",
    method: "MASTER_CARD",
    img: PaymentImg1,
    active: true,
  },
  {
    name: "Ví Momo",
    method: "MOMO",
    img: PaymentImg2,
    active: false,
  },
  {
    name: "Zalo Pay",
    method: "ZALO_PAY",
    img: PaymentImg4,
    active: false,
  },
  {
    name: "VN PAY",
    method: "VN_PAY",
    img: PaymentImg3,
    active: false,
  },
  {
    name: "Mã QR",
    method: "QR_CODE",
    img: PaymentImg5,
    active: false,
  },
];

const defailtValueForm = {
  fullName: "",
  phone: "",
  email: "",
  date: "",
  guestSize: null,
};

function CheckOutStepper({ stepsConfig = [], tour = {} }) {
  const dispatch = useDispatch();
  const { userInfo, token } = useSelector((state) => state.auth);
  const [currentStep, setCurrentStep] = useState(
    getSessionStorage("paymentStep", 1)
  );
  const [isComplete, setIsComplete] = useState(false);
  const [amount, setAmount] = useState(
    getSessionStorage("paymentAmount", null)
  );
  const [code, setCode] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState(
    getSessionStorage("paymentDiscount", 0)
  );
  const [loading, setLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [discountedPrice, setDiscountedPrice] = useState(0);
  const [payment, setPayment] = useState(
    getSessionStorage("paymentMethod", PAYMENT_METHOD[0].method)
  );

  //Form Value
  const [formValues, setFormValues] = useState(
    getSessionStorage("paymentFormValue", defailtValueForm)
  );
  const fullNameRef = useRef(null);
  const phoneRef = useRef(null);
  const emailRef = useRef(null);
  const dateRef = useRef(null);
  const guestSizeRef = useRef(null);
  const stepRef = useRef();

  useEffect(() => {
    setSessionStorage("paymentStep", currentStep);
    setSessionStorage("paymentAmount", amount);
    setSessionStorage("paymentDiscount", discountPercentage);
    setSessionStorage("paymentMethod", payment);
    setSessionStorage("paymentFormValue", formValues);
  }, [currentStep, amount, discountPercentage, payment, formValues]);

  useEffect(() => {
    const price = (tour.priceDiscount || tour.price) * (amount || 1);
    setTotalPrice(price);
  }, [amount, tour]);

  useEffect(() => {
    const discountedPrice =
      totalPrice - (totalPrice * discountPercentage) / 100;
    setDiscountedPrice(discountedPrice);
  }, [totalPrice, discountPercentage]);

  function handleChangeAmount(event) {
    if (event.target.value < 0) {
      event.target.value = 1;
    }
    setAmount(event.target.value);
  }

  function onChangeCode(event) {
    const newCode = event.target.value;
    setCode(newCode);
  }

  async function handleApplyCode() {
    try {
      const countryId = tour.country._id;
      if (code !== null && countryId !== null) {
        const response = await fetch(
          "http://localhost:8080/discounts/check-discount",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ code, countryId }),
          }
        );
        const resData = await response.json();

        if (!response.ok) {
          setDiscountPercentage(0);
          setCode("");
          dispatch(setMessage({ type: "error", message: resData.message }));
          return;
        }

        const { data, message } = resData;
        setDiscountPercentage(data.percentage);
        dispatch(setMessage({ type: "success", message: message }));
      }
    } catch (error) {
      setDiscountPercentage(0);
      dispatch(setMessage({ type: "error", message: error.message }));
    }
  }

  function handleChangePayment(payment) {
    if (payment.active) {
      setPayment(payment.method);
    }
  }

  async function handleCreateBooking() {
    if (!userInfo || !token) {
      dispatch(
        setMessage({
          type: "error",
          message: "Vui lòng đăng nhập để đặt tour!",
        })
      );
      return;
    }

    if (userInfo.email !== formValues.email) {
      dispatch(
        setMessage({
          type: "error",
          message: "Vui lòng nhập đúng email của bạn!",
        })
      );
      return;
    }

    const formattedDate = moment(formValues.date, "YYYY-MM-DD").format(
      "DD/MM/YYYY"
    );

    //Call api create booking (MASTERCARD)
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:8080/booking/checkout-session/${tour._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            guestSize: formValues.guestSize,
            bookAt: formattedDate,
            discount: discountPercentage,
          }),
        }
      );

      const resData = await response.json();

      if (!response.ok) {
        dispatch(
          setMessage({ type: "error", message: "Vui lòng thử lại sau!" })
        );
      }

      if (resData.session) {
        window.location.href = resData.session;
      }
    } catch (error) {
      console.log(error);
      dispatch(setMessage({ type: "error", message: error.message }));
    }
    setLoading(false);

    sessionStorage.removeItem("paymentStep");
    sessionStorage.removeItem("paymentAmount");
    sessionStorage.removeItem("paymentDiscount");
    sessionStorage.removeItem("paymentMethod");
    sessionStorage.removeItem("paymentFormValue");
  }

  function handleCheckError() {
    const errors = {};

    if (!fullNameRef.current.value) {
      errors.fullName = "Họ tên là bắt buộc";
    }
    if (!phoneRef.current.value) {
      errors.phone = "Số điện thoại là bắt buộc";
    }
    if (!emailRef.current.value) {
      errors.email = "Email là bắt buộc";
    }
    if (!dateRef.current.value) {
      errors.date = "Ngày là bắt buộc";
    }
    if (!guestSizeRef.current.value || guestSizeRef.current.value < 1) {
      errors.guestSize = "Số lượng khách phải lớn hơn 0";
    }

    if (Object.keys(errors).length > 0) {
      const errorMessage = Object.values(errors).join("\n");
      dispatch(
        setMessage({
          type: "error",
          message: errorMessage,
        })
      );
      return true;
    }

    return false;
  }

  //Next step
  function handleNextStep() {
    if (currentStep === 1) {
      const validate = handleCheckError(); //Check input error
      if (validate) return;

      const selectedDate = new Date(dateRef.current.value);
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() + 2);
      if (selectedDate < currentDate) {
        dispatch(
          setMessage({
            type: "error",
            message:
              "Vui lòng chọn một ngày ít nhất là 2 ngày sau ngày hiện tại!",
          })
        );
        return;
      }

      setFormValues({
        fullName: fullNameRef.current.value,
        phone: phoneRef.current.value,
        email: emailRef.current.value,
        date: dateRef.current.value,
        guestSize: Number(guestSizeRef.current.value),
      });
    }

    setCurrentStep((prevStep) => {
      if (prevStep === stepsConfig.length) {
        setIsComplete(true);
      } else {
        return prevStep + 1;
      }
    });

    if (stepRef.current) {
      const topPosition = stepRef.current.offsetTop;
      window.scrollTo({ top: topPosition - 100, behavior: "smooth" });
    }
  }

  function handlePreStep() {
    setCurrentStep((prevStep) => {
      if (prevStep !== 0) {
        return prevStep - 1;
      }
    });

    if (stepRef.current) {
      const topPosition = stepRef.current.offsetTop;
      window.scrollTo({ top: topPosition - 100, behavior: "smooth" });
    }
  }

  return (
    <>
      <div className="stepper" ref={stepRef}>
        {stepsConfig.map((step, index) => (
          <div
            key={index}
            className={`step ${
              currentStep > index + 1 || isComplete ? "complete" : ""
            } ${currentStep === index + 1 ? "active" : ""}`}
          >
            <div className="step-number">
              {currentStep > index + 1 || isComplete ? (
                <span>
                  <i className="ri-check-line"></i>
                </span>
              ) : (
                index + 1
              )}
            </div>
            <div className="step-name">{step}</div>
          </div>
        ))}
      </div>
      <div className="d-flex flex-column gap-4">
        {/* =============== Content Booking (start) ==================== */}
        {currentStep === 1 && (
          <InfoBooking
            onChangeAmount={handleChangeAmount}
            formValues={formValues}
            refs={{
              fullNameRef,
              phoneRef,
              emailRef,
              dateRef,
              guestSizeRef,
            }}
          />
        )}
        {currentStep === 2 && (
          <ApplyDiscount
            code={code}
            onChangeCode={onChangeCode}
            onApplyCode={handleApplyCode}
          />
        )}
        {currentStep === 3 && (
          <PaymentMethod
            paymentConfig={PAYMENT_METHOD}
            paymentMethod={payment}
            onSetPayment={handleChangePayment}
          />
        )}

        <div className="tour-content booking__bottom py-4">
          <h5 className="mb-2">Thành tiền:</h5>
          <ul className="list-group">
            <li className="list-group-item border-0 px-0">
              <h5 className="d-flex align-items-center gap-1">
                {currencyFormatter.format(tour.price)} x {amount || 1} người
              </h5>
              <span>{currencyFormatter.format(totalPrice)}</span>
            </li>
            <li className="list-group-item border-0 px-0">
              <h5 className="d-flex align-items-center gap-1">
                Phần trăm giảm giá:
              </h5>
              <span>{discountPercentage} %</span>
            </li>
            <li className="list-group-item border-0 px-0 total">
              <h5>Tổng tiền:</h5>
              <span>{currencyFormatter.format(discountedPrice)}</span>
            </li>
          </ul>
        </div>
        {/* =============== Content Booking (end) ==================== */}
        <div className="d-flex align-items-center justify-content-center gap-3">
          {currentStep !== 1 && (
            <div className="button text-center" onClick={handlePreStep}>
              Quay lại
            </div>
          )}
          {currentStep !== stepsConfig.length && (
            <div className="button text-center" onClick={handleNextStep}>
              Tiếp tục
            </div>
          )}
          {currentStep === stepsConfig.length && (
            <div
              className="button text-center"
              disabled={loading}
              onClick={handleCreateBooking}
            >
              {loading ? <Spin text="Đang xử lý" /> : "Thanh toán"}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default CheckOutStepper;

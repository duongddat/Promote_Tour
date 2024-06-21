function PaymentMethod({ paymentConfig, paymentMethod, onSetPayment }) {
  return (
    <div className="tour-content py-4">
      <h5>Phương thức thanh toán:</h5>
      <div className="d-flex align-items-center flex-wrap row-gap-3 column-gap-3 my-4">
        {paymentConfig.map((payment, index) => (
          <div
            className={`payment-item ${!payment.active && "comming-soon"} ${
              paymentMethod === payment.method && "active-payment"
            }`}
            key={index}
            onClick={() => onSetPayment(payment)}
          >
            <div className="wrapper-payment">
              <img className="payment-item__img" src={payment.img} />
              <div className="comming-soon__modal">
                <span className="comming-soon__text">Truy cập sớm...</span>
              </div>
            </div>
            <h6>{payment.name}</h6>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PaymentMethod;

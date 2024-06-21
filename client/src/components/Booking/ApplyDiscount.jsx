function ApplyDiscount({ code, onChangeCode, onApplyCode }) {
  return (
    <div className="tour-content py-4">
      <div className="booking__form">
        <h5>Mã giảm:</h5>
        <div className="booking__info-form">
          <div className="mb-4 d-flex gap-5">
            <input
              type="text"
              placeholder="Nhập mã giảm giá"
              id="code"
              onChange={onChangeCode}
              value={code}
            />
            <div className="button pointer w-max-content" onClick={onApplyCode}>
              Áp mã
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApplyDiscount;

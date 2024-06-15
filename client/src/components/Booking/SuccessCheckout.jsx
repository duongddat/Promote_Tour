import { Link, useLoaderData } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setMessage } from "../../store/message-slice";
import "./SuccessCheckout.css";

function SuccessCheckout() {
  const loadSuccess = useLoaderData();
  const dispatch = useDispatch();

  useEffect(() => {
    async function successCheckOut() {
      try {
        const resData = await loadSuccess;
        dispatch(
          setMessage({ type: resData.status, message: resData.message })
        );
      } catch (error) {
        dispatch(setMessage({ type: "error", message: error.message }));
      }
    }

    successCheckOut();
  }, [dispatch, loadSuccess]);

  return (
    <section className="section-bg ">
      <div className="container">
        <div className="row">
          <div className="col-12 text-center">
            <div className="thank__you">
              <span>
                <i className="ri-checkbox-circle-line"></i>
              </span>
              <h1 className="mb-3 fw-semibold">Thank you</h1>
              <h3 className="mb-4">
                Tour của bạn đã được đặt. Chúc bạn có một trải nghiệm vui vẻ!
              </h3>

              <div className="footer-thank__you">
                <Link className="btn button text-white" to="/my-tour">
                  Xem tour đã đặt của bạn
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SuccessCheckout;

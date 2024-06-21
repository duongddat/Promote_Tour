import { useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AdminLayout from "../components/Layout/AdminLayout";
import { clearMessage } from "../store/message-slice";

function RootAdminPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const prevRouteRef = useRef();
  const { message, type } = useSelector((state) => state.message);

  useEffect(() => {
    const splitLocation = location.pathname.split("/");
    const currentRoute = splitLocation[2];

    if (prevRouteRef.current !== currentRoute) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }

    prevRouteRef.current = currentRoute;
  }, [location]);

  useEffect(() => {
    if (message !== "") {
      const option = {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        onClose: () => {
          dispatch(clearMessage());
        },
      };

      if (type === "success") {
        toast.success(
          <div style={{ whiteSpace: "pre-line" }}>{message}</div>,
          option
        );
      } else {
        toast.error(
          <div style={{ whiteSpace: "pre-line" }}>{message}</div>,
          option
        );
      }
    }
  }, [message, type, dispatch]);

  return (
    <>
      <AdminLayout>
        <ToastContainer />
        <Outlet />
      </AdminLayout>
    </>
  );
}

export default RootAdminPage;

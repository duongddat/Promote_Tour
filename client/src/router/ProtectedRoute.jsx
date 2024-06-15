import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { setMessage } from "../store/message-slice";
import { useEffect } from "react";

function ProtectedRoute({ children }) {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!userInfo || (userInfo.role !== "admin" && userInfo.role !== "guide")) {
      dispatch(
        setMessage({
          type: "error",
          message: "Vui đăng nhập tài khoản phù hợp để sử dụng chức năng!",
        })
      );
    }
  }, [userInfo, dispatch]);

  if (!userInfo || (userInfo.role !== "admin" && userInfo.role !== "guide")) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setMessage } from "../store/message-slice";

export function useAction(actionFn, navigateRoute = null, showToast = true) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  async function action(argument) {
    setIsLoading(true);
    try {
      const resData = await actionFn(argument);
      if (resData.status === 204) {
        showToast &&
          dispatch(
            setMessage({ type: "success", message: "Xoá dữ liệu thành công!" })
          );
      } else {
        showToast &&
          dispatch(
            setMessage({ type: resData.status, message: resData.message })
          );
      }

      if (
        (resData.status === "success" || resData.ok) &&
        navigateRoute !== null
      ) {
        navigate(navigateRoute);
      }
    } catch (error) {
      console.log(error);
      showToast &&
        dispatch(setMessage({ type: "error", message: error.message }));
    }

    setIsLoading(false);
  }

  return { isLoading, action };
}

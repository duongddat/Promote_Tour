import { RouterProvider } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onMessage } from "firebase/messaging";
import { Bounce, toast } from "react-toastify";

import router from "./router/router";
import { socket } from "./helper/socket";
import { setCredentials } from "./store/auth-slice";
import { useGetUserDetailsQuery } from "./store/auth-service";
import { setFcmToken } from "./store/notification-slice";
import { generateToken, messaging } from "./firebase";
import { fetchNumNotifications } from "./store/notification-action";
import Loading from "./shared/Loading";
import "react-lazy-load-image-component/src/effects/blur.css";
import "remixicon/fonts/remixicon.css";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const { isLoading, data } = useGetUserDetailsQuery("userDetails");
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);
  const { loading: notificationsLoading } = useSelector(
    (state) => state.notifications
  );

  useEffect(() => {
    if (data) {
      dispatch(setCredentials(data));
      setIsDataLoaded(true);
    } else if (!isLoading) {
      setIsDataLoaded(true);
    }
  }, [data, isLoading, dispatch]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      if (userInfo) {
        socket.emit("signOut", userInfo._id);
      }
    };

    const fetchTokenAndNotifications = async () => {
      if (userInfo) {
        socket.emit("onlineUser", userInfo._id);
        dispatch(fetchNumNotifications());

        const token = await generateToken();
        dispatch(setFcmToken(token));

        const unsubscribe = onMessage(messaging, (payload) => {
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
          };
          toast(payload.notification.body, option);
        });

        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
          window.removeEventListener("beforeunload", handleBeforeUnload);
          socket.emit("signOut", userInfo._id);
          unsubscribe();
        };
      }
    };

    fetchTokenAndNotifications();
  }, [userInfo, dispatch]);

  if (isLoading || !isDataLoaded || notificationsLoading) {
    return <Loading />;
  }

  return <RouterProvider router={router} />;
}

export default App;

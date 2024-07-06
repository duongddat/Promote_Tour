import { useEffect, useState } from "react";
import { onMessage } from "firebase/messaging";
import { useDispatch, useSelector } from "react-redux";

// import { socket } from "../helper/socket";
import { addNotification } from "../store/notification-slice";
import { messaging } from "../firebase";

function Test() {
  const dispatch = useDispatch();
  const { fcmToken, listNoti } = useSelector((state) => state.notifications);
  const { userInfo } = useSelector((state) => state.auth);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tokenClient, setTokenClient] = useState("");
  const [userId, setUserId] = useState(userInfo ? userInfo._id : "");

  const sendNotification = async () => {
    const response = await fetch("http://localhost:8080/notifications", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fcmToken: tokenClient, title, body }),
    });

    const data = await response.json();
    console.log(data);

    // socket.emit("listNot", userId);
  };

  useEffect(() => {
    const unsubscribe = onMessage(messaging, (payload) => {
      dispatch(
        addNotification({
          title: payload.notification.title,
          body: payload.notification.body,
        })
      );
    });

    // socket.on("getListNot", (data) => {
    //   console.log(data);
    // });

    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  return (
    <div className="container my-4">
      <h1>Firebase Notifications</h1>
      <p>Token: {fcmToken && fcmToken}</p>
      {listNoti.map((notification, index) => (
        <div key={index} className="notification">
          <strong>{notification.title}</strong>: {notification.body}
        </div>
      ))}

      <div className="mt-5">
        <h1>Send Notification</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendNotification();
          }}
        >
          <div>
            <label>UserId:</label>
            <input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
          </div>
          <div>
            <label>Token:</label>
            <input
              type="text"
              value={tokenClient}
              onChange={(e) => setTokenClient(e.target.value)}
            />
          </div>
          <div>
            <label>Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label>Body:</label>
            <input
              type="text"
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
          </div>
          <button type="submit">Send Notification</button>
        </form>
      </div>
    </div>
  );
}

export default Test;

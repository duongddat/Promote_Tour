import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

function Chat() {
  const location = useLocation();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!window.kommunicate) {
      (function (d, m) {
        var kommunicateSettings = {
          appId: "97b872ccb4d7a982dfeabb09b1fe487",
          popupWidget: true,
          automaticChatOpenOnNavigation: true,
          voiceNote: true,
          talkToHuman: true,
          primaryCTA: "TALK_TO_HUMAN",
          labels: {
            "input.message": "Nhập tin nhắn của bạn...",
            "conversations.title": "Cuộc trò chuyện",
            "start.new": "Bắt đầu cuộc trò chuyện mới",
          },
        };

        var s = document.createElement("script");
        s.type = "text/javascript";
        s.async = true;
        s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
        var h = document.getElementsByTagName("head")[0];
        h.appendChild(s);
        window.kommunicate = m;
        m._globals = kommunicateSettings;
      })(document, window.kommunicate || {});
    }
  }, []);

  useEffect(() => {
    const kommunicateWidget = document.getElementById(
      "kommunicate-widget-iframe"
    );
    if (location.pathname.includes("/admin")) {
      if (kommunicateWidget) {
        kommunicateWidget.style.display = "none";
      }
    } else {
      if (kommunicateWidget) {
        kommunicateWidget.style.display = "block";
      }
    }
  }, [location]);

  useEffect(() => {
    setTimeout(() => {
      if (window.kommunicate) {
        let info = {};
        if (userInfo) {
          info = {
            userId: userInfo._id,
            displayName: userInfo.name,
            email: userInfo.email,
            phoneNumber: userInfo.phone,
          };
        } else {
          info = {
            displayName: "Ẩn danh",
            email: "user@example.com",
            phoneNumber: "0123456789",
          };
        }
        window.Kommunicate.updateUser(info);
      }
    }, 3000);
  }, [userInfo]);

  return (
    <>
      {/* <df-messenger
      intent="WELCOME"
      chat-title="HoYoViVu Support"
      agent-id="c4a4be0c-3597-4642-a8e2-6194c92a7173"
      language-code="vi"
      chat-icon="https://th.bing.com/th/id/R.a40c80d261291c6118b73eaf5aa5da0c?rik=OektnQa2C97PCw&pid=ImgRaw&r=0"
    ></df-messenger> */}
    </>
  );
}

export default Chat;

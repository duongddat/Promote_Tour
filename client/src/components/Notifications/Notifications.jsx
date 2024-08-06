import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useEffect, useState } from "react";

import { socket } from "../../helper/socket";
import cleanBoxImg from "../../assets/img/clean_tool.png";
import noDataDialog from "../../assets/img/no_reply.png";
import { useAction } from "../../hooks/useAction";
import {
  cleanNotifications,
  deleteNotification,
} from "../../utils/Client/https";
import { defaultNoti } from "../../store/notification-slice";
import { titleNotification } from "../../helper/titleNotification";
import { formantDateNoti } from "../../helper/formattingDate";
import { setMessage } from "../../store/message-slice";
import Spin from "../common/Spin";
import "./Notifications.css";

function Notifications({ notifications, limit }) {
  const dispatch = useDispatch();
  const { token, userInfo } = useSelector((state) => state.auth);
  const [listNoti, setListNoti] = useState(notifications);
  const [size, setSize] = useState(limit);
  const [limitNoti, setLimitNoti] = useState(6);
  const [isLoading, setIsLoading] = useState(false);
  const { action: actionClearNoti } = useAction(cleanNotifications);
  const { action: actionDeleteNoti } = useAction(deleteNotification);

  useEffect(() => {
    socket.on("get_list_notification", (updatedNoti) => {
      if (updatedNoti) {
        setListNoti(updatedNoti);
      }
    });

    return () => {
      socket.off("get_list_notification", (updatedNoti) => {
        if (updatedNoti) {
          setListNoti(updatedNoti);
        }
      });
    };
  }, []);

  async function handleCleanNotification() {
    await actionClearNoti();

    dispatch(defaultNoti());
  }

  async function loadNotification() {
    setIsLoading(true);
    try {
      if (size > limitNoti) {
        setLimitNoti((prevLimitNoti) => prevLimitNoti + 6);
        const response = await fetch(
          `http://localhost:8080/notifications?limit=${limitNoti + 6}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          dispatch(
            setMessage({
              type: "error",
              message: "Vui lòng đăng nhập để cài đặt thông báo!",
            })
          );
        } else {
          const resData = await response.json();
          setListNoti(resData.data.notifications);
          setSize(resData.data.limitNoti);
        }
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }

  async function handleDeleteNotification(id) {
    await actionDeleteNoti(id);
    socket.emit("send_notification", userInfo._id);
  }

  return (
    <div className="notification-container">
      <div className="header-notification-dialog__header notification-header">
        <span className="header-notification-dialog__title">Thông báo</span>
        <div className="header-notification-dialog__clear">
          <div
            className="header-notification-dialog__clear__box"
            onClick={handleCleanNotification}
          >
            <img src={cleanBoxImg} className="clean-icon"></img>
          </div>
        </div>
      </div>
      {isLoading && (
        <div className="loading__noti">
          <Spin text="Đang tải" />
        </div>
      )}
      {!isLoading && listNoti.length !== 0 && (
        <>
          {listNoti.map((noti) => (
            <div className="notification-system-item" key={noti._id}>
              <Link
                to={noti.linkTo}
                className="notification-system-card notification-card pointer"
              >
                <div className="system-avatar">
                  <LazyLoadImage
                    src={noti.sender.photo}
                    alt="noti user avatar"
                    className="nav-user-avatar"
                    effect="blur"
                  />
                </div>
                <div className="header-notification-list__content">
                  <div className="header-notification-list__header">
                    <span className="header-notification-list__title">
                      {titleNotification(noti.type)}
                    </span>
                  </div>
                  <div className="header-notification-list__content__body">
                    <div className="header-notification-list__text">
                      <span className="header-notification-list__text__time">
                        {formantDateNoti(noti.createdAt)}
                      </span>
                      <span className="header-notification-list__text__message">
                        <strong>{noti.sender.name} </strong>
                        {noti.message}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
              <div
                className="notification-item-close"
                onClick={() => handleDeleteNotification(noti._id)}
              >
                <i className="ri-close-circle-fill"></i>
              </div>
            </div>
          ))}
          {size > limitNoti && (
            <div
              className="notification-item-footer"
              onClick={loadNotification}
            >
              <span>Xem thêm</span>
            </div>
          )}
          {size <= limitNoti && (
            <div className="notification-item-footer text-center mb-4">
              <span>That all~</span>
            </div>
          )}
        </>
      )}
      {!isLoading && listNoti.length === 0 && (
        <div className="no-data-dialog">
          <LazyLoadImage
            src={noDataDialog}
            alt="no data"
            className="img-no-data"
            effect="blur"
          />
          <p className="no-data__text">Không có thông báo nào!!!</p>
        </div>
      )}
    </div>
  );
}

export default Notifications;

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";

import { socket } from "../../../helper/socket";
import cleanBoxImg from "../../../assets/img/clean_tool.png";
import noDataDialog from "../../../assets/img/no_reply.png";
import { setNumNotification } from "../../../store/notification-slice";
import { fetchNotifications } from "../../../store/notification-action";
import { formantDateNoti } from "../../../helper/formattingDate";

function Notification() {
  const dispatch = useDispatch();
  const { listNoti, numNoti, loadNoti } = useSelector(
    (state) => state.notifications
  );

  useEffect(() => {
    socket.on("get_num_notification", (data) => {
      dispatch(setNumNotification(data));
    });

    return () => {
      socket.off("get_num_notification", (data) => {
        dispatch(setNumNotification(data));
      });
    };
  }, [dispatch]);

  function handleLoadingNotification() {
    if (loadNoti) {
      dispatch(fetchNotifications());
    }
  }

  return (
    <div className="header-notification">
      {numNoti > 0 && (
        <span data-num={numNoti} className="header-notification__num"></span>
      )}
      <div className="icon-bell" onMouseEnter={handleLoadingNotification}>
        <i className="ri-notification-3-line"></i>
      </div>
      <div className="padding-dialog"></div>
      <div className="notification-dialog header-notification-dialog">
        <div className="header-notification-dialog__header">
          <span className="header-notification-dialog__title">Thông báo</span>
          <div className="header-notification-dialog__clear">
            <div className="header-notification-dialog__clear__box">
              <img src={cleanBoxImg} className="clean-icon"></img>
            </div>
            <Link to="/" className="header-notification-dialog__clear__setting">
              <i className="ri-settings-3-fill setting-icon"></i>
            </Link>
          </div>
        </div>
        <div className="header-notification-dialog__list">
          <div className="header-notification-list">
            {listNoti.length !== 0 &&
              listNoti.map((noti) => (
                <Link
                  to={noti.linkTo}
                  key={noti._id}
                  className="notification-system-card pointer"
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
                        {noti.type === "like_post" && "Thích bài viết"}
                        {noti.type === "cancel_booking" && "Huỷ tour"}
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
              ))}
            {listNoti.length === 0 && (
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
        </div>
        <div className="header-notification-dialog__footer">
          <Link to="/" className="router-link">
            Xem thêm
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Notification;

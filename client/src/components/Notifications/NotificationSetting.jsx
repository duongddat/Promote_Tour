import ToggleButton from "../common/ToggleButton";
import "./Notifications.css";

const LIST_SETTING = [
  {
    type: "LIKE_POST",
    label: "Yêu thích bài viết",
    check: true,
  },
  {
    type: "CANCEL_BOOKING",
    label: "Huỷ đặt tour",
    check: true,
  },
  {
    type: "REFUND_BOOKING",
    label: "Hoàn tiền đặt tour",
    check: true,
  },
];

function NotificationSetting() {
  return (
    <div className="setting-switch-list">
      <div className="setting-switch-list__title">
        <span>Thông báo</span>
        <div className="setting-switch-list__underline"></div>
      </div>
      <div className="setting-switch-item">
        <div className="setting-switch-item__label">Tất cả thông báo</div>
        <ToggleButton check={true} />
      </div>
      <div className="setting-switch-list__title">
        <span>Chi tiết</span>
        <div className="setting-switch-list__underline"></div>
      </div>
      {LIST_SETTING.length > 0 &&
        LIST_SETTING.map((setting) => (
          <div className="setting-switch-item" key={setting.type}>
            <div className="setting-switch-item__label">{setting.label}</div>
            <ToggleButton check={setting.check} />
          </div>
        ))}
    </div>
  );
}

export default NotificationSetting;

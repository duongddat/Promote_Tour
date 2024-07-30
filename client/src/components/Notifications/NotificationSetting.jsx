import { useCallback, useState } from "react";
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
  const [settingNoti, setSettingNoti] = useState(LIST_SETTING);
  const [allChecked, setAllChecked] = useState(true);

  const handleToggleAll = useCallback(() => {
    setAllChecked((prevAllChecked) => {
      const newAllChecked = !prevAllChecked;
      setSettingNoti((prevSettings) =>
        prevSettings.map((setting) => ({ ...setting, check: newAllChecked }))
      );
      return newAllChecked;
    });
  }, []);

  const handleToggleIndividual = useCallback((type) => {
    setSettingNoti((prevSettings) => {
      const newSettings = prevSettings.map((setting) =>
        setting.type === type ? { ...setting, check: !setting.check } : setting
      );

      const allChecked = newSettings.every((setting) => setting.check);
      setAllChecked(allChecked);
      return newSettings;
    });
  }, []);

  return (
    <div className="setting-switch-list">
      <div className="setting-switch-list__title">
        <span>Thông báo</span>
        <div className="setting-switch-list__underline"></div>
      </div>
      <div className="setting-switch-item">
        <div className="setting-switch-item__label">Tất cả thông báo</div>
        <ToggleButton check={allChecked} setCheck={handleToggleAll} />
      </div>
      <div className="setting-switch-list__title">
        <span>Chi tiết</span>
        <div className="setting-switch-list__underline"></div>
      </div>
      {settingNoti.length > 0 &&
        settingNoti.map((setting) => (
          <div className="setting-switch-item" key={setting.type}>
            <div className="setting-switch-item__label">{setting.label}</div>
            <ToggleButton
              check={setting.check}
              setCheck={() => handleToggleIndividual(setting.type)}
            />
          </div>
        ))}
    </div>
  );
}

export default NotificationSetting;

import { memo } from "react";

function ToggleButton({ check, setCheck }) {
  function handleToggle() {
    setCheck();
  }

  return (
    <label className="switch">
      <input type="checkbox" checked={check} onChange={handleToggle} />
      <span className="slider round"></span>
    </label>
  );
}

export default memo(ToggleButton);

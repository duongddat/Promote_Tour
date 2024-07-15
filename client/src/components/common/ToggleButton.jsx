import { useState } from "react";

function ToggleButton({ check }) {
  const [isCheck, setIsCheck] = useState(check);

  function handleToggle() {
    setIsCheck((prevIsCheck) => !prevIsCheck);
  }

  return (
    <label className="switch">
      <input type="checkbox" checked={isCheck} onChange={handleToggle} />
      <span className="slider round"></span>
    </label>
  );
}

export default ToggleButton;

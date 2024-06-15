import { Link } from "react-router-dom";

function DropdownItem({ title, to, icon, divider = false }) {
  return (
    <li>
      {!divider && (
        <Link className="dropdown-item" to={to}>
          <i className={icon}></i>
          <span>{title}</span>
        </Link>
      )}
      {divider && <hr className="dropdown-divider" />}
    </li>
  );
}

export default DropdownItem;

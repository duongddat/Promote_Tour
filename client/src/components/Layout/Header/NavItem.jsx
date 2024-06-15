import { NavLink } from "react-router-dom";
import "./Header.css";

function NavItem({ title, to, onToggle }) {
  return (
    <li className="nav-item">
      <NavLink
        className={({ isActive }) =>
          `nav-link nav-link__item mx-lg-2 ${isActive ? "active" : ""}`
        }
        to={to}
        onClick={onToggle}
      >
        {title}
      </NavLink>
    </li>
  );
}

export default NavItem;

import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./ButtonNoBGComponent.module.css";

const ButtonNoBGComponent = ({ to, children, className = "", ...props }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>`${styles.btn__noBG__component} ${className} ${isActive ? styles.active : "" }`}
      {...props}
    >
      {children}
    </NavLink>
  );
};

export default ButtonNoBGComponent;

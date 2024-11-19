import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ButtonFormComponent.module.css";

const ButtonFormComponent = ({ to, children, className = "", ...props }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (to) {
      navigate(to); // Chuyển đến đường dẫn được truyền qua props "to"
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`${styles.btn__form} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default ButtonFormComponent;

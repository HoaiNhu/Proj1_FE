import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ButtonComponent.module.css";

const ButtonComponent = ({ to, children, className = "", ...props }) => {
  const navigate = useNavigate();

  const handleClick = (event) => {
    if (to) {
      event.preventDefault(); // Ngăn form hoặc hành động khác nếu có
      navigate(to); // Điều hướng đến trang chỉ định
    }
    if (props.onClick) {
      props.onClick(event); // Gọi thêm hàm onClick nếu được truyền
    }
  };

  return (
    <button
      className={`${styles.btn__component} ${className}`}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default ButtonComponent;

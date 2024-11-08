import React from "react";
import styles from "./ButtonNoBGComponent.module.css";

const ButtonNoBGComponent = ({ children, className = "", ...props }) => {
  return (
    <button
      className={`${styles.btn__noBG__component} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default ButtonNoBGComponent;

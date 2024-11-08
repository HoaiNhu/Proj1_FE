import React from "react";
import styles from "./ButtonComponent.module.css";

const ButtonComponent = ({ children, className = "", ...props }) => {
  return (
    <div>
      <button className={`${styles.btn__component} ${className}`} {...props}>
        {children}
      </button>
    </div>
  );
};

export default ButtonComponent;

import React from "react";
import styles from "./FormComponent.module.css";

const FormComponent = ({ className = "", style = {}, ...props }) => {
  return (
    <div className={`${styles.form__control}`}>
      <input
        type={props.type}
        className={` ${styles.form__text}`}
        id={props.id}
        placeholder={props.placeholder}
        style={style}
        {...props}
      />
    </div>
  );
};

export default FormComponent;

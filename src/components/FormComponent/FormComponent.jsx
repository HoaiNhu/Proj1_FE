import React from "react";
import styles from "./FormComponent.module.css";

const FormComponent = ({
  className = "",
  style = {},
  value,
  onChange,
  ...props
}) => {
  return (
    <div className={`${styles.form__control}`}>
      <input
        type={props.type}
        className={` ${styles.form__text}`}
        id={props.id}
        placeholder={props.placeholder}
        style={style}
        value={props.value}
        onChange={onChange}
        {...props}
      />
    </div>
  );
};

export default FormComponent;

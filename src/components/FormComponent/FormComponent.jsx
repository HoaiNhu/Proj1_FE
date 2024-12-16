import React from "react";
import styles from "./FormComponent.module.css";

const FormComponent = ({
  className = "",
  style = {},
  value,
  onChange,
  error,
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
        value={value}
        onChange={(e) => onChange && onChange(e.target.value)}
        {...props}
      />
    </div>
  );
};

export default FormComponent;

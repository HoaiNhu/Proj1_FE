import React from "react";
import styles from "./ButtonFormComponent.module.css";

const ButtonFormComponent = (props) => {
  return <button className={`${styles.btn__form}`}>{props.children}</button>;
};

export default ButtonFormComponent;

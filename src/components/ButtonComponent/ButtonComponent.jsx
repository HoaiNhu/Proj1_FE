import React from "react";
import "../../assets/css/style.css";
import "../../assets/css/reset.css";
import styles from "./ButtonComponent.module.css";

const ButtonComponent = (props) => {
  return (
    <div>
      <button className={styles.btn__component}>{props.children}</button>
    </div>
  );
};

export default ButtonComponent;

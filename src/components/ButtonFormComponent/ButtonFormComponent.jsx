import React from "react";
import "./ButtonFormComponent.css"

const ButtonComponent = (props) => {
  return (
    <button
      className="btn btn-form"
      style={{
        height: "44px",
        width: "auto",
      }}
    >
      {props.children}
    </button>
  );
};

export default ButtonComponent;

import React from "react";

const ButtonFormComponent = (props) => {
  return (
    <button
      className="btn-form"
      style={{
        height: "44px",
        width: "auto",
      }}
    >
      {props.children}
    </button>
  );
};

export default ButtonFormComponent;

import React from "react";
import "./FormComponent.css";

const FormComponent = (props) => {
  return (
    <div
      className="mb-3"
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        width: "42rem",
      }}
    >
      <input
        type={props.type}
        className="form-control form-text"
        id={props.id}
        placeholder={props.placeholder}
      />
    </div>
  );
};

export default FormComponent;

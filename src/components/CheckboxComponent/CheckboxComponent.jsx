import React from "react";

const CheckboxComponent = ({ isChecked, onChange }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      onClick={onChange}
      style={{ cursor: "pointer" }}
    >
      <g filter="url(#filter0_d)">
        <rect
          x="8.5"
          y="8.9"
          width="22.6"
          height="22.6"
          rx="5"
          fill={isChecked ? "#5a2d0c" : "#D9D9D9"}
        />
      </g>
    </svg>
  );
};

export default CheckboxComponent;

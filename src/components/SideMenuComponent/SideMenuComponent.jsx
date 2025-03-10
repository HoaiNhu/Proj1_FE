import React from "react";
import "./SideMenuComponent.css";

const SideMenuComponent = ({ onClick, isActive, children }) => {
  return (
    <div className="side-menu sticky-left">
      <div
        className="btn__side-menu"
        role="group"
        aria-label="Vertical button group"
      >
        <button
          className={`btn__component ${isActive ? "active" : ""}`}
          onClick={onClick}
        >
          {children}
        </button>
      </div>
    </div>
  );
};

export default SideMenuComponent;

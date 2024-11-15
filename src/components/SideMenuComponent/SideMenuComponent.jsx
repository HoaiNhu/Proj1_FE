import React from "react";
import "./SideMenuComponent.css";
import ButtonNoBGComponent from "../ButtonNoBGComponent/ButtonNoBGComponent";

const SideMenuComponent = () => {
  return (
    <div>
      <div className="side-menu sticky-left">
        <div
          className=" btn__side-menu"
          role="group"
          aria-label="Vertical button group"
        >
          <ButtonNoBGComponent className="btn__component">
            Bánh sinh nhật
          </ButtonNoBGComponent>
          <ButtonNoBGComponent className="btn__component">
            Bánh cưới
          </ButtonNoBGComponent>
          <ButtonNoBGComponent className="btn__component">
            Bánh ngọt
          </ButtonNoBGComponent>
          <ButtonNoBGComponent className="btn__component">
            Phụ kiện
          </ButtonNoBGComponent>
        </div>
      </div>
    </div>
  );
};

export default SideMenuComponent;

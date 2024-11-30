import React from "react";
import "./ProductPageAdmin.css";
import SideMenuComponent from "../../../../components/SideMenuComponent/SideMenuComponent";
import CardProductAdmin from "../../../../components/CardProductAdmin/CardProductAdmin";
import img1 from "../../../../assets/img/hero_3.jpg";
import ButtonComponent from "../../../../components/ButtonComponent/ButtonComponent";
import AddBtn from "../../../../components/AddBtn(+)/AddBtn";
import SideMenuComponentDelete from "../../../../components/SideMenuComponent-Delete/SideMenuComponentDelete";

const ProductPageAdmin = () => {
  return (
    <div>
      <div className="container-xl productadmin-container">
        <div className="productadmin">
          {/* productadmin top */}
          <div className="productadmin__top">
            <h1 className="productadmin__title">SẢN PHẨM</h1>
          </div>
          <div style={{marginLeft:1222}}><AddBtn/></div>
          {/* productadmin bot */}
          <div className="productadmin__bot">
            {/* side menu */}
            <div className="side-menu__category">
              <SideMenuComponentDelete>Bánh sinh nhật</SideMenuComponentDelete>
              <SideMenuComponentDelete>Bánh mặn</SideMenuComponentDelete>
              <SideMenuComponentDelete>Bánh cưới</SideMenuComponentDelete>
            </div>

            {/* productadmin list */}
            <div className=" container productadmin__list">
              <CardProductAdmin
                className="col productadmin__item"
                type={"primary"}
                img={img1}
                title="Green Tea Flour Love"
                price="250 000 vnđ"
              ></CardProductAdmin>
              <CardProductAdmin
                className="col productadmin__item"
                type={"primary"}
                img={img1}
                title="Green Tea Flour Love"
                price="250 000 vnđ"
              ></CardProductAdmin>
              <CardProductAdmin
                className="col productadmin__item"
                type={"primary"}
                img={img1}
                title="Green Tea Flour Love"
                price="250 000 vnđ"
              ></CardProductAdmin>
              <CardProductAdmin
                className="col productadmin__item"
                type={"primary"}
                img={img1}
                title="Green Tea Flour Love"
                price="250 000 vnđ"
              ></CardProductAdmin>
            </div>
            {/* button see more */}
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPageAdmin;

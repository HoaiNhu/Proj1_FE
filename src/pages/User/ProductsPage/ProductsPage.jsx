import React from "react";
import "./ProductsPage.css";
import SideMenuComponent from "../../../components/SideMenuComponent/SideMenuComponent";
import CardProduct from "../../../components/CardProduct/CardProduct";
import img1 from "../../../assets/img/hero_3.jpg";
import ButtonComponent from "../../../components/ButtonComponent/ButtonComponent";

const ProductsPage = () => {
  return (
    <div>
      <div className="container-xl product-container">
        <div className="product">
          {/* product top */}
          <div className="product__top">
            <h1 className="product__title">SẢN PHẨM</h1>
          </div>

          {/* product bot */}
          <div className="product__bot">
            {/* side menu */}
            <div className="side-menu__category">
              <SideMenuComponent></SideMenuComponent>
            </div>

            {/* product list */}
            <div className=" container product__list">
              <CardProduct
                className="col product__item"
                type={"primary"}
                img={img1}
                title="Green Tea Flour Love"
                price="250 000 vnđ"
              ></CardProduct>
              <CardProduct
                className="col product__item"
                type={"primary"}
                img={img1}
                title="Green Tea Flour Love"
                price="250 000 vnđ"
              ></CardProduct>
              <CardProduct
                className="col product__item"
                type={"primary"}
                img={img1}
                title="Green Tea Flour Love"
                price="250 000 vnđ"
              ></CardProduct>
              <CardProduct
                className="col product__item"
                type={"primary"}
                img={img1}
                title="Green Tea Flour Love"
                price="250 000 vnđ"
              ></CardProduct>
            </div>
            {/* button see more */}
            <ButtonComponent className="btn__see-more">
              Xem thêm
            </ButtonComponent>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;

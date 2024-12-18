import React from "react";
import "./StoreInfoPage.css";
import DropdownComponent from "../../../components/DropdownComponent/DropdownComponent";
import FormComponent from "../../../components/FormComponent/FormComponent";
import SideMenuComponent from "../../../components/SideMenuComponent/SideMenuComponent";
import ButtonComponent from "../../../components/ButtonComponent/ButtonComponent";
import logo from "../../../assets/img/AVOCADO.png";
import { useNavigate } from "react-router-dom";
const StoreInfoPage = () => {
  const navigate =useNavigate();
  const ClickInfor=()=>{navigate("/store-info")}
  const ClickOrder=()=>{navigate("/order-list")}
  const ClickDiscount=()=>{navigate("/discount-list")}
  const ClickStatus=()=>{navigate("/status-list")}
  const ClickCategory=()=>{navigate("/category-list")}
  const ClickUser=()=>{navigate("/user-list")}
  const ClickReprot=()=>{navigate("/report")}
  return (
    <div>
      <div className="container-xl">
        <div className="store-info__container">
          {/* side menu */}
          <div className="side-menu__discount">
          <SideMenuComponent onClick={ClickInfor}>Thông tin cửa hàng</SideMenuComponent>
            <SideMenuComponent onClick={ClickOrder}>Đơn hàng</SideMenuComponent>
            <SideMenuComponent onClick={ClickDiscount}>Khuyến mãi</SideMenuComponent>
            <SideMenuComponent onClick={ClickStatus}>Trạng thái</SideMenuComponent>
            <SideMenuComponent onClick={ClickCategory}>Loại sản phẩm</SideMenuComponent>
            <SideMenuComponent onClick={ClickUser}>Danh sách người dùng</SideMenuComponent>
            <SideMenuComponent onClick={ClickReprot}>Thống kê</SideMenuComponent>
          </div>
          {/* content */}
          <div className="store-info">
            <div className="store-info__content">
              {/* top */}
              <div className="row mb-5">
                <div className="col">
                  <label className="title">Logo</label>
                  <img className="logo__image-store" src={logo} alt="avocado" />
                </div>
                <div className="col name-phone">
                  <div className="store-name">
                    <label className="title">Tên cửa hàng</label>
                    <FormComponent style={{ width: "100%" }}></FormComponent>
                  </div>
                  <div className="store-phone">
                    <label className="title">Số điện thoại</label>
                    <FormComponent style={{ width: "100%" }}></FormComponent>
                  </div>
                </div>
              </div>
              {/* bot */}
              <div className="row store-info__email">
                <label className="title">Email</label>
                <FormComponent
                  className="store__mail"
                  type="email"
                  style={{ width: "100%" }}
                ></FormComponent>
              </div>
              <div className="row store-info__email mb-5">
                <label className="title">Địa chỉ</label>
                <FormComponent
                  className="store-address mb-3"
                  style={{ width: "100%" }}
                ></FormComponent>
                <div className="dropdown__address">
                  <DropdownComponent></DropdownComponent>
                  <DropdownComponent></DropdownComponent>
                  <DropdownComponent></DropdownComponent>
                </div>
              </div>

              {/* button */}
              <div className="btn__store-info">
                <ButtonComponent>Lưu</ButtonComponent>
                <ButtonComponent>Thoát</ButtonComponent>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreInfoPage;

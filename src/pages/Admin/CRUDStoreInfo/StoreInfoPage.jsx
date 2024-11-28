import React from "react";
import "./StoreInfoPage.css";
import DropdownComponent from "../../../components/DropdownComponent/DropdownComponent";
import FormComponent from "../../../components/FormComponent/FormComponent";
import SideMenuComponent from "../../../components/SideMenuComponent/SideMenuComponent";
import ButtonComponent from "../../../components/ButtonComponent/ButtonComponent";
import logo from "../../../assets/img/AVOCADO.png";

const StoreInfoPage = () => {
  return (
    <div>
      <div className="container-xl">
        <div className="store-info__container">
          {/* side menu */}
          <div className="side-menu__discount">
            <SideMenuComponent>Thông tin cửa hàng</SideMenuComponent>
            <SideMenuComponent>Đơn hàng</SideMenuComponent>
            <SideMenuComponent>Khuyến mãi</SideMenuComponent>
            <SideMenuComponent>Trạng thái</SideMenuComponent>
            <SideMenuComponent>Loại sản phẩm </SideMenuComponent>
            <SideMenuComponent>Danh sách người dùng</SideMenuComponent>
            <SideMenuComponent>Thống kê</SideMenuComponent>
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
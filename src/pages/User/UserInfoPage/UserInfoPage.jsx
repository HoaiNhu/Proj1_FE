import React, { useState } from "react";
import "./UserInfoPage.css";
import SideMenuComponent from "../../../components/SideMenuComponent/SideMenuComponent";
import FormComponent from "../../../components/FormComponent/FormComponent";
import DropdownComponent from "../../../components/DropdownComponent/DropdownComponent";
import ButtonComponent from "../../../components/ButtonComponent/ButtonComponent";
import img from "../../../assets/img/hero_5.jpg";

function UserInfoPage() {
  const [user, setUser] = useState({
    userName: "",
    userPrice: "",
    userSize: "",
    userCategory: "",
    userImage: null,
    userDescription: "",
  });
  const handleImageChange = (e) => {
    setUser({ ...user, userImage: e.target.files[0] });
  };

  return (
    <div>
      <div className="container-xl">
        <div className=" user-info__container">
          {/* info top */}
          <div className="user-info__top">
            <div className="user-profile">
              <div className="section-item">
                <img className="user-top__avatar" src={img} alt="User Avatar" />
                <h2 className="user-top__name">Happy</h2>
              </div>
              <ButtonComponent
                className="btn__upload"
                type="file"
                onChange={handleImageChange}
                accept="image/*"
              >
                Chọn ảnh
              </ButtonComponent>
            </div>
          </div>
          {/* info bot */}
          <div className="user-info__bot">
            {/* side menu */}
            <div className="side-menu__info">
              <SideMenuComponent>Thông tin cá nhân</SideMenuComponent>
              <SideMenuComponent>Khuyến mãi</SideMenuComponent>
              <SideMenuComponent>Đơn hàng</SideMenuComponent>
            </div>
            <div className="user-info">
              <h2 className="user-info__title">Thông tin cá nhân</h2>
              <div className="user-name form-group">
                <label>Tên người dùng</label>
                <FormComponent
                  className="name"
                  style={{ width: "100%" }}
                ></FormComponent>
              </div>

              <div className="form-row">
                <div className="user-email form-group">
                  <label>Email</label>
                  <FormComponent
                    className="email"
                    style={{ width: "100%" }}
                  ></FormComponent>
                </div>
                <div className="user-phone form-group">
                  <label>Số điện thoại</label>
                  <FormComponent
                    className="phone"
                    style={{ width: "100%" }}
                  ></FormComponent>
                </div>
              </div>
              <div className="user-address form-group">
                <label>Địa chỉ</label>
                <FormComponent
                  className="address"
                  style={{ width: "100%" }}
                ></FormComponent>

                <div className="form-row">
                  <DropdownComponent placeholder="Chọn phường"></DropdownComponent>
                  <DropdownComponent placeholder="Chọn quận"></DropdownComponent>
                  <DropdownComponent placeholder="Chọn thành phố"></DropdownComponent>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserInfoPage;

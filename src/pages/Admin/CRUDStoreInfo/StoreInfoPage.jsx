import "./StoreInfoPage.css";
import SideMenuComponent_AdminManage from "../../../components/SideMenuComponent_AdminManage/SideMenuComponent_AdminManage";
import DropdownComponent from "../../../components/DropdownComponent/DropdownComponent";
import FormComponent from "../../../components/FormComponent/FormComponent";
import ButtonComponent from "../../../components/ButtonComponent/ButtonComponent";
import logo from "../../../assets/img/AVOCADO.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const StoreInfoPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("store-info");

  const handleTabClick = (tab, navigatePath) => {
    setActiveTab(tab);
    navigate(navigatePath);
  };

  return (
    <div>
      <div className="container-xl">
        <div className="store-info__container">
          {/* side menu */}
          <div className="side-menu__discount">
            <SideMenuComponent_AdminManage
              activeTab={activeTab}
              handleTabClick={handleTabClick}
            />
          </div>

          {/* content */}
          <div className="store-info">
            <div className="store-info__content">
              {/* top */}
              <div className="row mb-5">
                <div className="col">
                  <label className="title-name">Logo</label>
                  <img className="logo__image-store" src={logo} alt="avocado" />
                </div>
                <div className="col name-phone">
                  <div className="store-name">
                    <label className="title-name">Tên cửa hàng</label>
                    <FormComponent
                      style={{ width: "100%" }}
                      value="AVOCADO"
                    />
                  </div>
                  <div className="store-phone">
                    <label className="title-name">Số điện thoại</label>
                    <FormComponent
                      style={{ width: "100%" }}
                      value="0334455246"
                    />
                  </div>
                </div>
              </div>

              {/* bot */}
              <div className="row store-info__email">
                <label className="title-name">Email</label>
                <FormComponent
                  className="store__mail"
                  type="email"
                  style={{ width: "100%" }}
                  value="avocado@gmail.com"
                />
              </div>
              <div className="row store-info__email mb-5">
                <label className="title-name">Địa chỉ</label>
                <FormComponent
                  className="store-address mb-3"
                  style={{ width: "100%" }}
                  value="Đường Mạc Đỉnh Chi, khu phố Tân Hòa, Dĩ An, Bình Dương"
                />
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

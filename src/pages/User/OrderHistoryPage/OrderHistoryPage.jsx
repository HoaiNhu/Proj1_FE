import React from "react";
import "./OrderHistoryPage.css";
import SideMenuComponent from "../../../components/SideMenuComponent/SideMenuComponent";
import OrderHistoryCardComponent from "../../../components/OrderHistoryCardComponent/OrderHistoryCardComponent";
import img from "../../../assets/img/hero_5.jpg";

const OrderHistoryPage = () => {
  // Dữ liệu mẫu cho danh sách đơn hàng
  const orders = [
    {
      id: 1,
      status: "in-progress", // Trạng thái đơn hàng: "delivered" hoặc "in-progress"
      products: [
        {
          name: "Tiramisu trái cây lộn xộn",
          size: "23 cm",
          price: "100000",
          quantity: 2,
          image: img,
        },
        {
          name: "Bánh kem bơ matcha",
          size: "18 cm",
          price: "150000",
          quantity: 1,
          image: img,
        },
      ],
    },
    {
      id: 2,
      status: "delivered",
      products: [
        {
          name: "Bánh cuộn sô cô la",
          size: "20 cm",
          price: "120000",
          quantity: 1,
          image: img,
        },
      ],
    },
  ];

  return (
    <div>
      <div className="container-xl">
        <div className="user-info__container">
          {/* Thông tin người dùng */}
          <div className="user-info__top">
            <div className="user-profile">
              <div className="section-item">
                <img className="user-top__avatar" src={img} alt="User Avatar" />
                <h2 className="user-top__name">Happy</h2>
              </div>
            </div>
          </div>

          {/* Nội dung chính */}
          <div className="user-info__bot">
            {/* Menu bên cạnh */}
            <div className="side-menu__info">
              <SideMenuComponent>Thông tin cá nhân</SideMenuComponent>
              <SideMenuComponent>Khuyến mãi</SideMenuComponent>
              <SideMenuComponent>Đơn hàng</SideMenuComponent>
              <SideMenuComponent>Đăng xuất</SideMenuComponent>
            </div>

            {/* Lịch sử đơn hàng */}
            <div className="order-history__info">
              <h2 className="order-history__title">Lịch sử mua hàng</h2>
              {orders.map((order) => (
                <OrderHistoryCardComponent key={order.id} order={order} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderHistoryPage;

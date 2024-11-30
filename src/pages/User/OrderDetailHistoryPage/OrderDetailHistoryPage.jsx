import React from "react";
import { useLocation } from "react-router-dom";
import SideMenuComponent from "../../../components/SideMenuComponent/SideMenuComponent";
import ProductRowComponent from "../../../components/ProductRowComponent/ProductRowComponent"; // Import component
import "./OrderDetailHistoryPage.css";

const OrderDetailHistoryPage = () => {
  const deliveryCost = 25000;
  const location = useLocation();
  const order = location.state?.order; // Lấy dữ liệu từ state

  if (!order) {
    return <div>Không tìm thấy thông tin đơn hàng!</div>;
  }

  const totalAmount = order.products.reduce((acc, product) => {
    return acc + parseInt(product.price) * parseInt(product.quantity);
  }, 0);

  return (
    <div>
      <div className="container-xl">
        <div className="user-info__container">
          {/* Thông tin người dùng */}
          <div className="user-info__top">
            <div className="user-profile">
              <div className="section-item">
                <img
                  className="user-top__avatar"
                  src={order.products[0]?.image}
                  alt="Order Avatar"
                />
                <h2 className="user-top__name">Chi tiết đơn hàng</h2>
              </div>
            </div>
          </div>

          {/* Nội dung chính */}
          <div className="user-info__bot">
            <div className="side-menu__info">
              <SideMenuComponent>Thông tin cá nhân</SideMenuComponent>
              <SideMenuComponent>Khuyến mãi</SideMenuComponent>
              <SideMenuComponent>Đơn hàng</SideMenuComponent>
              <SideMenuComponent>Đăng xuất</SideMenuComponent>
            </div>
            <div className="order-detail-history">
              <div className="detail__content">
                <h2 className="detail__title">Chi tiết đơn hàng</h2>
                <div className="row">
                  <label>
                    <strong>ID đơn hàng:</strong> {order.id}
                  </label>
                </div>
                <div className="row">
                  <label>
                    <strong>Trạng thái:</strong> {order.status}
                  </label>
                </div>

                {/* product list */}
                <h3>Sản phẩm:</h3>
                <div className="product-list">
                  {order.products.map((product, index) => (
                    <ProductRowComponent key={index} product={product} />
                  ))}
                </div>

                {/* total */}
                <div className="total-cost">
                  <div className="cost">
                    <label className="product-cost">
                      Tổng tiền sản phẩm: {totalAmount.toLocaleString()} vnd
                    </label>
                    <label className="delivery-cost">
                      Phí vận chuyển: {deliveryCost} vnd
                    </label>
                  </div>
                  <div className="total-bill">
                    Tổng hóa đơn:
                    {(totalAmount + deliveryCost).toLocaleString()} vnd
                  </div>
                </div>

                {/* info-delivery */}
                <div className="info-delivery">
                  <div className="info-customer">
                    <label>Thông tin giao hàng</label>
                    <p>Tên: Happy</p>
                    <p>Số điện thoại: 0222999</p>
                    <p>
                      Địa chỉ: tổ 12, ấp ..., xã Bạch Đằng, tp Tân Uyên, tỉnh
                      Bình Dương
                    </p>
                  </div>
                  <div className="info-journey">
                    <label>Hành trình giao hàng</label>
                    <p>Hoàn thành đơn hàng: 1/1/2024</p>
                    <p>Thanh toán: 1/1/2024</p>
                    <p>Giao hàng cho đơn vị vận chuyển: 1/1/2024</p>
                    <p>Chuẩn bị hàng: 1/1/2024</p>
                    <p>Xác nhận đơn hàng: 1/1/2024</p>
                    <p>Đặt hàng: 1/1/2024</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailHistoryPage;

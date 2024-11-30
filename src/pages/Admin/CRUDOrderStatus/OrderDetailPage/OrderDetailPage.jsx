import React from "react";
import "./OrderDetailPage.css";
import SideMenuComponent from "../../../../components/SideMenuComponent/SideMenuComponent";
import ButtonComponent from "../../../../components/ButtonComponent/ButtonComponent";
import CheckboxComponent from "../../../../components/CheckboxComponent/CheckboxComponent";
import DropdownComponent from "../../../../components/DropdownComponent/DropdownComponent";
import { useLocation } from "react-router-dom";
import ProductRowComponent from "../../../../components/ProductRowComponent/ProductRowComponent";

const OrderDetailPage = () => {
  const deliveryCost = 25000;
  const location = useLocation();
  const order = location.state; // Nhận dữ liệu từ state

  if (!order) {
    return <p>Không có dữ liệu để hiển thị.</p>;
  }

  const totalAmount = order.products.reduce((acc, product) => {
    return acc + parseInt(product.price) * parseInt(product.quantity);
  }, 0);

  return (
    <div>
      <div className="container-xl">
        <div className="order-list__info">
          {/* side menu */}
          <div className="side-menu__order">
            <SideMenuComponent className="btn-menu">
              Thông tin cửa hàng
            </SideMenuComponent>
            <SideMenuComponent className="btn-menu">Đơn hàng</SideMenuComponent>
            <SideMenuComponent className="btn-menu">
              Khuyến mãi
            </SideMenuComponent>
            <SideMenuComponent className="btn-menu">
              Trạng thái
            </SideMenuComponent>
            <SideMenuComponent className="btn-menu">
              Loại sản phẩm
            </SideMenuComponent>
            <SideMenuComponent className="btn-menu">
              Danh sách người dùng
            </SideMenuComponent>
            <SideMenuComponent className="btn-menu">Thống kê</SideMenuComponent>
          </div>
          {/* order list */}
          <div className="order-list__content">
            <div className="order-list__action">
              <h2 className="order-list__title">
                Chi tiết đơn hàng: {order.orderId}
              </h2>
              <div className="btn__action">
                <ButtonComponent className="btn btn-exit">
                  Thoát
                </ButtonComponent>
                <ButtonComponent className="btn btn-cancel">
                  Hủy đơn
                </ButtonComponent>
                <ButtonComponent className="btn btn-accept">
                  Nhận đơn
                </ButtonComponent>
                <ButtonComponent className="btn btn-update">
                  Cập nhật
                </ButtonComponent>
              </div>
            </div>

            {/* product */}
            <label className="label-status">
              Trạng thái: {order.orderStatus}
            </label>

            <div className="info-customer">
              <h3 className="mb-3">Thông tin giao hàng</h3>
              <p>
                Mã khách hàng: <label>{order.userId}</label>
              </p>
              <p>
                Tên khách hàng: <label>{order.userName}</label>
              </p>
              <p>
                Số điện thoại: <label>{order.userPhone}</label>
              </p>
              <p>
                Địa chỉ: <label>{order.userAddress}</label>
              </p>
              <p>Mã đơn: {order.orderId}</p>
              <p>Ngày đặt: {order.orderBookDate}</p>
              <p>Ngày giao: {order.orderDelivery}</p>
              <p>Ghi chú: {order.orderNote}</p>
            </div>
            <h3>Danh sách sản phẩm:</h3>
            <div className="product-list">
              {order.products.map((product, index) => (
                <ProductRowComponent key={index} product={product} />
              ))}
            </div>

            {/* total */}
            <div className="total-cost">
              <div className="cost">
                <p className="product-cost">
                  Tổng tiền sản phẩm: {"  "}{" "}
                  <label>{totalAmount.toLocaleString()} vnd</label>
                </p>
                <p className="delivery-cost">
                  Phí vận chuyển: <label>{deliveryCost} vnd</label>
                </p>
              </div>
              <div className="total-bill">
                Tổng hóa đơn: {(totalAmount + deliveryCost).toLocaleString()}{" "}
                vnd
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage;

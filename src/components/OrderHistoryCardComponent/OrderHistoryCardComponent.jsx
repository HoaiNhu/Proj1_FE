import React from "react";
import ProductRowComponent from "../ProductRowComponent/ProductRowComponent";
import StatusComponent from "../StatusComponent/StatusComponent";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import "./OrderHistoryCardComponent.css";
import { useNavigate } from "react-router-dom";

const OrderHistoryCardComponent = ({ order }) => {
  const navigate = useNavigate(); // Hook điều hướng

  const handleViewDetails = () => {
    navigate(`/order-detail-history/${order.id}`, { state: { order } }); // Chuyển hướng với dữ liệu
  };

  const totalAmount = order.products.reduce((acc, product) => {
    return acc + parseInt(product.price) * parseInt(product.quantity); // Tổng tiền của tất cả sản phẩm
  }, 0);

  return (
    <div className="order-card">
      <div className="order-title d-flex align-items-center">
        {/* Sử dụng StatusComponent */}
        <StatusComponent
          status={
            order.status === "delivered"
              ? "Đơn hàng đã được giao"
              : "Đơn hàng đang được giao"
          }
        />
      </div>
      <div className="order-products">
        {order.products.map((product, index) => (
          <ProductRowComponent key={index} product={product} />
        ))}
      </div>
      <div className="order-footer d-flex justify-content-between align-items-center">
        <ButtonComponent className="btn-detail" onClick={handleViewDetails}>
          Chi tiết
        </ButtonComponent>
        <div className="order-total d-flex text-center gap-5">
          <label>Tổng số tiền: </label>{" "}
          <div>{totalAmount.toLocaleString()} vnd</div>
        </div>
      </div>
    </div>
  );
};

export default OrderHistoryCardComponent;

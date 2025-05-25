import React from "react";
import ProductRowComponent from "../ProductRowComponent/ProductRowComponent";
import StatusComponent from "../StatusComponent/StatusComponent";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import "./OrderHistoryCardComponent.css";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import ProductInforCustom from "../../components/ProductInfor/ProductInforCustom";
import RatingStar from "../RatingStar/RatingStar";

const OrderHistoryCardComponent = ({ order, onRateClick }) => {
  const navigate = useNavigate(); // Hook điều hướng

  const handleViewDetails = (id) => {
    console.log("ORDERID", id);

    console.log("ITEM", order);
    navigate(`/order-detail-history/${id}`, { state: { order } }); // Chuyển hướng với dữ liệu
  };

  const handleRateOrder = (orderId) => {
    navigate(`/order-rating/${orderId}`, { state: { order } });
  };

  // const totalAmount = order.products.reduce((acc, product) => {
  //   return acc + parseInt(product.price) * parseInt(product.quantity); // Tổng tiền của tất cả sản phẩm
  // }, 0);
  const totalAmount = order.totalPrice;
  // console.log("ORDERCOMPONENT", order.orderItems)
  console.log("ORDERCOMPONENT1313", totalAmount);

  const getStatusText = (status) => {
    switch (status) {
      case "PENDING":
        return "Chờ xác nhận";
      case "CONFIRMED":
        return "Đã xác nhận";
      case "SHIPPING":
        return "Đang giao hàng";
      case "DELIVERED":
        return "Đã giao hàng";
      case "CANCELLED":
        return "Đã hủy";
      default:
        return status;
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "PENDING":
        return "status-pending";
      case "CONFIRMED":
        return "status-confirmed";
      case "SHIPPING":
        return "status-shipping";
      case "DELIVERED":
        return "status-delivered";
      case "CANCELLED":
        return "status-cancelled";
      default:
        return "";
    }
  };

  return (
    <div className="order-card">
      <div className="order-title d-flex justify-content-between align-items-center">
        <StatusComponent status={order.status.statusName} />
        {order.status.statusName === "Đã giao" && (
          <ButtonComponent
            variant="outline-primary"
            size="sm"
            className="rate-order-button"
            onClick={() => handleRateOrder(order._id)}
          >
            Đánh giá
          </ButtonComponent>
        )}
      </div>
      <div className="order-products">
        {Array.isArray(order.orderItems) && order.orderItems.length > 0 ? (
          order.orderItems.map((item, index) => (
            <div key={index} className="product-item">
              {item.product ? (
                <>
                  <ProductInforCustom
                    image={item.product.productImage}
                    name={item.product.productName}
                    size={item.product.productSize}
                    quantity={item.quantity}
                    price={item.total}
                  />
                  {order.status.statusName === "Đã giao" && !item.rating && (
                    <Button
                      variant="outline-primary"
                      size="sm"
                      className="rate-button"
                      onClick={() => onRateClick(item.product, order._id)}
                    >
                      Đánh giá
                    </Button>
                  )}
                  {item.rating && (
                    <div className="product-rating">
                      <RatingStar
                        rating={item.rating.rating}
                        setRating={() => {}}
                        isEditable={false}
                        size={16}
                        showCount={false}
                      />
                      {item.rating.comment && (
                        <div className="rating-comment">
                          {item.rating.comment}
                        </div>
                      )}
                    </div>
                  )}
                </>
              ) : (
                <div className="text-muted">Sản phẩm không còn tồn tại</div>
              )}
            </div>
          ))
        ) : (
          <div>Không có sản phẩm nào trong đơn hàng này.</div>
        )}

        <div className="order-footer d-flex justify-content-between align-items-center">
          <ButtonComponent
            className="btn-detail"
            onClick={() => handleViewDetails(order._id)}
          >
            Chi tiết
          </ButtonComponent>
          <div className="order-total d-flex text-center gap-5">
            <label>Tổng số tiền: </label>{" "}
            <div>{totalAmount.toLocaleString()} VND</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderHistoryCardComponent;

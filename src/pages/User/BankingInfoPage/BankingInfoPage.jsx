import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./BankingInfoPage.css";
import BackIconComponent from "../../../components/BackIconComponent/BackIconComponent";
import ButtonComponent from "../../../components/ButtonComponent/ButtonComponent";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../../../redux/slides/cartSlide";

const BankingInfoPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const {
    qrCodeUrl,
    paymentCode,
    expiresAt,
    adminBankInfo,
    selectedProductIds,
  } = location.state || {};
  const [paymentStatus, setPaymentStatus] = useState("PENDING");
  const [orderStatus, setOrderStatus] = useState("");
  const [message, setMessage] = useState("");
  const [timeLeft, setTimeLeft] = useState(null);
  const orderDetails = useSelector((state) => state.order);
  const lastOrder = orderDetails.orders?.[orderDetails.orders.length - 1] || {};

  const resolvedOrderItems =
    lastOrder.orderItems?.map((item) => {
      return {
        ...item,
        name: item.productName || "Sản phẩm",
        price: item.total / item.quantity,
      };
    }) || [];

  useEffect(() => {
    if (!paymentCode) {
      setMessage("Không tìm thấy mã thanh toán.");
      return;
    }

    console.log("Received qrCodeUrl:", qrCodeUrl);

    const calculateTimeLeft = () => {
      const now = new Date();
      const expiry = new Date(expiresAt);
      const diff = expiry - now;
      if (diff <= 0) {
        setTimeLeft(0);
        setMessage("QR đã hết hạn.");
        return;
      }
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      setTimeLeft(`${minutes} phút ${seconds} giây`);
    };

    const timer = setInterval(calculateTimeLeft, 1000);

    const checkPaymentStatus = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/payment/get-detail-payment/${paymentCode}`
        );
        if (response.data.status === "OK") {
          const payment = response.data.data;
          setPaymentStatus(payment.status);

          try {
            const orderResponse = await axios.get(
              `http://localhost:3001/api/order/get-detail-order/${payment.orderId}`
            );
            if (orderResponse.data.status === "OK") {
              const order = orderResponse.data.data;
              setOrderStatus(order.status.statusName);

              if (payment.status === "SUCCESS") {
                setMessage("Thanh toán thành công!");
                setTimeout(() => navigate("/"), 3000);
              } else if (payment.status === "FAILED") {
                setMessage("Thanh toán thất bại. Vui lòng thử lại.");
              }
            } else {
              setOrderStatus("Không xác định");
            }
          } catch (orderError) {
            console.error("Error fetching order:", orderError);
            setOrderStatus("Không xác định");
          }
        }
      } catch (error) {
        console.error("Error checking payment status:", error);
        setMessage(
          "Không thể kiểm tra trạng thái thanh toán. Vui lòng thử lại sau."
        );
      }
    };

    const interval = setInterval(checkPaymentStatus, 5000);
    return () => {
      clearInterval(timer);
      clearInterval(interval);
    };
  }, [paymentCode, navigate, expiresAt, dispatch]);

  const handleBack = () => {
    navigate("/payment");
  };

  const handleDone = () => {
    // Lấy thông tin đơn hàng từ lastOrder
    if (lastOrder.orderItems && lastOrder.orderItems.length > 0) {
      try {
        // Lấy cart hiện tại từ localStorage
        const cartData = JSON.parse(localStorage.getItem("cart")) || {
          products: [],
        };

        // Lấy danh sách ID sản phẩm đã mua từ lastOrder
        const purchasedProductIds = lastOrder.orderItems.map(
          (item) => item.product
        );

        // Lọc ra các sản phẩm chưa mua
        const remainingProducts = cartData.products.filter(
          (product) => !purchasedProductIds.includes(product.id)
        );

        // Cập nhật lại cart trong localStorage
        localStorage.setItem(
          "cart",
          JSON.stringify({ products: remainingProducts })
        );

        // Cập nhật Redux store
        purchasedProductIds.forEach((productId) => {
          dispatch(removeFromCart({ id: productId }));
        });

        console.log("Đã xóa sản phẩm đã mua khỏi giỏ hàng");
      } catch (error) {
        console.error("Error updating cart:", error);
      }
    }
    navigate("/");
  };

  return (
    <div className="container-xl">
      <div className="title-row">
        <BackIconComponent handleBack={handleBack} />
        <h2 className="title__content">Thông tin thanh toán</h2>
      </div>
      <div className="container-banking">
        <div className="order-details">
          <h3>Chi tiết đơn hàng</h3>
          {resolvedOrderItems.length > 0 ? (
            resolvedOrderItems.map((item, index) => (
              <div key={index} className="order-item">
                <p>
                  {item.name} x {item.quantity}: {item.total?.toLocaleString()}{" "}
                  VND
                </p>
              </div>
            ))
          ) : (
            <p>Không có sản phẩm nào trong đơn hàng</p>
          )}
          <div className="order-total">
            Tổng tiền:{" "}
            {(
              lastOrder.totalItemPrice + lastOrder.shippingPrice
            )?.toLocaleString() || 0}{" "}
            VND
          </div>
          {timeLeft !== null && (
            <div className="expiry-time">
              <p>
                Thời gian hết hạn QR: {timeLeft === 0 ? "Hết hạn" : timeLeft}
              </p>
            </div>
          )}
        </div>
        <div className="banking-info">
          {paymentStatus === "PENDING" && qrCodeUrl && timeLeft !== 0 ? (
            <div className="item-banking">
              {qrCodeUrl ? (
                <img src={qrCodeUrl} alt="QR Code" />
              ) : (
                <div className="qr-error">
                  <p>Không thể tạo mã QR. Vui lòng thử lại sau.</p>
                </div>
              )}
            </div>
          ) : (
            <div className="payment-message">
              <h3>{message}</h3>
              <p>Trạng thái đơn hàng: {orderStatus || "Không xác định"}</p>
            </div>
          )}
        </div>
      </div>
      <ButtonComponent onClick={handleDone} className="payment-button">
        Đã thanh toán
      </ButtonComponent>
    </div>
  );
};

export default BankingInfoPage;

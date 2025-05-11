import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./PaymentPage.css";
import ButtonComponent from "../../../components/ButtonComponent/ButtonComponent";
import ProductInforCustom from "../../../components/ProductInfor/ProductInforCustom";
import { useSelector, useDispatch } from "react-redux";
import * as PaymentService from "../../../services/PaymentService";
import { createPayment } from "../../../redux/slides/paymentSlide";
import axios from "axios";
import { getDetailsOrder } from "../../../services/OrderService";

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const orderDetails = useSelector((state) => state.order);
  const cart = useSelector((state) => state.cart);

  const lastOrder = orderDetails.orders?.[orderDetails.orders.length - 1] || {};
  const {
    orderItems = [],
    totalPrice,
    shippingAddress,
    paymentMethod,
  } = lastOrder;

  console.log("laddd order", lastOrder);

  const resolvedOrderItems = orderItems.map((item) => {
    const product = cart.products.find((p) => p.id === item.product);
    return {
      ...item,
      img: product?.img || "default_image_url",
      name: product?.title || "Unknown Product",
      price:
        typeof product?.price === "number"
          ? product.price
          : parseFloat((product?.price || "0").replace(/[^0-9.-]+/g, "")) || 0,
    };
  });

  const [paymentType, setPaymentType] = useState("qr");
  const [paymentInfo, setPaymentInfo] = useState({
    userBank: "momo", // Khởi tạo mặc định là momo
    userBankNumber: "",
    phoneNumber: "",
    wallet: "momo",
  });

  const handlePaymentTypeChange = (e) => {
    setPaymentType(e.target.value);
    setPaymentInfo({
      ...paymentInfo,
      userBank: e.target.value === "qr" ? "momo" : "",
      userBankNumber: "",
      wallet: e.target.value === "qr" ? "momo" : "",
    });
  };

  const handleInputChange = (field) => (e) => {
    const value = e.target.value;
    if (field === "phoneNumber" && !/^\d*$/.test(value)) return;
    setPaymentInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handleClickBack = () => {
    navigate("/order-information", { state: { ...location.state } });
  };

  const handleClickPay = async () => {
    if (!lastOrder?.orderId) {
      alert("Không tìm thấy đơn hàng. Vui lòng quay lại và thử lại.");
      return;
    }

    // Kiểm tra xem đơn hàng có tồn tại không
    try {
      const orderCheckResponse = await getDetailsOrder(lastOrder.orderId);
      console.log("orderCheckResponse", orderCheckResponse);

      if (!orderCheckResponse || !orderCheckResponse.data) {
        alert(
          "Đơn hàng không tồn tại hoặc đã bị hủy. Vui lòng quay lại và thử lại."
        );
        return;
      }

      // Kiểm tra trạng thái thanh toán của đơn hàng
      if (orderCheckResponse.data.paymentStatus === "SUCCESS") {
        alert("Đơn hàng này đã được thanh toán trước đó.");
        return;
      }
    } catch (error) {
      console.error("Error checking order:", error);
      alert("Không thể kiểm tra đơn hàng. Vui lòng thử lại sau.");
      return;
    }

    const paymentData = {
      paymentCode: `PAY-${Date.now()}`,
      userBank: paymentInfo.userBank,
      userBankNumber: paymentInfo.userBankNumber,
      paymentMethod: paymentType,
      orderId: lastOrder.orderId,
      totalPrice: lastOrder.totalPrice,
    };

    if (paymentType === "paypal") {
      try {
        const response = await PaymentService.createPayment(paymentData);
        console.log("PayPal response:", response);

        if (response?.status === "OK") {
          window.location.href = response.data.paymentUrl;
        } else {
          alert(
            "Thanh toán PayPal thất bại: " +
              (response.message || "Lỗi không xác định")
          );
        }
      } catch (error) {
        console.error("Error in handleClickPay (PayPal):", error);
        alert("Đã xảy ra lỗi khi gọi PayPal. Vui lòng thử lại.");
      }
    } else if (paymentType === "qr") {
      if (!paymentInfo.userBank) {
        alert("Vui lòng chọn loại ví thanh toán!");
        return;
      }

      if (!paymentInfo.userBankNumber) {
        alert("Vui lòng nhập số điện thoại hoặc số tài khoản!");
        return;
      }

      try {
        const response = await PaymentService.createQrPayment(paymentData);
        console.log("QR response:", response);

        if (response?.status === "OK") {
          navigate("/banking-info", {
            state: {
              qrCodeUrl: response.data.qrCodeUrl,
              paymentCode: response.data.paymentCode,
              expiresAt: response.data.expiresAt,
              adminBankInfo: response.data.adminBankInfo,
            },
          });
        } else {
          alert(
            "Tạo QR thất bại: " + (response.message || "Lỗi không xác định")
          );
        }
      } catch (error) {
        console.error("Error in handleClickPay (QR):", error);
        alert("Đã xảy ra lỗi khi tạo QR. Vui lòng thử lại.");
      }
    }
  };

  return (
    <div className="container-xl">
      <div className="container-xl-pay">
        <div className="PaymentInfor">
          <p className="pThongtin">Thông tin thanh toán</p>
          <div
            className="PaymentTypeHolder"
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "10px 20px",
            }}
          >
            <label>
              <input
                type="radio"
                value="paypal"
                checked={paymentType === "paypal"}
                onChange={handlePaymentTypeChange}
              />
              PayPal
            </label>
            <label>
              <input
                type="radio"
                value="qr"
                checked={paymentType === "qr"}
                onChange={handlePaymentTypeChange}
              />
              Thanh toán QR
            </label>
          </div>

          {paymentType === "qr" && (
            <div className="WalletHolder">
              <select
                className="E-wallet"
                name="Wallet"
                value={paymentInfo.userBank}
                onChange={handleInputChange("userBank")}
                style={{ width: "100%", margin: "10px 0" }}
              >
                <option value="momo">MoMo</option>
                <option value="vnpay">VNPay</option>
                <option value="techcombank">Techcombank</option>
              </select>
              <div className="inputSdt">
                <input
                  type="text"
                  className="input2"
                  placeholder={
                    paymentInfo.userBank === "momo"
                      ? "Nhập số điện thoại MoMo"
                      : "Nhập số tài khoản ngân hàng"
                  }
                  value={paymentInfo.userBankNumber}
                  onChange={handleInputChange("userBankNumber")}
                  style={{ width: "100%" }}
                />
              </div>
            </div>
          )}

          <div className="Button-area-pay">
            <div className="button1">
              <ButtonComponent onClick={handleClickBack}>
                Quay lại
              </ButtonComponent>
            </div>
            <div className="button2">
              <ButtonComponent className="customBtn2" onClick={handleClickPay}>
                Thanh toán
              </ButtonComponent>
            </div>
          </div>
        </div>

        <div className="final-order">
          {resolvedOrderItems.length > 0 ? (
            resolvedOrderItems.map((product, index) => (
              <ProductInforCustom
                key={index}
                image={product.img}
                name={product.name}
                price={(product.price || 0).toLocaleString() + " VND"}
                quantity={product.quantity}
              />
            ))
          ) : (
            <p>Không có sản phẩm nào trong đơn hàng</p>
          )}
          <div className="footerAreaPayment">
            <div className="tamtinh" style={{ marginBottom: "10px" }}>
              <label style={{ paddingLeft: "10px" }}>Tạm tính:</label>
              <p className="tamtinh2">
                {lastOrder.totalItemPrice?.toLocaleString() || 0} VND
              </p>
            </div>
            <div className="tamtinhVanChuyen">
              <label style={{ paddingLeft: "10px" }}>
                Tổng tiền (gồm phí vận chuyển):
              </label>
              <p className="tamtinhVanChuyen2">
                {(
                  lastOrder.totalItemPrice + lastOrder.shippingPrice
                )?.toLocaleString() || 0}{" "}
                VND
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;

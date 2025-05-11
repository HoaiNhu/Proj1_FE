// import React, { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { QRCodeCanvas } from "qrcode.react";
// import "./BankingInfoPage.css";
// import BackIconComponent from "../../../components/BackIconComponent/BackIconComponent";
// import ButtonComponent from "../../../components/ButtonComponent/ButtonComponent";
// import { useSelector } from "react-redux";

// const BankingInfoPage = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { qrCodeUrl, paymentCode, expiresAt, adminBankInfo } =
//     location.state || {};
//   const [paymentStatus, setPaymentStatus] = useState("PENDING");
//   const [orderStatus, setOrderStatus] = useState("");
//   const [message, setMessage] = useState("");
//   const [timeLeft, setTimeLeft] = useState(null);
//   const orderDetails = useSelector((state) => state.order);
//   const lastOrder = orderDetails.orders?.[orderDetails.orders.length - 1] || {};

//   const resolvedOrderItems =
//     lastOrder.orderItems?.map((item) => {
//       return {
//         ...item,
//         name: item.productName || "Sản phẩm",
//         price: item.total / item.quantity,
//       };
//     }) || [];

//   useEffect(() => {
//     if (!paymentCode) {
//       setMessage("Không tìm thấy mã thanh toán.");
//       return;
//     }

//     // Log để kiểm tra qrCodeUrl
//     console.log("Received qrCodeUrl:", qrCodeUrl);

//     // Tính thời gian còn lại
//     const calculateTimeLeft = () => {
//       const now = new Date();
//       const expiry = new Date(expiresAt);
//       const diff = expiry - now;
//       if (diff <= 0) {
//         setTimeLeft(0);
//         setMessage("QR đã hết hạn.");
//         return;
//       }
//       const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
//       const seconds = Math.floor((diff % (1000 * 60)) / 1000);
//       setTimeLeft(`${minutes} phút ${seconds} giây`);
//     };

//     const timer = setInterval(calculateTimeLeft, 1000);

//     const checkPaymentStatus = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:3001/api/payment/get-detail-payment/${paymentCode}`
//         );
//         if (response.data.status === "OK") {
//           const payment = response.data.data;
//           setPaymentStatus(payment.status);

//           try {
//             const orderResponse = await axios.get(
//               `http://localhost:3001/api/order/get-detail-order/${payment.orderId}`
//             );
//             if (orderResponse.data.status === "OK") {
//               const order = orderResponse.data.data;
//               setOrderStatus(order.status.statusName);
//             } else {
//               setOrderStatus("Không xác định");
//             }
//           } catch (orderError) {
//             console.error("Error fetching order:", orderError);
//             setOrderStatus("Không xác định");
//           }

//           if (payment.status === "SUCCESS") {
//             setMessage("Thanh toán thành công!");
//             setTimeout(() => navigate("/"), 3000);
//           } else if (payment.status === "FAILED") {
//             setMessage("Thanh toán thất bại. Vui lòng thử lại.");
//           }
//         }
//       } catch (error) {
//         console.error("Error checking payment status:", error);
//         setMessage(
//           "Không thể kiểm tra trạng thái thanh toán. Vui lòng thử lại sau."
//         );
//       }
//     };

//     const interval = setInterval(checkPaymentStatus, 5000);
//     return () => {
//       clearInterval(timer);
//       clearInterval(interval);
//     };
//   }, [paymentCode, navigate, expiresAt]);

//   const handleBack = () => {
//     navigate("/payment");
//   };

//   const handleDone = () => {
//     navigate("/");
//   };

//   return (
//     <div className="container-xl">
//       <div className="title-row">
//         <BackIconComponent handleBack={handleBack} />
//         <h2 className="title__content">Thông tin thanh toán</h2>
//       </div>
//       <div className="container-banking" style={{ display: "flex" }}>
//         <div style={{ flex: 1, paddingRight: "20px" }}>
//           <h3>Chi tiết đơn hàng</h3>
//           {resolvedOrderItems.length > 0 ? (
//             resolvedOrderItems.map((item, index) => (
//               <div key={index} style={{ marginBottom: "10px" }}>
//                 <p>
//                   {item.name} x {item.quantity}: {item.total?.toLocaleString()}{" "}
//                   VND
//                 </p>
//               </div>
//             ))
//           ) : (
//             <p>Không có sản phẩm nào trong đơn hàng</p>
//           )}
//           <p>
//             Tổng tiền:{" "}
//             {(
//               lastOrder.totalItemPrice + lastOrder.shippingPrice
//             )?.toLocaleString() || 0}{" "}
//             VND
//           </p>
//           {timeLeft !== null && (
//             <p>Thời gian hết hạn QR: {timeLeft === 0 ? "Hết hạn" : timeLeft}</p>
//           )}
//         </div>
//         <div style={{ flex: 1 }}>
//           {paymentStatus === "PENDING" && qrCodeUrl && timeLeft !== 0 ? (
//             <div className="banking-info">
//               <section className="item-banking">
//                 {qrCodeUrl ? (
//                   <QRCodeCanvas value={qrCodeUrl} size={256} />
//                 ) : (
//                   <div className="qr-error">
//                     <p>Không thể tạo mã QR. Vui lòng thử lại sau.</p>
//                   </div>
//                 )}
//                 <div className="qr-info d-flex flex-column align-items-center">
//                   <label>Quét mã QR để thanh toán</label>
//                   <label>Mã đơn hàng: {paymentCode}</label>
//                   {adminBankInfo && (
//                     <>
//                       <label>Ngân hàng: {adminBankInfo.bank}</label>
//                       <label>Số tài khoản: {adminBankInfo.accountNumber}</label>
//                       <label>Chủ tài khoản: {adminBankInfo.accountName}</label>
//                     </>
//                   )}
//                   <label>
//                     Số tiền:{" "}
//                     {(
//                       lastOrder.totalItemPrice + lastOrder.shippingPrice
//                     )?.toLocaleString() || 0}{" "}
//                     VND
//                   </label>
//                 </div>
//               </section>
//             </div>
//           ) : (
//             <div className="payment-message">
//               <h3>{message}</h3>
//               <p>Trạng thái đơn hàng: {orderStatus || "Không xác định"}</p>
//             </div>
//           )}
//         </div>
//       </div>
//       <ButtonComponent
//         onClick={handleDone}
//         style={{ width: "50%", margin: "30px auto" }}
//       >
//         Đã thanh toán
//       </ButtonComponent>
//     </div>
//   );
// };

// export default BankingInfoPage;

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./BankingInfoPage.css";
import BackIconComponent from "../../../components/BackIconComponent/BackIconComponent";
import ButtonComponent from "../../../components/ButtonComponent/ButtonComponent";
import { useSelector } from "react-redux";

const BankingInfoPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { qrCodeUrl, paymentCode, expiresAt, adminBankInfo } =
    location.state || {};
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
            } else {
              setOrderStatus("Không xác định");
            }
          } catch (orderError) {
            console.error("Error fetching order:", orderError);
            setOrderStatus("Không xác định");
          }

          if (payment.status === "SUCCESS") {
            setMessage("Thanh toán thành công!");
            setTimeout(() => navigate("/"), 3000);
          } else if (payment.status === "FAILED") {
            setMessage("Thanh toán thất bại. Vui lòng thử lại.");
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
  }, [paymentCode, navigate, expiresAt]);

  const handleBack = () => {
    navigate("/payment");
  };

  const handleDone = () => {
    navigate("/");
  };

  return (
    <div className="container-xl">
      <div className="title-row">
        <BackIconComponent handleBack={handleBack} />
        <h2 className="title__content">Thông tin thanh toán</h2>
      </div>
      <div className="container-banking" style={{ display: "flex" }}>
        <div style={{ flex: 1, paddingRight: "20px" }}>
          <h3>Chi tiết đơn hàng</h3>
          {resolvedOrderItems.length > 0 ? (
            resolvedOrderItems.map((item, index) => (
              <div key={index} style={{ marginBottom: "10px" }}>
                <p>
                  {item.name} x {item.quantity}: {item.total?.toLocaleString()}{" "}
                  VND
                </p>
              </div>
            ))
          ) : (
            <p>Không có sản phẩm nào trong đơn hàng</p>
          )}
          <p>
            Tổng tiền:{" "}
            {(
              lastOrder.totalItemPrice + lastOrder.shippingPrice
            )?.toLocaleString() || 0}{" "}
            VND
          </p>
          {timeLeft !== null && (
            <p>Thời gian hết hạn QR: {timeLeft === 0 ? "Hết hạn" : timeLeft}</p>
          )}
        </div>
        <div style={{ flex: 1 }}>
          {paymentStatus === "PENDING" && qrCodeUrl && timeLeft !== 0 ? (
            <div className="banking-info">
              <section className="item-banking">
                {qrCodeUrl ? (
                  <img
                    src={qrCodeUrl}
                    alt="QR Code"
                    style={{ width: 300, height: "auto" }}
                  />
                ) : (
                  <div className="qr-error">
                    <p>Không thể tạo mã QR. Vui lòng thử lại sau.</p>
                  </div>
                )}
                {/* <div className="qr-info d-flex flex-column align-items-center">
                  <label>Quét mã QR để thanh toán</label>
                  <label>Mã đơn hàng: {paymentCode}</label>
                  {adminBankInfo && (
                    <>
                      <label>Ngân hàng: {adminBankInfo.bank}</label>
                      <label>Số tài khoản: {adminBankInfo.accountNumber}</label>
                      <label>Chủ tài khoản: {adminBankInfo.accountName}</label>
                    </>
                  )}
                  <label>
                    Số tiền:{" "}
                    {(
                      lastOrder.totalItemPrice + lastOrder.shippingPrice
                    )?.toLocaleString() || 0}{" "}
                    VND
                  </label>
                </div> */}
              </section>
            </div>
          ) : (
            <div className="payment-message">
              <h3>{message}</h3>
              <p>Trạng thái đơn hàng: {orderStatus || "Không xác định"}</p>
            </div>
          )}
        </div>
      </div>
      <ButtonComponent
        onClick={handleDone}
        style={{ width: "50%", margin: "30px auto" }}
      >
        Đã thanh toán
      </ButtonComponent>
    </div>
  );
};

export default BankingInfoPage;

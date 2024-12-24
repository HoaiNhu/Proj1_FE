import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./PaymentPage.css";
import imageProduct from "../../../assets/img/hero_3.jpg";
import ButtonComponent from "../../../components/ButtonComponent/ButtonComponent";
import ProductInforCustom from "../../../components/ProductInfor/ProductInforCustom";

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderItems, totalPrice, shippingPrice } = location.state || {};
  console.log("orderItems", orderItems);
  console.log("totalPrice", totalPrice);
  console.log("shippingPrice", shippingPrice);

  const [paymentInfo, setPaymentInfo] = useState({
    userBank: "",
    userBankNumber: "",
    phoneNumber: "",
  });

  const handleInputChange = (field) => (e) => {
    const value = e.target.value;
    if (field === "phoneNumber" && !/^\d*$/.test(value)) return;
    setPaymentInfo((prev) => ({ ...prev, [field]: value }));
  };

  const [value, setValue] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const handleChange1 = (e) => {
    const value2 = e.target.value;
    // Kiểm tra chỉ nhập số và không vượt quá 10 ký tự
    if (/^\d{0,10}$/.test(value2)) {
      setPhoneNumber(value2);
      setError("");
    }
  };
  const handleChange2 = (e) => {
    const inputValue = e.target.value;

    // Chỉ cho phép nhập các ký tự số
    if (/^\d*$/.test(inputValue)) {
      setValue(inputValue);
    }
  };

  const handleBlur = () => {
    // Kiểm tra độ dài chính xác là 10 số
    if (phoneNumber.length !== 10) {
      setError("Số điện thoại phải bao gồm đúng 10 số.");
    } else {
      setError(""); // Xóa lỗi nếu nhập đúng
    }
  };
  //Su kien click
  const handleClickBack = () => {
    navigate("/order-information");
  };

  const handleClickPay = () => {
    navigate("/");
    alert("Đặt hàng thành công!!!");
  };

  return (
    <div className="container-xl">
      <div className="container-xl-pay">
        {/* =========================THONG TIN THANH TOAN=========================        */}
        <div className="PaymentInfor">
          <p className="pThongtin">Thông tin thanh toán</p>
          {/* ==========Ngan hang-Vi dien tu========= */}
          <div className="PayHolder">
            <div className="BankHolder">
              <select
                className="Bank"
                name="Bank"
                value={paymentInfo.userBank}
                onChange={handleInputChange("userBank")}
              >
                <option value="" disabled selected>
                  Chọn ngân hàng
                </option>
                <option value="vietcombank">Vietcombank</option>
                <option value="techcombank">Techcombank</option>
              </select>
            </div>
            <div className="E-walletHolder">
              <select className="E-wallet" name="E-wallet">
                <option value="" disabled selected>
                  Chọn ví điện tử
                </option>
                <option value={"Momo"}>Momo</option>
                <option value={"Zalo Pay"}>Zalo Pay</option>
              </select>
            </div>
          </div>
          {/* ===========So tai khoan- So dien thoai======== */}
          <div className="inputH1">
            <div className="inputStk">
              <input
                type="text"
                className="input1"
                placeholder="Nhập số tài khoản"
                // onChange={handleChange2}
                // value={value}
                value={paymentInfo.userBankNumber}
                onChange={handleInputChange("userBankNumber")}
              ></input>
            </div>

            <div className="inputSdt">
              <span>
                <input
                  type="text"
                  className="input2"
                  placeholder="Nhập số điện thoại"
                  onBlur={handleBlur}
                  //   onChange={handleChange1}
                  //   value={phoneNumber}
                  value={paymentInfo.phoneNumber}
                  onChange={handleInputChange("phoneNumber")}
                ></input>
              </span>
              <span style={{ color: "red", fontSize: "12px" }}>{error}</span>
            </div>
          </div>
          {/* ==================Button=========== */}
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

        {/* ======================= THONG TIN DON HANG (CO PHI VAN CHUYEN)===============       */}
        <div className="final-order">
          {orderItems?.map((product, index) => (
            <ProductInforCustom
              key={index}
              image={product.img}
              name={product.title}
            //   size={product.size || "N/A"}
              price={product.price}
              quantity={product.quantity}
            />
          ))}

          {/* ===============TIEN CAN THANH TOAN============   */}
          <div className="footerAreaPayment">
            <div className="tamtinh">
              <p className="tamtinh1">Tạm tính:</p>
              <p className="tamtinh2">{totalPrice.toLocaleString()} VND</p>
            </div>
            <div className="tamtinhVanChuyen">
              <p className="tamtinhVanChuyen1">
                Tổng tiền (gồm phí vận chuyển):
              </p>
              <p className="tamtinhVanChuyen2">
                {(totalPrice + shippingPrice).toLocaleString()} VND
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;

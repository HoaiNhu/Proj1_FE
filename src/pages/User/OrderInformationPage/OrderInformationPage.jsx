import React, { useEffect, useState } from "react";
import ProductInfor from "../../../components/ProductInfor/ProductInfor";
import imageProduct from "../../../assets/img/hero_3.jpg";
import "./OrderInformation.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ButtonComponent from "../../../components/ButtonComponent/ButtonComponent";
import BackIconComponent from "../../../components/BackIconComponent/BackIconComponent";
import FormComponent from "../../../components/FormComponent/FormComponent";
import { useDispatch, useSelector } from "react-redux";
import { useMutationHook } from "../../../hooks/useMutationHook";
import * as OrderService from "../../../services/OrderService";

const OrderInformationPage = () => {
  const location = useLocation();
  const selectedProducts = location.state?.selectedProductDetails || [];
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const mutation = useMutationHook((data) => OrderService.createOrder(data));
  const shippingPrice = 30000; // Phí vận chuyển cố định

  const user = useSelector((state) => state.user); // Lấy thông tin user từ Redux
  const isLoggedIn = !!user?.userEmail;

  const handleClickBack = () => {
    navigate("/cart");
  };
  const handleClickNext = () => {
    // Kiểm tra thông tin giao hàng
    // if (
    //   !shippingAddress.family ||
    //   !shippingAddress.name ||
    //   !shippingAddress.phone
    // ) {
    //   alert("Vui lòng điền đầy đủ thông tin giao hàng.");
    //   return;
    // }

    // Điều hướng đến trang thanh toán
    navigate("/payment", {
      state: {
        orderItems: selectedProducts,
        shippingAddress,
        paymentMethod: "Online Payment", // Phương thức thanh toán mặc định
        totalItemPrice,
        shippingPrice,
        totalPrice,
      },
    });
    mutation.mutate(shippingAddress, user, selectedProducts);
  };

  const [shippingAddress, setShippingAddress] = useState({
    family: "",
    name: "",
    address: "",
    ward: "",
    district: "",
    city: "",
    phone: "",
    note: "",
  });
  console.log("selectedProducts", selectedProducts);
  console.log("user", user);
  console.log("shippingAddress", shippingAddress);

  // Tổng tiền hàng
  const totalItemPrice = selectedProducts.reduce(
    (acc, product) =>
      acc +
      parseFloat(product.price.replace(/[^0-9.-]+/g, "")) * product.quantity,
    0
  );

  const totalPrice = totalItemPrice + shippingPrice; // Tổng thanh toán

  useEffect(() => {
    if (isLoggedIn) {
      setShippingAddress((prev) => ({
        ...prev,
        family: user.familyName || "",
        name: user.userName || "",
        address: user.userAddress || "",
        phone: user.userPhone || "",
      }));
    }
  }, [isLoggedIn, user]);

  const handleInputChange = (field) => (e) => {
    const value = e.target.value;
    if (typeof value === "string" && value.trim().length >= 0) {
      setShippingAddress((prev) => ({ ...prev, [field]: value }));
    }
  };

  return (
    <div className="container-xl cart-container">
      <div className="titleHolder">
        <div>
          <BackIconComponent className="back_btn" onClick={handleClickBack} />
        </div>
        <div>
          <h1 className="title"> Thông tin đơn hàng</h1>
        </div>
      </div>
      <div className="product_area">
        <table>
          <thead>
            <tr className="HeaderHolder">
              <th className="ProductInforHear">Thông tin sản phẩm</th>
              <th className="PriceHeader">Đơn giá</th>
              <th className="QuantityHeader">Số lượng</th>
              <th className="MoneyHeader">Thành tiền</th>
            </tr>
          </thead>
          <tbody>
            {selectedProducts.map((product) => (
              <tr key={product.id} className="LineProduct">
                <td className="ProductInfor">
                  <ProductInfor
                    image={product.img}
                    name={product.title}
                    size={product.size || "N/A"}
                  />
                </td>
                <td className="PriceProduct">{product.price}</td>
                <td className="QuantityBtn">x {product.quantity}</td>
                <td className="Money">
                  <p className="MoneyProduct">
                    {(
                      parseFloat(product.price.replace(/[^0-9.-]+/g, "")) *
                      product.quantity
                    ).toLocaleString()}{" "}
                    VND
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="LineProduct">
              <td colSpan="3">Phí vận chuyển:</td>
              <td>{shippingPrice.toLocaleString()} VND</td>
            </tr>
            <tr
              className="total-price d-flex align-items-center justify-content-between"
              style={{ padding: "20px" }}
            >
              <td
                colSpan="3"
                className="text-end"
                style={{ fontWeight: "bold", fontSize: "2rem" }}
              >
                Tổng tiền:
              </td>
              <td
                className="text-end"
                style={{ fontWeight: "bold", fontSize: "2rem" }}
              >
                {totalPrice.toLocaleString()} VND
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
      <div className="question" style={{ margin: "10px 50px" }}>
        <p className="login-question">
          Bạn đã có tài khoản?{" "}
          <Link to="./login" target="_blank" className="login-link">
            Đăng nhập
          </Link>
        </p>
      </div>

      <div>
        {/* =====Dia chi giao hang===== */}
        <div className="shipping-info">
          <div className="input-name">
            <div
              style={{
                display: "flex",
                padding: "10px 50px",
                justifyContent: "space-between",
              }}
            >
              <div>
                <h2>Họ</h2>
                <FormComponent
                  className="input-familyName"
                  name="family"
                  type="text"
                  placeholder="Nhập họ"
                  value={shippingAddress.family || user.familyName}
                  onChange={handleInputChange("family")}
                ></FormComponent>
              </div>
              <div>
                <h2>Tên</h2>
                <FormComponent
                  className="input-name"
                  type="text"
                  placeholder="Nhập tên"
                  value={shippingAddress.name || user.userName}
                  onChange={handleInputChange("name")}
                ></FormComponent>
              </div>
            </div>
          </div>
          <div className="input-phone-email">
            <div
              style={{
                display: "flex",
                padding: "10px 50px",
                justifyContent: "space-between",
              }}
            >
              <div>
                <h2>Số điện thoại</h2>
                <FormComponent
                  className="input-phone"
                  type="text"
                  placeholder="Nhập số điện thoại"
                  value={shippingAddress.phone || user.userPhone}
                  onChange={handleInputChange("phone")}
                ></FormComponent>
              </div>
              <div>
                <h2>Email</h2>
                <FormComponent
                  className="input-email"
                  type="text"
                  placeholder="Nhập email"
                  value={shippingAddress.email || user.userEmail}
                  onChange={handleInputChange("address")}
                ></FormComponent>
              </div>
            </div>
          </div>
          <div className="address" style={{ padding: "10px 50px" }}>
            <h2>Địa chỉ</h2>
            <FormComponent
              // className="input-address"
              type="text"
              placeholder="Nhập địa chỉ giao hàng: Số nhà, hẻm, đường,..."
              style={{ width: "100%" }}
              value={shippingAddress.address || user.userAddress}
              onChange={handleInputChange("address")}
            ></FormComponent>
          </div>
          <div className="comboBoxHolder">
            <div className="ProvinceHolder">
              <select className="Province" name="Province">
                <option value="" disabled selected>
                  Chọn tỉnh
                </option>
                <option value={"Bến Tre"}>Bến Tre</option>
                <option value={"Tiền Giang"}>Tiền Giang</option>
              </select>
            </div>
            <div className="DistrictHolder">
              <select className="District" name="District">
                <option value="" disabled selected>
                  Chọn quận/huyện
                </option>
                <option value={"Bến Tre"}>Bến Tre</option>
                <option value={"Tiền Giang"}>Tiền Giang</option>
              </select>
            </div>
            <div className="VillageHolder">
              <select className="Village" name="Village">
                <option value="" disabled selected>
                  Chọn phường/xã
                </option>
                <option value={"Bến Tre"}>Bến Tre</option>
                <option value={"Tiền Giang"}>Tiền Giang</option>
              </select>
            </div>
          </div>
        </div>

        {/* =====Thoi gian giao hang==== */}
        <div className="DeliveryTimeHolder">
          <p className="ThoiGian">Thời gian giao hàng dự kiến:</p>
          <div className="d-flex" style={{ gap: "50px", margin: "20px 0" }}>
            <div>
              <h3>Chọn giờ:</h3>
              <input type="time" className="clock"></input>
            </div>
            <div>
              <h3>Chọn ngày:</h3>
              <input type="date" id="datePicker" className="Datepicker" />
            </div>
          </div>
        </div>
        {/* ============Ghi chu don hang======== */}
        <div className="Note" style={{ margin: "50px 50px" }}>
          <div>
            <h2>Ghi chú đơn hàng:</h2>
            <div>
              <textarea
                rows="5"
                cols="50"
                placeholder="Nhập ghi chú đơn hàng....."
                className="inputNote"
                value={shippingAddress.note}
                onChange={handleInputChange("note")}
              ></textarea>
            </div>
          </div>
        </div>

        {/* ================= Button======== */}
        <div className="Button-area">
          <button className="chinhsachBtn">
            <a href="/chinhsach" target="_blank" className="chinhsach">
              Chính sách đơn hàng
            </a>
          </button>
          <div className="Btn_holder">
            <div>
              <ButtonComponent onClick={handleClickBack}>
                Giỏ hàng
              </ButtonComponent>
            </div>
            <ButtonComponent className="Next_btn" onClick={handleClickNext}>
              Tiếp theo
            </ButtonComponent>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderInformationPage;

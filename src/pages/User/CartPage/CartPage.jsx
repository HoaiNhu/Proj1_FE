import React from "react";
import "./CartPage.css";
import ButtonComponent from "../../../components/ButtonComponent/ButtonComponent";
import { useNavigate } from "react-router-dom";
import ProductInfor from "../../../components/ProductInfor/ProductInfor";
import imageProduct from "../../../assets/img/hero_3.jpg";
import QuantityBtn from "../../../components/QuantityBtn/QuantityBtn";
import DeleteBtn from "../../../components/DeleteBtn/DeleteBtn";
import CheckboxComponent from "../../../components/CheckboxComponent/CheckboxComponent";
import BackIconComponent from "../../../components/BackIconComponent/BackIconComponent";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart,
  updateQuantity,
} from "../../../redux/slides/cartSlide";
const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleNavigate = (path) => {
    navigate(path);
  };

  const products = useSelector((state) => state.cart.products);
  // console.log("products", products);

  const calculatePrice = (price) => {
    return parseFloat(price.replace(/[^0-9.-]+/g, ""));
  };

  const totalAmount = products.reduce((acc, product) => {
    return acc + calculatePrice(product.price) * product.quantity;
  }, 0);

  //   const totalAmount = products.reduce((acc, product) => acc + product.price, 0);
  // const calculateTotal = () => {
  //   return products.reduce((total, product) => {
  //     const quantity = product.quantity || 1; // Default to 1 if quantity is missing
  //     // console.log("quantity", quantity);
  //     const price = parseFloat(
  //       product.price.toString().replace(/[^\d.-]/g, "")
  //     ); // Remove 'VND' or other non-numeric chars
  //     return total + price * quantity;
  //   }, 0);
  // };

  // const totalAmount = calculateTotal();

  //   const isSelected = (products.title) => selectedRows.includes(statusCode);

  //   const toggleSelectRow = (statusCode) => {
  //     setSelectedRows((prev) =>
  //       prev.includes(statusCode)
  //         ? prev.filter((code) => code !== statusCode)
  //         : [...prev, statusCode]
  //     );
  //   };

  //   const toggleSelectAll = () => {
  //     setSelectedRows(
  //       selectedRows.length === status.length
  //         ? []
  //         : status.map((item) => item.statusCode)
  //     );
  //   };

  // Hàm xử lý xóa sản phẩm
  const handleRemoveProduct = (productId) => {
    dispatch(removeFromCart({ id: productId }));
  };

  return (
    <div className="container-xl cart-container">
      <div className="titleHolderCart">
        <button
          className="back_btn"
          onClick={() => handleNavigate("/products")}
        >
          <BackIconComponent />
        </button>
        <h1 className="titleCart">Giỏ hàng</h1>
      </div>

      <div className="product_area">
        <table>
          <thead>
            <tr className="HeaderHolder">
              <th>
                <CheckboxComponent />
              </th>
              <th className="ProductInforHear">Thông tin sản phẩm</th>
              <th className="PriceHeader">Đơn giá</th>
              <th className="QuantityHeader">Số lượng</th>
              <th className="MoneyHeader">Thành tiền</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="LineProduct">
                <td>
                  <CheckboxComponent />
                </td>
                <td className="ProductInfor">
                  <ProductInfor
                    image={product.img}
                    name={product.title}
                    size={product.size}
                  />
                </td>
                <td className="PriceProduct">
                  <p className="Price">{product.price}</p>
                </td>
                <td className="QuantityBtn">
                  <QuantityBtn
                    initialQuantity={product.quantity}
                    productId={product.id}
                  />
                </td>
                <td className="Money">
                  <p className="MoneyProduct">
                    {(
                      calculatePrice(product.price) * product.quantity
                    ).toLocaleString()}{" "}
                    VND
                  </p>
                </td>
                <td className="DeleteBtn">
                  <DeleteBtn onClick={() => handleRemoveProduct(product.id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="Btnarea">
          <div className="total-holder">
            <p className="tong">Tổng tiền:</p>
            <p className="total">{totalAmount.toLocaleString()} VND</p>
          </div>
          <div className="Btnholder">
            <button
              className="Buy_more"
              onClick={() => handleNavigate("/products")}
            >
              Mua thêm
            </button>
            <ButtonComponent
              className="Buy_btn"
              onClick={() => handleNavigate("/order-information")}
            >
              Mua ngay
            </ButtonComponent>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;

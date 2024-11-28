import React from "react";
import { useNavigate } from "react-router-dom";

const ViewProductDetailPage = () => {
  const navigate = useNavigate();

  // Dữ liệu sản phẩm mẫu
  const product = {
    id: 1,
    productName: "Green Tea Flour Love",
    productPrice: "250,000 vnd",
    productSize: "20cm",
    productCategory: "Bánh ngọt",
    productImage: "https://via.placeholder.com/150",
    productDescription: "Bánh ngọt với bột trà xanh đặc biệt",
  };

  const handleEdit = () => {
    navigate("/update-product", { state: product }); // Chuyển đến trang cập nhật sản phẩm và truyền dữ liệu
  };

  return (
    <div>
      <h1>Chi tiết sản phẩm</h1>
      <p>Tên sản phẩm: {product.productName}</p>
      <p>Giá: {product.productPrice}</p>
      <p>Kích thước: {product.productSize}</p>
      <p>Loại: {product.productCategory}</p>
      <img src={product.productImage} alt="Product" />
      <p>{product.productDescription}</p>
      <button onClick={handleEdit}>Sửa sản phẩm</button>
    </div>
  );
};

export default ViewProductDetailPage;

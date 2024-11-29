import React from "react";
import "./ProductRowComponent.css";

const ProductRowComponent = ({ product }) => {
  const totalPrice = parseInt(product.price) * parseInt(product.quantity); // Thành tiền
  return (
    <div className="product-row d-flex align-items-center">
      <img src={product.image} alt={product.name} className="product-image" />
      <div className="product-name">{product.name}</div>
      <div className="product-size">{product.size}</div>
      <div className="product-price">{product.price} vnd</div>
      <div className="product-quantity">x{product.quantity}</div>
      <div className="product-total">{totalPrice.toLocaleString()} vnd</div>
    </div>
  );
};

export default ProductRowComponent;

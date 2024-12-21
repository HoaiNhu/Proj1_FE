import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./UpdateProductPage.css";
import FormComponent from "../../../../components/FormComponent/FormComponent";
import DropdownComponent from "../../../../components/DropdownComponent/DropdownComponent";
import ButtonComponent from "../../../../components/ButtonComponent/ButtonComponent";
import SizeComponent from "../../../../components/SizeComponent/SizeComponent";

const UpdateProductPage = () => {
  const { state: productData } = useLocation(); // Nhận dữ liệu từ `state`
  const [product, setProduct] = useState(
    productData || {
      productName: "",
      productPrice: "",
      productSize: "",
      productCategory: "",
      productImage: null,
      productDescription: "",
    }
  );

  const [imagePreview, setImagePreview] = useState(
    product.productImage || null
  );

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewURL = URL.createObjectURL(file); // Tạo URL tạm để hiển thị hình
      setImagePreview(previewURL);
      setProduct({ ...product, productImage: file });
    }
  };

  const handleEditImage = () => {
    document.getElementById("imageInput").click(); // Kích hoạt input chọn file
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Product data:", product);
    // Thực hiện logic gửi sản phẩm (ví dụ: gọi API)
  };

  return (
    <div>
      <div className="container-xl update-product">
        <h1 className="update-product__title">Cập nhật sản phẩm</h1>

        {/* update information */}
        <div className="update-product__information">
          {/* info top */}
          <div className="info__top">
            {/* infor left */}
            <div className="info__left">
              <div className="product__image-container">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Product Preview"
                    className="product__image-preview"
                  />
                ) : (
                  <div className="product__image-placeholder">
                    Chọn hình ảnh
                  </div>
                )}
                <input
                  id="imageInput"
                  className="product__image"
                  type="file"
                  onChange={handleImageChange}
                  accept="image/*"
                  style={{ display: "none" }}
                />
                <div className="icon__update-image" onClick={handleEditImage}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                  >
                    <path
                      d="M17.575 11.275L18.725 12.425L7.4 23.75H6.25V22.6L17.575 11.275ZM22.075 3.75C21.7625 3.75 21.4375 3.875 21.2 4.1125L18.9125 6.4L23.6 11.0875L25.8875 8.8C26.0034 8.68436 26.0953 8.547 26.158 8.39578C26.2208 8.24456 26.2531 8.08246 26.2531 7.91875C26.2531 7.75504 26.2208 7.59294 26.158 7.44172C26.0953 7.2905 26.0034 7.15314 25.8875 7.0375L22.9625 4.1125C22.7125 3.8625 22.4 3.75 22.075 3.75ZM17.575 7.7375L3.75 21.5625V26.25H8.4375L22.2625 12.425L17.575 7.7375Z"
                      fill="#3A060E"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* info right */}
            <div className="info__right">
              <div className="col product-name">
                <label className="label-name">Tên sản phẩm</label>
                <FormComponent
                  value={product.productName}
                  onChange={(e) =>
                    setProduct({ ...product, productName: e.target.value })
                  }
                ></FormComponent>
              </div>

              <div className="product-price">
                <label className="label-price">Giá sản phẩm</label>
                <FormComponent
                  value={product.productPrice}
                  onChange={(e) =>
                    setProduct({ ...product, productPrice: e.target.value })
                  }
                ></FormComponent>
              </div>

              <div className="product-category">
                <label className="label-category">Loại sản phẩm</label>
                <DropdownComponent
                  value={product.productCategory}
                  onChange={(value) =>
                    setProduct({ ...product, productCategory: value })
                  }
                  style={{
                    width: "44rem",
                    height: "4.4rem",
                    borderRadius: "50px",
                  }}
                ></DropdownComponent>
              </div>

              <div className="product-size">
                <label className="label-size">Kích thước sản phẩm</label>
                <div className="item__size">
                  <SizeComponent
                    isSelected={product.productSize === "15cm"}
                    onClick={() =>
                      setProduct({ ...product, productSize: "15cm" })
                    }
                  >
                    15cm
                  </SizeComponent>
                  <SizeComponent
                    isSelected={product.productSize === "20cm"}
                    onClick={() =>
                      setProduct({ ...product, productSize: "20cm" })
                    }
                  >
                    20cm
                  </SizeComponent>
                  <SizeComponent
                    isSelected={product.productSize === "25cm"}
                    onClick={() =>
                      setProduct({ ...product, productSize: "25cm" })
                    }
                  >
                    25cm
                  </SizeComponent>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M26.25 15C26.25 21.2132 21.2132 26.25 15 26.25C8.7868 26.25 3.75 21.2132 3.75 15C3.75 8.7868 8.7868 3.75 15 3.75C21.2132 3.75 26.25 8.7868 26.25 15ZM15 22.25C14.4477 22.25 14 21.8023 14 21.25V16H8.75C8.19772 16 7.75 15.5523 7.75 15C7.75 14.4477 8.19772 14 8.75 14H14V8.75C14 8.19772 14.4477 7.75 15 7.75C15.5523 7.75 16 8.19772 16 8.75V14H21.25C21.8023 14 22.25 14.4477 22.25 15C22.25 15.5523 21.8023 16 21.25 16H16V21.25C16 21.8023 15.5523 22.25 15 22.25Z"
                      fill="#3A060E"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          {/* info bot */}
          <div className="info__bot">
            <label className="label-description">Mô Tả</label>
            <textarea
              className="product-description"
              value={product.productDescription}
              onChange={(e) =>
                setProduct({ ...product, productDescription: e.target.value })
              }
              placeholder="Nhập mô tả sản phẩm"
              required
            />
          </div>
        </div>
        {/* submit */}
        <div className="btn-submit">
          <ButtonComponent onClick={handleSubmit}>Lưu</ButtonComponent>
          <ButtonComponent>Xóa</ButtonComponent>
          <ButtonComponent>Thoát</ButtonComponent>
        </div>
      </div>
    </div>
  );
};

export default UpdateProductPage;

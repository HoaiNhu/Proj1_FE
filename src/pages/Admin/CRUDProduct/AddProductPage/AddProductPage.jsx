import React, { useState, useEffect } from "react";
import "./AddProductPage.css";
import FormComponent from "../../../../components/FormComponent/FormComponent";
import ButtonComponent from "../../../../components/ButtonComponent/ButtonComponent";

const AddProductPage = () => {
  const [product, setProduct] = useState({
    productName: "",
    productPrice: "",
    productSize: "",
    productCategory: "",
    productImage: null,
    productDescription: "",
  });

  const [categories, setCategories] = useState([]); // State lưu danh sách category

  // Fetch danh sách category khi component được mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/category/get-all-category", {
          method: "GET", // Phương thức GET để lấy danh sách category
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }

        const data = await response.json(); // Chuyển đổi dữ liệu từ JSON
        console.log("Categories data:", data);

        // Kiểm tra và gán mảng categories từ data.data
        if (Array.isArray(data.data)) {
          setCategories(data.data); // Lưu danh sách category vào state
        } else {
          console.error("Categories data is not in expected format");
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    setProduct({ ...product, productImage: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("productName", product.productName);
    formData.append("productPrice", product.productPrice);
    formData.append("productCategory", product.productCategory);
    formData.append("productSize", product.productSize);
    formData.append("productDescription", product.productDescription);
    if (product.productImage) {
      formData.append("productImage", product.productImage);
    }

    try {
      const response = await fetch(
        "http://localhost:3001/api/product/create-product",
        {
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data", // Dành cho việc gửi tệp
          },
          body: formData,
        }
      );

      const data = await response.json();
      console.log("Product added successfully:", data);
      alert("Thêm sản phẩm thành công!");
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Thêm sản phẩm thất bại!");
    }
  };

  return (
    <div>
      <div className="container-xl add-product">
        <h1 className="add-product__title">Thêm sản phẩm</h1>

        <div className="add-product__information">
          {/* Info top */}
          <div className="info__top">
            {/* Info left */}
            <div className="info__left">
              <input
                className="product__image"
                type="file"
                onChange={handleImageChange}
                accept="image/*"
                required
              />
              <div className="icon__add-image">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                >
                  <path
                    d="M17.4998 33.3332C17.4998 33.9962 17.7632 34.6321 18.2321 35.1009C18.7009 35.5698 19.3368 35.8332 19.9998 35.8332C20.6629 35.8332 21.2988 35.5698 21.7676 35.1009C22.2364 34.6321 22.4998 33.9962 22.4998 33.3332V22.4998H33.3332C33.9962 22.4998 34.6321 22.2364 35.1009 21.7676C35.5698 21.2988 35.8332 20.6629 35.8332 19.9998C35.8332 19.3368 35.5698 18.7009 35.1009 18.2321C34.6321 17.7632 33.9962 17.4998 33.3332 17.4998H22.4998V6.6665C22.4998 6.00346 22.2364 5.36758 21.7676 4.89874C21.2988 4.4299 20.6629 4.1665 19.9998 4.1665C19.3368 4.1665 18.7009 4.4299 18.2321 4.89874C17.7632 5.36758 17.4998 6.00346 17.4998 6.6665V17.4998H6.6665C6.00346 17.4998 5.36758 17.7632 4.89874 18.2321C4.4299 18.7009 4.1665 19.3368 4.1665 19.9998C4.1665 20.6629 4.4299 21.2988 4.89874 21.7676C5.36758 22.2364 6.00346 22.4998 6.6665 22.4998H17.4998V33.3332Z"
                    fill="#3A060E"
                  />
                </svg>
              </div>
            </div>

            {/* Info right */}
            <div className="info__right">
              <div className="product-name">
                <label>Tên sản phẩm</label>
                <FormComponent
                  style={{ width: "36rem", height: "6rem" }}
                  className="choose-property"
                  placeholder="Nhập tên sản phẩm"
                  name="productName"
                  value={product.productName}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="product-price">
                <label>Giá sản phẩm</label>
                <FormComponent
                  style={{ width: "36rem", height: "6rem" }}
                  className="choose-property"
                  placeholder="Nhập giá sản phẩm"
                  name="productPrice"
                  value={product.productPrice}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="product-category">
                <label>Chọn loại sản phẩm</label>
                <select
                  name="productCategory"
                  value={product.productCategory}
                  onChange={handleInputChange}
                  className="choose-property"
                  style={{ width: "36rem", height: "4rem" }}
                >
                  <option value="" disabled>Chọn loại sản phẩm</option>
                  {Array.isArray(categories) && categories.length > 0 ? (
                    categories.map((category) => (
                      <option key={category._id} value={category.categoryName}>
                        {category.categoryName}
                      </option>
                    ))
                  ) : (
                    <option disabled>Không có loại sản phẩm</option>
                  )}
                </select>

              </div>

              <div className="product-size">
                <label>Chọn kích thước sản phẩm</label>
                <select
                  style={{ width: "36rem" }}
                  className="choose-property"
                  placeholder="Nhập kích thước sản phẩm"
                  name="productSize"
                  onChange={handleInputChange}
                  required
                >
                  <option>12cm</option>
                </select>
              </div>
            </div>
          </div>

          <div className="info__bot">
            <label htmlFor="description">Mô Tả</label>
            <textarea
              className="product-description"
              name="productDescription"
              value={product.productDescription}
              onChange={handleInputChange}
              placeholder="Nhập mô tả sản phẩm"
              required
            />
          </div>
        </div>

        <div className="btn-submit">
          <ButtonComponent onClick={handleSubmit}>Thêm</ButtonComponent>
          <ButtonComponent>Thoát</ButtonComponent>
        </div>
      </div>
    </div>
  );
};

export default AddProductPage;

import {React, useEffect, useState} from "react";
import "./ProductsPage.css";
import SideMenuComponent from "../../../components/SideMenuComponent/SideMenuComponent";
import CardProduct from "../../../components/CardProduct/CardProduct";
import img1 from "../../../assets/img/hero_3.jpg";
import ButtonComponent from "../../../components/ButtonComponent/ButtonComponent";

const ProductsPage = () => {
  const [products, setProducts] = useState([]); // State lưu danh sách sản phẩm
    const [categories, setCategories] = useState([]); // State lưu danh sách category
    const [showModal, setShowModal] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState(null); // Lưu ID sản phẩm cần xóa
    const [loading, setLoading] = useState(false);
  //======
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
          console.log("Categories data:", categories);
  
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
  
    // Fetch danh sách sản phẩm khi component được mount
    const fetchProducts = async () => {
      try {
  
        const response = await fetch("http://localhost:3001/api/product/get-all-product", {
          method: "GET", // Phương thức GET để lấy danh sách category
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
  
        const data = await response.json(); // Chuyển đổi dữ liệu từ JSON
        console.log("Categories data:", categories);
  
        // Kiểm tra và gán mảng categories từ data.data
        if (Array.isArray(data.data)) {
          setProducts(data.data); // Lưu danh sách category vào state
        } else {
          console.error("Products data is not in expected format");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
     
      
  
  
    // Hàm xử lý xóa sản phẩm
    useEffect(() => {
      fetchProducts();
    }, []);
  return (
    <div>
      <div className="container-xl product-container">
        <div className="product">
          {/* product top */}
          <div className="product__top">
            <h1 className="product__title">SẢN PHẨM</h1>
          </div>

          {/* product bot */}
          <div className="product__bot">
            {/* side menu */}
            <div className="side-menu__category"  onChange={useEffect}>
            {Array.isArray(categories) && categories.length > 0 ? (
                categories.map((category) => (
                  <SideMenuComponent key={category._id} value={category._id}>
                    {category.categoryName}
                  </SideMenuComponent>
                ))
              ) : (
                <p>Không có loại sản phẩm</p>
              )}
              
            </div>

            {/* product list */}
            <div className=" container product__list">
            {products.length > 0 ? (
                products.map((product) => {
                  const imageUrl = product.productImage.startsWith("http")
                    ? product.productImage
                    : `https://res.cloudinary.com/dlyl41lgq/image/upload/v2/${product.productImage.replace("\\", "/")}`;

                  //console.log("Product image URL:", imageUrl);  // Debug URL ảnh
                  return (
                    <CardProduct
                      key={product._id} // Dùng _id làm key cho mỗi sản phẩm
                      className="col productadmin__item"
                      type={"primary"}
                      img={imageUrl} // Sử dụng URL ảnh đã xử lý
                      title={product.productName} // Hiển thị tên sản phẩm
                      price={`${product.productPrice} VND`} // Hiển thị giá sản phẩm
                      productId={product._id}
                      //description={product.productDescription} // Mô tả sản phẩm
                      // onDelete={reloadProducts} // Gọi reloadProducts sau khi xóa sản phẩm
                      // onUpdate={reloadProducts} // Gọi reloadProducts sau khi cập nhật sản phẩm
                      // onDeleteRequest={handleDeleteRequest}
                      
                    />
                  );
                })

              ) : (
                <p>Không có sản phẩm nào</p>
              )}
            </div>
            {/* button see more */}
            <ButtonComponent className="btn__see-more">
              Xem thêm
            </ButtonComponent>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;

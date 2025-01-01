import { React, useEffect, useState } from "react";
import "./ProductsPage.css";
import SideMenuComponent from "../../../components/SideMenuComponent/SideMenuComponent";
import CardProduct from "../../../components/CardProduct/CardProduct";
import img1 from "../../../assets/img/hero_3.jpg";
import ButtonComponent from "../../../components/ButtonComponent/ButtonComponent";
import { useNavigate } from "react-router-dom";
import {getProductsByCategory} from "../../../services/productServices"

const ProductsPage = () => {
  const [products, setProducts] = useState([]); // State lưu danh sách sản phẩm
  const [categories, setCategories] = useState([]); // State lưu danh sách category
  const [showModal, setShowModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null); // Lưu ID sản phẩm cần xóa
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0); // Trang hiện tại
  const [totalPages, setTotalPages] = useState(0);   // Tổng số trang
  const [error, setError] = useState("");
  const navigate = useNavigate();
  

  //=========Danh muc san pham=======
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/api/category/get-all-category",
          {
            method: "GET", // Phương thức GET để lấy danh sách category
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

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
  const fetchProducts = async (page = 0, limit = 9, filter = {}) => {
    try {

      // Xây dựng query string từ filter và các tham số khác
      const queryParams = new URLSearchParams({
        page,
        limit,
        ...filter, // Thêm các điều kiện lọc vào query
      }).toString();
      const response = await fetch(`http://localhost:3001/api/product/get-all-product?${queryParams}`, {
        method: "GET", // Phương thức GET để lấy danh sách category
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await response.json(); // Chuyển đổi dữ liệu từ JSON
      console.log("Products:", data.data);
      setCurrentPage(page);  // Cập nhật trang hiện tại
      setTotalPages(Math.ceil(data.total / limit));  // Tính tổng số trang

      // Kiểm tra và gán mảng products từ data.data
      if (Array.isArray(data.data)) {
        setProducts(data.data); // Lưu danh sách category vào state
      } else {
        console.error("Products data is not in expected format");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  //Phan trang
  const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pages = Array.from({ length: totalPages }, (_, index) => index);

    return (
      <div>
        {pages.map((page) => (
          <button className="pageNumber"
            key={page}
            onClick={() => onPageChange(page)}
            style={{ fontWeight: currentPage === page ? "bold" : "normal" }}
          >
            {page + 1}
          </button>
        ))}
      </div>
    );
  };


  // Hàm xử lý reloadProduct
  useEffect(() => {
    fetchProducts();
  }, []);

  //Lay product theo category
  const handleCategoryClick = async (categoryId) => {
    try {
      const response = await getProductsByCategory(categoryId); // Gọi hàm API với categoryId và token
      setProducts(response.data); // Cập nhật danh sách sản phẩm sau khi lọc
      console.log("Filtered products:", response.data);
    } catch (err) {
      console.error("Error fetching products by category:", err.message);
      setError(err.message || "Không thể tải sản phẩm theo danh mục.");
    }
  };
  

  const handleDetail = (productId) => {
    const selectedProduct = products.find((product) => product._id === productId);

    if (selectedProduct) {
      const { productName, productSize, productImage, productCategory, productDescription, productPrice } = selectedProduct;
      navigate("/view-product-detail", {
        state: { productId, productName, productSize, productImage, productDescription, productCategory, productPrice },
      });
    } else {
      alert("Product not found!");
    }
  };



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
            <div className="side-menu__category" onChange={useEffect}>
              {Array.isArray(categories) && categories.length > 0 ? (
                categories.map((category) => (
                  <SideMenuComponent key={category._id} value={category._id}
                    onClick={() => handleCategoryClick(category._id)}>
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
                  // console.log("productPage", products.length);
                  const imageUrl = product.productImage.startsWith("http")
                    ? product.productImage
                    : `https://res.cloudinary.com/dlyl41lgq/image/upload/v2/${product.productImage.replace(
                      "\\",
                      "/"
                    )}`;
                  console.log("Product ID in ProductsPage:", product._id);
                  //console.log("Product image URL:", imageUrl);  // Debug URL ảnh
                  return (
                   
                    <CardProduct
                      key={product._id} // Dùng _id làm key cho mỗi sản phẩm
                      className="col productadmin__item"
                      type={"primary"}
                      img={imageUrl} // Sử dụng URL ảnh đã xử lý
                      title={product.productName} // Hiển thị tên sản phẩm
                      price={`${product.productPrice} VND`} // Hiển thị giá sản phẩm
                      id={product._id}
                      onClick={() => handleDetail(product._id)}
                    />
                    
                  );
                })
              ) : (
                <p>Không có sản phẩm nào</p>
              )}
            </div>
            {/* button see more */}
            {/* <ButtonComponent className="btn__see-more">
              Xem thêm
            </ButtonComponent> */}
          </div>
        </div>
        <div className="PageNumberHolder">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => fetchProducts(page, 9)}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;

import { useState, useEffect } from "react";
import "./ProductPageAdmin.css";
import CardProductAdmin from "../../../../components/CardProductAdmin/CardProductAdmin";
import AddBtn from "../../../../components/AddBtn(+)/AddBtn";
import SideMenuComponent from "../../../../components/SideMenuComponent/SideMenuComponent";
import * as productService from "../../../../services/productServices";
import axios from 'axios'; // For making API calls
import { Button, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const ProductPageAdmin = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0); // Trang hiện tại
  const [totalPages, setTotalPages] = useState(0);   // Tổng số trang

  const [products, setProducts] = useState([]); // State lưu danh sách sản phẩm
  const [categories, setCategories] = useState([]); // State lưu danh sách category
 // const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null); // Lưu ID sản phẩm cần xóa
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user)
  ///======lay danh sach category=====
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




  // Fetch danh sách sản phẩm khi component được mount
  const fetchProducts = async (page = 0, limit = 9) => {
    try {

      const response = await fetch(`http://localhost:3001/api/product/get-all-product?page=${page}&limit=${limit}`, {
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




  useEffect(() => {
    fetchProducts();
  }, []);

  const handleUpdate = (productId) => {
    const selectedProduct = products.find((product) => product._id === productId);
    
    if (selectedProduct) {
      const { productName, productSize, productImage, productCategory, productDescription, productPrice } = selectedProduct; 
      navigate("/admin/update-product", {
        state: { productId, productName, productSize, productImage,  productDescription, productCategory, productPrice}, 
      });
    } else {
      alert("Product not found!");
    }
  };
  

  return (
    <div className="container-xl productadmin-container">
      <div className="productadmin">
        {/* productadmin top */}
        <div className="productadmin__top">
          <h1 className="productadmin__title">SẢN PHẨM</h1>
        </div>
        <div style={{ marginLeft: 1222 }}>
          <AddBtn />
        </div>
        {/* productadmin bot */}
        <div className="productadmin__bot">
          {/* side menu */}
          <div className="side-menu__category" onChange={useEffect}>
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

          {/* productadmin list */}
          <div className="container productadmin__list" onChange={useEffect}>
            {products.length > 0 ? (
              products.map((product) => {
                const imageUrl = product.productImage.startsWith("http")
                  ? product.productImage
                  : `https://res.cloudinary.com/dlyl41lgq/image/upload/v2/${product.productImage.replace("\\", "/")}`;

                //console.log("Product image URL:", imageUrl);  // Debug URL ảnh
                return (
                  <CardProductAdmin
                    key={product._id} // Dùng _id làm key cho mỗi sản phẩm
                    className="col productadmin__item"
                    type={"primary"}
                    img={imageUrl} // Sử dụng URL ảnh đã xử lý
                    title={product.productName} // Hiển thị tên sản phẩm
                    price={`${product.productPrice.toLocaleString('en-US')} VND`}
                    onUpdate={() => handleUpdate(product._id)} 
                    productId={product._id}
                  //description={product.productDescription} // Mô tả sản phẩm


                  />
                );
              })

            ) : (
              <p>Không có sản phẩm nào</p>
            )}
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

export default ProductPageAdmin;

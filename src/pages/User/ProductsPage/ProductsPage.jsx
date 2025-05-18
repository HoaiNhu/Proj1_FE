import { React, useEffect, useState } from "react";
import "./ProductsPage.css";
import SideMenuComponent from "../../../components/SideMenuComponent/SideMenuComponent";
import CardProduct from "../../../components/CardProduct/CardProduct";
import ButtonComponent from "../../../components/ButtonComponent/ButtonComponent";
import { useNavigate, useLocation } from "react-router-dom";
import {
  getAllproduct,
  getProductsByCategory,
} from "../../../services/productServices";
import { getAllCategory } from "../../../services/CategoryService";

const ProductsPage = () => {
  const [products, setProducts] = useState([]); // State lưu danh sách sản phẩm
  const [categories, setCategories] = useState([]); // State lưu danh sách category
  const [currentCategory, setCurrentCategory] = useState(null); // State lưu category hiện tại
  const [currentCategoryName, setCurrentCategoryName] =
    useState("Tất cả sản phẩm"); // State lưu tên category hiện tại
  const [currentPage, setCurrentPage] = useState(0); // Trang hiện tại
  const [totalPages, setTotalPages] = useState(0); // Tổng số trang
  const [error, setError] = useState(""); // State lưu lỗi

  const navigate = useNavigate();
  const location = useLocation();

  const previousCategoryId = location.state?.categoryIds || null;

  //=========Danh mục sản phẩm=======
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getAllCategory();
        setCategories(data.data); // Lưu danh sách category vào state
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // Fetch danh sách sản phẩm theo category
  const fetchProductsByCategory = async (
    page = 0,
    limit = 9,
    categoryId = null
  ) => {
    try {
      if (!categoryId) {
        console.log("No category selected, skipping fetchProductsByCategory");
        setProducts([]);
        return;
      }

      const queryParams = new URLSearchParams({ page, limit }).toString();

      const data = await getProductsByCategory(categoryId);
      setCurrentPage(page);
      setTotalPages(Math.ceil(data.total / limit));

      if (Array.isArray(data.data)) {
        setProducts(data.data);
      } else {
        console.error("Products data is not in expected format");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // fetch danh sach san pham
  const fetchAllProducts = async (page = 0, limit = 9, categoryId = null) => {
    try {
      const queryParams = new URLSearchParams({ page, limit }).toString();

      const data = await getAllproduct();
      setCurrentPage(page);
      setTotalPages(Math.ceil(data.total / limit));

      if (Array.isArray(data.data)) {
        setProducts(data.data);
      } else {
        console.error("Products data is not in expected format");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Khi component được mount
  useEffect(() => {
    if (previousCategoryId) {
      setCurrentCategory(previousCategoryId);
      const selectedCategory = categories.find(
        (cat) => cat._id === previousCategoryId
      );
      setCurrentCategoryName(
        selectedCategory?.categoryName || "Tất cả sản phẩm"
      );
      setCurrentPage(0);
      fetchProductsByCategory(0, 9, previousCategoryId);
    } else {
      setCurrentCategoryName("Tất cả sản phẩm");
      fetchAllProducts(0, 9);
    }
  }, [previousCategoryId, categories]);

  // Khi thay đổi trang hoặc danh mục
  useEffect(() => {
    if (currentCategory) {
      fetchProductsByCategory(currentPage, 9, currentCategory);
    } else {
      fetchAllProducts(currentPage, 9);
    }
  }, [currentPage, currentCategory]);

  // Phân trang
  const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pages = Array.from({ length: totalPages }, (_, index) => index);
    return (
      <div>
        {pages.map((page) => (
          <button
            className="pageNumber"
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

  // Reload sản phẩm khi chuyển trang hoặc category
  useEffect(() => {
    fetchProductsByCategory(currentPage, 9, currentCategory);
  }, [currentPage, currentCategory]);

  // Khi nhấn vào category
  const handleCategoryClick = (categoryId, categoryName) => {
    setCurrentCategory(categoryId);
    setCurrentCategoryName(categoryName);
    console.log("Current", currentCategoryName);
    setCurrentPage(0);
    fetchProductsByCategory(0, 9, categoryId);
  };

  // Khi nhấn vào Tất cả sản phẩm
  const handleAllProductsClick = () => {
    setCurrentCategory(null);
    setCurrentCategoryName("Tất cả sản phẩm");
    console.log("Current", currentCategoryName);
    setCurrentPage(0);
    fetchAllProducts();
  };

  // Khi nhấn vào sản phẩm
  const handleDetail = (productId) => {
    const selectedProduct = products.find(
      (product) => product._id === productId
    );

    if (selectedProduct) {
      const {
        productName,
        productSize,
        productImage,
        productCategory,
        productDescription,
        productPrice,
      } = selectedProduct;
      navigate("/view-product-detail", {
        state: {
          productId,
          productName,
          productSize,
          productImage,
          productDescription,
          productCategory,
          productPrice,
        },
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
            <p className="product__current-category">{currentCategoryName}</p>
          </div>

          {/* product bot */}
          <div className="product__bot">
            {/* side menu */}
            <div className="side-menu__category">
              <SideMenuComponent
                key="all-products"
                value={null}
                onClick={handleAllProductsClick}
                isActive={currentCategory === null}
              >
                Tất cả sản phẩm
              </SideMenuComponent>

              {Array.isArray(categories) && categories.length > 0 ? (
                categories.map((category) => (
                  <SideMenuComponent
                    key={category._id}
                    value={category._id}
                    onClick={() =>
                      handleCategoryClick(category._id, category.categoryName)
                    }
                    isActive={currentCategory === category._id}
                  >
                    {category.categoryName}
                  </SideMenuComponent>
                ))
              ) : (
                <p>Không có loại sản phẩm</p>
              )}
            </div>

            {/* product list */}
            <div className="container product__list">
              {products.length > 0 ? (
                products.map((product) => {
                  const imageUrl = product.productImage.startsWith("http")
                    ? product.productImage
                    : `https://res.cloudinary.com/dlyl41lgq/image/upload/v2/${product.productImage.replace(
                        "\\",
                        "/"
                      )}`;

                  return (
                    <CardProduct
                      key={product._id}
                      className="col productadmin__item"
                      type={"primary"}
                      img={imageUrl}
                      title={product.productName}
                      price={product.productPrice}
                      id={product._id}
                      onClick={() => handleDetail(product._id)}
                    />
                  );
                })
              ) : (
                <p>Không có sản phẩm nào</p>
              )}
            </div>
          </div>
        </div>

        {/* Pagination */}
        <div className="PageNumberHolder">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;

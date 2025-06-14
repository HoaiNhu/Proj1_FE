import { useState, useEffect } from "react";
import "./ProductPageAdmin.css";
import CardProductAdmin from "../../../../components/CardProductAdmin/CardProductAdmin";
import AddBtn from "../../../../components/AddBtn(+)/AddBtn";
import SideMenuComponent from "../../../../components/SideMenuComponent/SideMenuComponent";
import * as productService from "../../../../services/productServices";
import axios from 'axios'; // For making API calls
import { Button, Modal } from "react-bootstrap";
import { getAllCategory } from "../../../../services/CategoryService";
import { useNavigate, useLocation } from "react-router-dom";
import { getProductsByCategory, getAllproduct } from "../../../../services/productServices";
import { getAllDiscount } from "../../../../services/DiscountService";

const ProductPageAdmin = () => {
  const [products, setProducts] = useState([]); // State lưu danh sách sản phẩm
  const [categories, setCategories] = useState([]); // State lưu danh sách category
  const [currentCategory, setCurrentCategory] = useState(null); // State lưu category hiện tại
  const [currentCategoryName, setCurrentCategoryName] = useState("Tất cả sản phẩm"); // State lưu tên category hiện tại
  const [currentPage, setCurrentPage] = useState(0); // Trang hiện tại
  const [totalPages, setTotalPages] = useState(0); // Tổng số trang
  const [error, setError] = useState(""); // State lưu lỗi
  const [discounts, setDiscounts] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();

  const previousCategoryId = location.state?.categoryIds || null;

   useEffect(() => {
      const fetchCategories = async () => {
        try {
          const data = await getAllCategory();
          console.log("RES", data)
          setCategories(data.data); // Lưu danh sách category vào state
        } catch (error) {
          console.error("Error fetching categories:", error);
        }
      };
      fetchCategories();
    }, []);

    useEffect(() => {
      const fetchDiscounts = async () => {
        try {
          const data = await getAllDiscount();
          setDiscounts(data.data);
        } catch (error) {
          console.error("Error fetching discounts:", error);
        }
      };
      fetchDiscounts();
    }, []);
  
    // Fetch danh sách sản phẩm theo category
    const fetchProductsByCategory = async (page = 0, limit = 9, categoryId = null) => {
      try {
        const queryParams = new URLSearchParams({ page, limit }).toString();
  
        const data = await getProductsByCategory(categoryId);
        console.log ("DATA", data)
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
      const selectedCategory = categories.find(cat => cat._id === previousCategoryId);
      setCurrentCategoryName(selectedCategory?.categoryName || "Tất cả sản phẩm");
      setCurrentPage(0);
      fetchProductsByCategory(0, 9, previousCategoryId);
    } else {
      setCurrentCategoryName("Tất cả sản phẩm");
      fetchAllProducts(0, 9);
    }
  }, [previousCategoryId, categories]);

  // Khi nhấn vào category
  const handleCategoryClick = (categoryId, categoryName) => {
    setCurrentCategory(categoryId);
    setCurrentCategoryName(categoryName);
    console.log("Current", currentCategoryName)
    setCurrentPage(0);
    fetchProductsByCategory(0, 9, categoryId);
  };

  // Khi click promo:
  const handlePromoProductsClick = async () => {
    setCurrentCategoryName("Khuyến mãi");
    setCurrentCategory(1);
    setCurrentPage(0);
  
    try {
      const allProductResponse = await getAllproduct();
      const allProducts = allProductResponse.data;
      console.log("DATA PROMO: ", allProducts)
  
      const discountedProductIds = new Set();
      const now = Date.now();
      discounts.forEach((discount) => {
        const start = new Date(discount.discountStartDate).getTime();
        const end = new Date(discount.discountEndDate).getTime();
        if (start <= now && end >= now) {
          discount.discountProduct?.forEach((product) => {
            if (typeof product === "string") {
              discountedProductIds.add(product);
            } else if (product?._id) {
              discountedProductIds.add(product._id);
            }
          });
        }
      });
      console.log("DATA PROMO12: ", discounts)

  
      const filtered = allProducts.filter((product) =>
        discountedProductIds.has(product._id)
      );

      console.log("DATA PROMO: ", filtered)
  
      setProducts(filtered); // ✅ chỉ chứa sản phẩm đang áp dụng mã
      setTotalPages(1); // Hoặc tính lại phân trang nếu cần
    } catch (err) {
      console.error("Lỗi khi lọc sản phẩm khuyến mãi:", err);
      setProducts([]);
    }
  };

  // Khi nhấn vào Tất cả sản phẩm
  const handleAllProductsClick = () => {
    setCurrentCategory(null);
    setCurrentCategoryName("Tất cả sản phẩm");
    console.log("Current", currentCategoryName)
    setCurrentPage(0);
    fetchAllProducts();
  };
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

  // Xử lý cập nhật sản phẩm
  const handleUpdate = (productId) => {
    const selectedProduct = products.find((product) => product._id === productId);
    console.log("SDSDSF: ", selectedProduct)
    if (selectedProduct) {
      const { productName, productSize, productImage, productCategory, productDescription, productPrice } = selectedProduct;
      console.log("SDSDSF")
      navigate("/admin/update-product", {
        state: { productId, productName, productSize, productImage, productDescription, productCategory, productPrice },
      });
    } else {
      alert("Product not found!");
    }
    console.log("SDSDSF")
  };

  
  return (
    <div className="container-xl productadmin-container">
      <div className="productadmin">
        {/* productadmin top */}
        <div className="product__top">
          <h1 className="product__title">SẢN PHẨM</h1>
          {/* Hiển thị tên category nếu có */}
          {currentCategory ? (
            <p className="product__current-category">
              {categories.find((cat) => cat._id === currentCategory)?.categoryName}
            </p>
          ) : (
            <p className="product__current-category">Tất cả sản phẩm</p>
          )}
        </div>
        <div style={{ marginLeft: 1222 }}>
          <AddBtn path={"/admin/add-product"} />
        </div>
        {/* productadmin bot */}
        <div className="productadmin__bot">
          {/* side menu */}
          <div className="side-menu__category">
            {/* Thêm "Tất cả sản phẩm" */}
            <SideMenuComponent
                key="all-products"
                value={null}
                onClick={handleAllProductsClick}
                isActive={currentCategory=== null}
              >
                Tất cả sản phẩm
              </SideMenuComponent>
              <SideMenuComponent
                key="promo-product"
                value={null}
                onClick={handlePromoProductsClick}
                isActive={currentCategory === 1}
              >
                Khuyến mãi
              </SideMenuComponent>
              {Array.isArray(categories) && categories.length > 0 ? (
                categories.map((category) => (
                  <SideMenuComponent
                    key={category._id}
                    value={category._id}
                    onClick={() => handleCategoryClick(category._id, category.categoryName)}
                    isActive={currentCategory === category._id}
                  >
                    {category.categoryName}
                  </SideMenuComponent>
                ))
              ) : (
                <p>Không có loại sản phẩm</p>
              )}
              
          </div>

          {/* productadmin list */}
          <div className="container product__list">
              {products.length > 0 ? (
                products.map((product) => {
                  const imageUrl = product.productImage.startsWith("http")
                    ? product.productImage
                    : `https://res.cloudinary.com/dlyl41lgq/image/upload/v2/${product.productImage.replace("\\", "/")}`;

                  const now = Date.now();
                  const appliedDiscount = discounts.find((discount) => {
                    const start = new Date(discount.discountStartDate).getTime();
                    const end = new Date(discount.discountEndDate).getTime();
                    return start <= now && end >= now &&
                      discount.discountProduct?.some((pro) =>
                        typeof pro === "string"
                          ? pro === product._id
                          : pro._id === product._id
                      );
                  });

                  const discountPercent = appliedDiscount?.discountValue || 0;

                  return (
                    <CardProductAdmin
                      key={product._id}
                      className="col productadmin__item"
                      type="primary"
                      img={imageUrl}
                      title={product.productName}
                      price={product.productPrice}
                      discount={discountPercent}
                      id={product._id}
                      size={product.productSize}
                      onClick={() => handleUpdate(product._id)}
                      averageRating={product.averageRating}
                      totalRatings={product.totalRatings}
                     
                    />
                  );
                })
              ) : (
                <p>Không có sản phẩm nào</p>
              )}
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

export default ProductPageAdmin;

import { React, useEffect, useState } from "react";
import "./ProductsPage.css";
import SideMenuComponent from "../../../components/SideMenuComponent/SideMenuComponent";
import CardProduct from "../../../components/CardProduct/CardProduct";
import { useNavigate, useLocation } from "react-router-dom";
import {
  getAllproduct,
  getProductsByCategory,
} from "../../../services/productServices";
import { getAllCategory } from "../../../services/CategoryService";
import { getAllDiscount } from "../../../services/DiscountService";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [currentCategoryName, setCurrentCategoryName] = useState("Tất cả sản phẩm");
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [discounts, setDiscounts] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const previousCategoryId = location.state?.categoryIds || null;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getAllCategory();
        setCategories(data.data);
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

  const fetchProductsByCategory = async (page = 0, limit = 9, categoryId = null) => {
    try {
      if (!categoryId) {
        setProducts([]);
        return;
      }
      const data = await getProductsByCategory(categoryId);
      setCurrentPage(page);
      setTotalPages(Math.ceil(data.total / limit));
      setProducts(Array.isArray(data.data) ? data.data : []);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchAllProducts = async (page = 0, limit = 9) => {
    try {
      const data = await getAllproduct();
      setCurrentPage(page);
      setTotalPages(Math.ceil(data.total / limit));
      setProducts(Array.isArray(data.data) ? data.data : []);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    if (previousCategoryId && categories.length > 0) {
      setCurrentCategory(previousCategoryId);
      const selectedCategory = categories.find((cat) => cat._id === previousCategoryId);
      setCurrentCategoryName(selectedCategory?.categoryName || "Tất cả sản phẩm");
      fetchProductsByCategory(0, 9, previousCategoryId);
    } else {
      setCurrentCategoryName("Tất cả sản phẩm");
      fetchAllProducts(0, 9);
    }
  }, [previousCategoryId, categories]);

  useEffect(() => {
    if (currentCategory) {
      fetchProductsByCategory(currentPage, 9, currentCategory);
    } else {
      fetchAllProducts(currentPage, 9);
    }
  }, [currentPage, currentCategory]);

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

  const handleCategoryClick = (categoryId, categoryName) => {
    setCurrentCategory(categoryId);
    setCurrentCategoryName(categoryName);
    setCurrentPage(0);
    fetchProductsByCategory(0, 9, categoryId);
  };

  const handleAllProductsClick = () => {
    setCurrentCategory(null);
    setCurrentCategoryName("Tất cả sản phẩm");
    setCurrentPage(0);
    fetchAllProducts();
  };

const handlePromoProductsClick = async () => {
  setCurrentCategoryName("Khuyến mãi");
  setCurrentCategory(1);
  setCurrentPage(0);

  try {
    const allProductResponse = await getAllproduct();
    const allProducts = allProductResponse.data;

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

    const filtered = allProducts.filter((product) =>
      discountedProductIds.has(product._id)
    );

    setProducts(filtered); // ✅ chỉ chứa sản phẩm đang áp dụng mã
    setTotalPages(1); // Hoặc tính lại phân trang nếu cần
  } catch (err) {
    console.error("Lỗi khi lọc sản phẩm khuyến mãi:", err);
    setProducts([]);
  }
};


  const handleDetail = (productId) => {
    const selectedProduct = products.find((product) => product._id === productId);
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
          averageRating: selectedProduct.averageRating,
          totalRatings: selectedProduct.totalRatings,
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
          <div className="product__top">
            <h1 className="product__title">SẢN PHẨM</h1>
            <p className="product__current-category">{currentCategoryName}</p>
          </div>

          <div className="product__bot">
            <div className="side-menu__category">
              <SideMenuComponent
                key="all-products"
                value={null}
                onClick={handleAllProductsClick}
                isActive={currentCategory === null}
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
                    onClick={() => handlePromoProductsClick(category._id, category.categoryName)}
                    isActive={currentCategory === category._id}
                  >
                    {category.categoryName}
                  </SideMenuComponent>
                ))
              ) : (
                <p>Không có loại sản phẩm</p>
              )}
            </div>

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
                    <CardProduct
                      key={product._id}
                      className="col productadmin__item"
                      type="primary"
                      img={imageUrl}
                      title={product.productName}
                      price={product.productPrice}
                      discount={discountPercent}
                      id={product._id}
                      size={product.productSize}
                      onClick={() => handleDetail(product._id)}
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
        </div>

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

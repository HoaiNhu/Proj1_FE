import React, { useEffect, useState } from "react";
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
  // ──────────────────────────────────────────── State
  const [products, setProducts]       = useState([]);
  const [categories, setCategories]   = useState([]);
  const [currentCategory, setCurrentCategory] = useState(null);   // null: tất cả – 1: khuyến mãi
  const [currentCategoryName, setCurrentCategoryName] = useState("Tất cả sản phẩm");
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages]   = useState(0);
  const [discounts, setDiscounts]     = useState([]);

  // ──────────────────────────────────────────── Router
  const navigate  = useNavigate();
  const location  = useLocation();
  const showPromo = location.state?.showPromo || false;            // <── cờ từ HomePage
  const previousCategoryId = location.state?.categoryIds || null;

  // ──────────────────────────────────────────── Fetch danh mục & khuyến mãi
  useEffect(() => {
    (async () => {
      try {
        const [catRes, discRes] = await Promise.all([
          getAllCategory(),
          getAllDiscount(),
        ]);
        setCategories(catRes.data);
        setDiscounts(discRes.data);
      } catch (err) {
        console.error("Error loading init data:", err);
      }
    })();
  }, []);

  // ──────────────────────────────────────────── Hàm fetch sản phẩm
  const fetchProductsByCategory = async (page = 0, limit = 9, categoryId) => {
    try {
      const { total, data } = await getProductsByCategory(categoryId);
      setProducts(Array.isArray(data) ? data : []);
      setTotalPages(Math.ceil(total / limit));
      setCurrentPage(page);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  const fetchAllProducts = async (page = 0, limit = 9) => {
    try {
      const { total, data } = await getAllproduct();
      setProducts(Array.isArray(data) ? data : []);
      setTotalPages(Math.ceil(total / limit));
      setCurrentPage(page);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  // ──────────────────────────────────────────── Hiển thị khuyến mãi
  const handlePromoProductsClick = async () => {
    setCurrentCategoryName("Khuyến mãi");
    setCurrentCategory(1);     // 1 đánh dấu tab khuyến mãi
    setCurrentPage(0);

    try {
      const allProducts = (await getAllproduct()).data;
      const now = Date.now();
      const discountedIds = new Set();

      discounts.forEach((d) => {
        const start = new Date(d.discountStartDate).getTime();
        const end   = new Date(d.discountEndDate).getTime();
        if (start <= now && end >= now) {
          d.discountProduct?.forEach((p) =>
            discountedIds.add(typeof p === "string" ? p : p?._id)
          );
        }
      });

      const filtered = allProducts.filter((p) => discountedIds.has(p._id));
      setProducts(filtered);
      setTotalPages(1);
    } catch (err) {
      console.error("Error filtering promo products:", err);
      setProducts([]);
    }
  };

  // ──────────────────────────────────────────── Chọn category
  const handleCategoryClick = (id, name) => {
    setCurrentCategory(id);
    setCurrentCategoryName(name);
    setCurrentPage(0);
    fetchProductsByCategory(0, 9, id);
  };

  const handleAllProductsClick = () => {
    setCurrentCategory(null);
    setCurrentCategoryName("Tất cả sản phẩm");
    setCurrentPage(0);
    fetchAllProducts();
  };

  // ──────────────────────────────────────────── Khởi tạo lần đầu
  useEffect(() => {
    if (!categories.length) return;    // đợi categories load xong

    if (showPromo) {
      handlePromoProductsClick();
      // Tùy chọn: xoá state để tránh lặp khi F5/back
      // navigate(location.pathname, { replace: true, state: {} });
      return;
    }

    if (previousCategoryId) {
      const cat = categories.find((c) => c._id === previousCategoryId);
      if (cat) {
        setCurrentCategory(previousCategoryId);
        setCurrentCategoryName(cat.categoryName);
        fetchProductsByCategory(0, 9, previousCategoryId);
        return;
      }
    }

    fetchAllProducts(0, 9);   // mặc định: tất cả
  }, [categories, discounts, showPromo, previousCategoryId]);

  // ──────────────────────────────────────────── Phân trang & theo dõi category (trừ khuyến mãi)
  useEffect(() => {
    if (currentCategory && currentCategory !== 1) {
      fetchProductsByCategory(currentPage, 9, currentCategory);
    } else if (currentCategory === null) {
      fetchAllProducts(currentPage, 9);
    }
    // currentCategory === 1 (khuyến mãi) => không gọi API ở đây
  }, [currentPage, currentCategory]);

  // ──────────────────────────────────────────── Xem chi tiết sản phẩm
  const handleDetail = (productId) => {
    const p = products.find((prod) => prod._id === productId);
    if (!p) return alert("Product not found!");
    const {
      productName, productSize, productImage,
      productCategory, productDescription, productPrice,
      averageRating, totalRatings
    } = p;

    navigate("/view-product-detail", {
      state: {
        productId, productName, productSize, productImage,
        productDescription, productCategory, productPrice,
        averageRating, totalRatings,
      },
    });
  };

  // ──────────────────────────────────────────── Phân trang UI
  const Pagination = ({ currentPage, totalPages, onPageChange }) => (
    <div>
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i}
          className="pageNumber"
          style={{ fontWeight: currentPage === i ? "bold" : "normal" }}
          onClick={() => onPageChange(i)}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );

  // ──────────────────────────────────────────── JSX
  return (
    <div>
      <div className="container-xl product-container">
        <div className="product">
          <div className="product__top">
            <h1 className="product__title">SẢN PHẨM</h1>
            <p className="product__current-category">{currentCategoryName}</p>
          </div>

          <div className="product__bot">
            {/* ─────────────── Side menu */}
            <div className="side-menu__category">
              <SideMenuComponent
                key="all-products"
                value={null}
                isActive={currentCategory === null}
                onClick={handleAllProductsClick}
              >
                Tất cả sản phẩm
              </SideMenuComponent>

              <SideMenuComponent
                key="promo-product"
                value={null}
                isActive={currentCategory === 1}
                onClick={handlePromoProductsClick}
              >
                Khuyến mãi
              </SideMenuComponent>

              {categories.map((c) => (
                <SideMenuComponent
                  key={c._id}
                  value={c._id}
                  isActive={currentCategory === c._id}
                  onClick={() => handleCategoryClick(c._id, c.categoryName)}
                >
                  {c.categoryName}
                </SideMenuComponent>
              ))}
            </div>

            {/* ─────────────── Danh sách sản phẩm */}
            <div className="container product__list">
              {products.length ? (
                products.map((p) => {
                  const imageUrl = p.productImage.startsWith("http")
                    ? p.productImage
                    : `https://res.cloudinary.com/dlyl41lgq/image/upload/v2/${p.productImage.replace("\\", "/")}`;

                  const now = Date.now();
                  const discount = discounts.find((d) => {
                    const st = new Date(d.discountStartDate).getTime();
                    const ed = new Date(d.discountEndDate).getTime();
                    return st <= now && ed >= now &&
                      d.discountProduct?.some((x) =>
                        typeof x === "string" ? x === p._id : x._id === p._id
                      );
                  });
                  const discountPercent = discount?.discountValue || 0;

                  return (
                    <CardProduct
                      key={p._id}
                      className="col productadmin__item"
                      type="primary"
                      img={imageUrl}
                      title={p.productName}
                      price={p.productPrice}
                      discount={discountPercent}
                      id={p._id}
                      size={p.productSize}
                      averageRating={p.averageRating}
                      totalRatings={p.totalRatings}
                      onClick={() => handleDetail(p._id)}
                    />
                  );
                })
              ) : (
                <p>Không có sản phẩm nào</p>
              )}
            </div>
          </div>
        </div>

        {/* ─────────────── Pagination */}
        <div className="PageNumberHolder">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(p) => setCurrentPage(p)}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;

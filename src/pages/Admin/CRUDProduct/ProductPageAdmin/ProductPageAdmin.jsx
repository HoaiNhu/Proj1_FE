import { useState, useEffect } from "react";
import "./ProductPageAdmin.css";
import CardProductAdmin from "../../../../components/CardProductAdmin/CardProductAdmin";
import AddBtn from "../../../../components/AddBtn(+)/AddBtn";
import SideMenuComponent from "../../../../components/SideMenuComponent/SideMenuComponent";
import * as productService from "../../../../services/productServices";
import axios from 'axios'; // For making API calls
import {Button,Modal } from "react-bootstrap";


const ProductPageAdmin = () => {
  const [products, setProducts] = useState([]); // State lưu danh sách sản phẩm
  const [categories, setCategories] = useState([]); // State lưu danh sách category
  const [showModal, setShowModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null); // Lưu ID sản phẩm cần xóa
  const [loading, setLoading] = useState(false);
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
  const handleDeleteRequest = (productId) => {
    setSelectedProductId(productId); // Lưu sản phẩm cần xóa
    setShowModal(true); // Hiển thị modal
  };

  // Hàm để reload lại dữ liệu sản phẩm
  const reloadProducts = () => {
    fetchProducts();
  };
  const handleDeleteConfirm = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/product/delete-product/${selectedProductId}`);
      setLoading(false);
      setShowModal(false);
      fetchProducts(); // Reload sản phẩm sau khi xóa
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm:", error);
      setLoading(false);
    }
  };

  const handleDeleteCancel = () => {
    setShowModal(false); // Đóng modal
  };

  return (
    <div>
      {/* Modal xóa */}
      <Modal show={showModal} onHide={handleDeleteCancel}
       style={{zIndex:9999}}>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận xóa</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn có chắc chắn muốn xóa sản phẩm này?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDeleteCancel}>
            Hủy
          </Button>
          <Button variant="danger" onClick={handleDeleteConfirm} disabled={loading}>
            {loading ? "Đang xóa..." : "Xóa"}
          </Button>
        </Modal.Footer>
      </Modal>
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
                      price={`${product.productPrice} VND`} // Hiển thị giá sản phẩm
                      productId={product._id}
                      //description={product.productDescription} // Mô tả sản phẩm
                      onDelete={reloadProducts} // Gọi reloadProducts sau khi xóa sản phẩm
                      onUpdate={reloadProducts} // Gọi reloadProducts sau khi cập nhật sản phẩm
                      onDeleteRequest={handleDeleteRequest}
                      
                    />
                  );
                })

              ) : (
                <p>Không có sản phẩm nào</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPageAdmin;

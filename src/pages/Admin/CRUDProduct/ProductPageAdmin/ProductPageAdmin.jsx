import { useState, useEffect } from "react";
import "./ProductPageAdmin.css";
import CardProductAdmin from "../../../../components/CardProductAdmin/CardProductAdmin";
import AddBtn from "../../../../components/AddBtn(+)/AddBtn";
import SideMenuComponentDelete from "../../../../components/SideMenuComponent-Delete/SideMenuComponentDelete";

const ProductPageAdmin = () => {
  const [products, setProducts] = useState([]); // State lưu danh sách sản phẩm

  // Fetch danh sách sản phẩm khi component được mount
  
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/product/get-all-product", {
          method: "GET", // Phương thức GET để lấy danh sách sản phẩm
          headers: {
            "Content-Type": "application/json",
          },
        });
       

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json(); // Chuyển đổi dữ liệu từ JSON
        console.log("Fetched products:", data.data)
        setProducts(data.data); // Lưu danh sách sản phẩm vào state
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
  

  // Hàm xử lý xóa sản phẩm
  useEffect(() => {
    fetchProducts();
  }, []);

  // Hàm để reload lại dữ liệu sản phẩm
  const reloadProducts = () => {
    fetchProducts();
  };
    
  return (
    <div>
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
            <div className="side-menu__category">
              <SideMenuComponentDelete>Bánh sinh nhật</SideMenuComponentDelete>
              <SideMenuComponentDelete>Bánh mặn</SideMenuComponentDelete>
              <SideMenuComponentDelete>Bánh cưới</SideMenuComponentDelete>
            </div>

            {/* productadmin list */}
            <div className="container productadmin__list">
              {products.length > 0 ? (
                products.map((product) => {
                  const imageUrl = product.productImage.startsWith("http")
                  ? product.productImage
                  : `https://res.cloudinary.com/dlyl41lgq/image/upload/v2/${product.productImage.replace("\\", "/")}`;
                
                    console.log("Product image URL:", imageUrl);  // Debug URL ảnh
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

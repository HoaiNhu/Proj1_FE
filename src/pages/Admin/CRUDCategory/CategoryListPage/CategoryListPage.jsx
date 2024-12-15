import React, { useState, useEffect } from "react";
import "./CategoryListPage.css";
import SideMenuComponent from "../../../../components/SideMenuComponent/SideMenuComponent";
import ButtonComponent from "../../../../components/ButtonComponent/ButtonComponent";
import CheckboxComponent from "../../../../components/CheckboxComponent/CheckboxComponent";

const CategoryListPage = () => {
  const [selectedRows, setSelectedRows] = useState([]);  // State lưu danh sách các hàng được chọn
  const [categories, setCategories] = useState([]); // State lưu danh sách categories

  // Fetch dữ liệu categories từ server
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/category/get-all-category");
        const data = await response.json(); // Giả sử API trả về dữ liệu ở dạng JSON

        // Kiểm tra dữ liệu trả về có đúng format hay không
        if (data.status === "OK" && Array.isArray(data.data)) {
          setCategories(data.data); // Lưu dữ liệu vào state nếu dữ liệu hợp lệ
        } else {
          console.error("Unexpected data format", data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories(); // Gọi hàm fetchCategories khi component mount
  }, []);

  // Hàm toggle chọn một dòng
  const toggleSelectRow = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  // Hàm toggle chọn tất cả
  const toggleSelectAll = () => {
    setSelectedRows(
      selectedRows.length === categories.length
        ? [] // Nếu đã chọn tất cả thì bỏ chọn
        : categories.map((category) => category._id) // Chọn tất cả các category
    );
  };

  // Kiểm tra xem một hàng có được chọn không
  const isSelected = (id) => selectedRows.includes(id);

  const handleDeleteCategory = async (categoryId) => {
    // Hiển thị hộp thoại xác nhận
    const isConfirmed = window.confirm("Are you sure you want to delete this category?");
    
    if (isConfirmed) {
  
      try {
        const response = await fetch(`/api/category/delete-category/${categoryId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        const data = await response.json(); 
  
        if (response.ok) {
          alert("Category deleted successfully!");
          // Cập nhật UI hoặc làm mới danh sách category nếu cần
          setCategories(categories.filter((category) => category._id !== categoryId)); // Cập nhật lại danh sách
        } else {
          alert(`Error: ${data.message}`);
        }
      } catch (error) {
        console.error("Error deleting category:", error);
        alert("Something went wrong!");
      }
    } else {
      // Nếu người dùng chọn "Cancel", không làm gì cả
      console.log("Category deletion cancelled.");
    }
  };
  
  return (
    <div>
      <div className="container-xl">
        <div className="category-list__info">
          {/* Side Menu */}
          <div className="side-menu__category">
            <SideMenuComponent className="btn-menu">Thông tin cửa hàng</SideMenuComponent>
            <SideMenuComponent className="btn-menu">Đơn hàng</SideMenuComponent>
            <SideMenuComponent className="btn-menu">Khuyến mãi</SideMenuComponent>
            <SideMenuComponent className="btn-menu">Trạng thái</SideMenuComponent>
            <SideMenuComponent className="btn-menu">Loại sản phẩm</SideMenuComponent>
            <SideMenuComponent className="btn-menu">Danh sách người dùng</SideMenuComponent>
            <SideMenuComponent className="btn-menu">Thống kê</SideMenuComponent>
          </div>
          {/* Category List */}
          <div className="category-list__content">
            <div className="category-list__action">
              <h2 className="category-list__title">Loại bánh hiện có</h2>
              <div className="btn__action">
                <ButtonComponent className="btn btn-delete">Chi tiết</ButtonComponent>
                <ButtonComponent className="btn btn-delete">Xóa</ButtonComponent>
                <ButtonComponent className="btn btn-add">Thêm</ButtonComponent>
                <ButtonComponent className="btn btn-edit">Sửa</ButtonComponent>
              </div>
            </div>
            {/* Table */}
            <div className="table-container">
              <table className="promo-table">
                <thead>
                  <tr>
                    <th>
                      <CheckboxComponent
                        isChecked={selectedRows.length === categories.length}
                        onChange={toggleSelectAll}
                      />
                    </th>
                    <th>STT</th>
                    <th>Mã loại</th>
                    <th>Tên loại</th>
                    <th>Ngày tạo</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((category, index) => (
                    <tr
                      key={category._id} // Sử dụng _id làm key cho mỗi hàng
                      className={isSelected(category._id) ? "highlight" : ""}
                    >
                      <td>
                        <CheckboxComponent
                          isChecked={isSelected(category._id)}
                          onChange={() => toggleSelectRow(category._id)} // Chọn hàng dựa trên _id
                        />
                      </td>
                      <td>{index + 1}</td>
                      <td>{category.categoryCode}</td> {/* Hiển thị mã loại */}
                      <td>{category.categoryName}</td> {/* Hiển thị tên loại */}
                      <td>{new Date(category.createdAt).toLocaleDateString("vi-VN")}</td> {/* Hiển thị ngày tạo */}
                      <td>
                        <button 
                          className="delete-btn" 
                          onClick={() => handleDeleteCategory(category._id) } // Gọi delete cho từng category
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="19"
                            height="24"
                            viewBox="0 0 19 24"
                            fill="none"
                          >
                            <path
                              d="M1.35714 21.3333C1.35714 22.8 2.57857 24 4.07143 24H14.9286C16.4214 24 17.6429 22.8 17.6429 21.3333V8C17.6429 6.53333 16.4214 5.33333 14.9286 5.33333H4.07143C2.57857 5.33333 1.35714 6.53333 1.35714 8V21.3333ZM17.6429 1.33333H14.25L13.2864 0.386667C13.0421 0.146667 12.6893 0 12.3364 0H6.66357C6.31071 0 5.95786 0.146667 5.71357 0.386667L4.75 1.33333H1.35714C0.610714 1.33333 0 1.93333 0 2.66667C0 3.4 0.610714 4 1.35714 4H17.6429C18.3893 4 19 3.4 19 2.66667C19 1.93333 18.3893 1.33333 17.6429 1.33333Z"
                              fill="currentColor"
                            />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryListPage;

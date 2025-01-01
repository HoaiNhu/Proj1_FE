import React, { useState, useEffect } from "react";
import "./DiscountListPage.css";
import SideMenuComponent from "../../../../components/SideMenuComponent/SideMenuComponent";
import ButtonComponent from "../../../../components/ButtonComponent/ButtonComponent";
import CheckboxComponent from "../../../../components/CheckboxComponent/CheckboxComponent";
import { useNavigate } from "react-router-dom";
import { getAllDiscount } from "../../../../services/DiscountService";

const DiscountListPage = () => {
  const accessToken = localStorage.getItem("access_token");
  const [selectedRows, setSelectedRows] = useState([]);
  const [promos, setPromos] = useState([]);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch danh sách category
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/category/get-all-category", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }

        const data = await response.json();
        if (Array.isArray(data.data)) {
          setCategories(data.data); // Lưu danh sách category
        } else {
          console.error("Categories data is not in expected format");
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // Fetch danh sách khuyến mãi
  useEffect(() => {
    const fetchDiscounts = async () => {
      try {
        const discounts = await getAllDiscount(accessToken);
        if (Array.isArray(discounts.data)) {
          setPromos(discounts.data); // Lưu danh sách khuyến mãi
        } else {
          setError("Dữ liệu trả về không hợp lệ.");
        }
      } catch (err) {
        setError(err.message || "Không thể tải danh sách khuyến mãi.");
      }
    };
    fetchDiscounts();
  }, [accessToken]);

  const getCategoryNameById = (id) => {
    const category = categories.find((cat) => cat.id === id);
    return category ? category.categoryName : "Không xác định";
  };

  const toggleSelectRow = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    setSelectedRows(
      selectedRows.length === promos.length
        ? []
        : promos.map((promo) => promo.id)
    );
  };

  const isSelected = (id) => selectedRows.includes(id);

  const ClickInfor = () => navigate("/admin/store-info");
  const ClickOrder = () => navigate("/order-list");
  const ClickDiscount = () => navigate("/discount-list");
  const ClickStatus = () => navigate("/admin/status-list");
  const ClickCategory = () => navigate("/admin/category-list");
  const ClickUser = () => navigate("/admin/user-list");
  const ClickReport = () => navigate("/admin/report");

  return (
    <div>
      <div className="container-xl">
        <div className="discount-list__info">
          {/* Side menu */}
          <div className="side-menu__discount">
            <SideMenuComponent className="btn-menu" onClick={ClickInfor}>
              Thông tin cửa hàng
            </SideMenuComponent>
            <SideMenuComponent className="btn-menu" onClick={ClickOrder}>
              Đơn hàng
            </SideMenuComponent>
            <SideMenuComponent className="btn-menu" onClick={ClickDiscount}>
              Khuyến mãi
            </SideMenuComponent>
            <SideMenuComponent className="btn-menu" onClick={ClickStatus}>
              Trạng thái
            </SideMenuComponent>
            <SideMenuComponent className="btn-menu" onClick={ClickCategory}>
              Loại sản phẩm
            </SideMenuComponent>
            <SideMenuComponent onClick={ClickUser}>
              Danh sách người dùng
            </SideMenuComponent>
            <SideMenuComponent onClick={ClickReport}>Thống kê</SideMenuComponent>
          </div>

          {/* Discount list */}
          <div className="discount-list__content">
            <div className="discount-list__action">
              <h2 className="discount-list__title">Danh sách khuyến mãi</h2>
              <div className="btn__action">
                <ButtonComponent className="btn btn-delete">Xóa</ButtonComponent>
                <ButtonComponent className="btn btn-edit">Sửa</ButtonComponent>
                <ButtonComponent
                  className="btn btn-add"
                  onClick={() => navigate("/admin/add-discount")}
                >
                  Thêm
                </ButtonComponent>
              </div>
            </div>

            {/* Table */}
            <div className="table-container">
              <table className="promo-table">
                <thead>
                  <tr>
                    <th>
                      <CheckboxComponent
                        isChecked={selectedRows.length === promos.length}
                        onChange={toggleSelectAll}
                      />
                    </th>
                    <th>STT</th>
                    <th>Mã khuyến mãi</th>
                    <th>Tên khuyến mãi</th>
                    <th>Giá trị khuyến mãi</th>
                    <th>Loại sản phẩm</th>
                    <th>Ngày bắt đầu</th>
                    <th>Ngày kết thúc</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {promos.length > 0 ? (
                    promos.map((promo, index) => (
                      <tr
                        key={promo.id}
                        className={isSelected(promo.id) ? "highlight" : ""}
                      >
                        <td>
                          <CheckboxComponent
                            isChecked={isSelected(promo.id)}
                            onChange={() => toggleSelectRow(promo.id)}
                          />
                        </td>
                        <td>{index + 1}</td>
                        <td>{promo.discountCode}</td>
                        <td>{promo.discountName}</td>
                        <td>{promo.discountValue} VND</td>
                        <td>{getCategoryNameById(promo.aplicableCategory)}</td>
                        <td>{promo.discountStartDate}</td>
                        <td>{promo.discountEndDate}</td>
                        <td>
                          <button className="delete-btn">
                            {/* Icon */}
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="9">Không có khuyến mãi nào để hiển thị.</td>
                    </tr>
                  )}
                </tbody>
              </table>
              {error && <p className="error-message">{error}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscountListPage;

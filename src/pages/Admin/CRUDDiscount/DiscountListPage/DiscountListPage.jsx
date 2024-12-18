import React, { useState } from "react";
import "./DiscountListPage.css";
import SideMenuComponent from "../../../../components/SideMenuComponent/SideMenuComponent";
import ButtonComponent from "../../../../components/ButtonComponent/ButtonComponent";
import CheckboxComponent from "../../../../components/CheckboxComponent/CheckboxComponent";
import { useNavigate } from "react-router-dom";
const DiscountListPage = () => {
  const [selectedRows, setSelectedRows] = useState([]);

  const promos = [
    {
      id: 1,
      code: "KM1",
      name: "Summer",
      startDate: "30/5/2025",
      endDate: "2/6/2025",
    },
    {
      id: 2,
      code: "KM2",
      name: "Winter",
      startDate: "1/12/2025",
      endDate: "31/12/2025",
    },
    {
      id: 3,
      code: "KM3",
      name: "Spring",
      startDate: "1/3/2025",
      endDate: "31/3/2025",
    },
  ];

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
const navigate= useNavigate();
  const ClickInfor=()=>{navigate("/store-info")}
  const ClickOrder=()=>{navigate("/order-list")}
  const ClickDiscount=()=>{navigate("/discount-list")}
  const ClickStatus=()=>{navigate("/status-list")}
  const ClickCategory=()=>{navigate("/category-list")}
  const ClickUser=()=>{navigate("/user-list")}
  const ClickReprot=()=>{navigate("/report")}
  return (
    <div>
      <div className="container-xl">
        <div className="discount-list__info">
          {/* side menu */}
          <div className="side-menu__discount">
            <SideMenuComponent className="btn-menu" onClick={ClickInfor}>
              Thông tin cửa hàng
            </SideMenuComponent>
            <SideMenuComponent className="btn-menu" onClick={ClickOrder}>Đơn hàng</SideMenuComponent>
            <SideMenuComponent className="btn-menu" onClick={ClickDiscount}>
              Khuyến mãi
            </SideMenuComponent>
            <SideMenuComponent className="btn-menu" onClick={ClickStatus}>
              Trạng thái
            </SideMenuComponent>
            <SideMenuComponent className="btn-menu" onClick={ClickCategory}>
              Loại sản phẩm{" "}
            </SideMenuComponent >
            <SideMenuComponent onClick={ClickUser}>Danh sách người dùng</SideMenuComponent>
            <SideMenuComponent onClick={ClickReprot}>Thống kê</SideMenuComponent>
          </div>
          {/* discount list */}
          <div className="discount-list__content">
            <div className="discount-list__action">
              <h2 className="discount-list__title">Danh sách khuyến mãi</h2>
              <div className="btn__action">
                <ButtonComponent className="btn btn-delete">
                  Xóa
                </ButtonComponent>
                <ButtonComponent className="btn btn-edit">Sửa</ButtonComponent>
                <ButtonComponent className="btn btn-add">Thêm</ButtonComponent>
              </div>
            </div>
            {/* table */}
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
                    <th>Ngày bắt đầu</th>
                    <th>Ngày kết thúc</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {promos.map((promo, index) => (
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
                      <td>{promo.code}</td>
                      <td>{promo.name}</td>
                      <td>{promo.startDate}</td>
                      <td>{promo.endDate}</td>
                      <td>
                        <button className="delete-btn">
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

export default DiscountListPage;

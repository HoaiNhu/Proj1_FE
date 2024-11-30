import React, { useState } from "react";
import "./ReportPage.css";
import SideMenuComponent from "../../../components/SideMenuComponent/SideMenuComponent";
import ButtonComponent from "../../../components/ButtonComponent/ButtonComponent";
import CheckboxComponent from "../../../components/CheckboxComponent/CheckboxComponent";
import DropdownComponent from "../../../components/DropdownComponent/DropdownComponent";

const ReportPage = () => {
  const [selectedRows, setSelectedRows] = useState([]);

  const promos = [
    {
      id: 1,
      code: "SP1",
      name: "Green Tea Flour Love",
      price: "250.000",
      quantity: "20",
      total: "5.000.000",
      percentage: "20%",
    },
    {
      id: 1,
      code: "SP1",
      name: "Green Tea Flour Love",
      price: "250.000",
      quantity: "20",
      total: "5.000.000",
      percentage: "20%",
    },
    {
      id: 1,
      code: "SP1",
      name: "Green Tea Flour Love",
      price: "250.000",
      quantity: "20",
      total: "5.000.000",
      percentage: "20%",
    },
    {
      id: 1,
      code: "SP1",
      name: "Green Tea Flour Love",
      price: "250.000",
      quantity: "20",
      total: "5.000.000",
      percentage: "20%",
    },
    {
      id: 1,
      code: "SP1",
      name: "Green Tea Flour Love",
      price: "250.000",
      quantity: "20",
      total: "5.000.000",
      percentage: "20%",
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

  return (
    <div>
      <div className="container-xl">
        <div className="report-list__info">
          {/* side menu */}
          <div className="side-menu__report">
            <SideMenuComponent className="btn-menu">
              Thông tin cửa hàng
            </SideMenuComponent>
            <SideMenuComponent className="btn-menu">Đơn hàng</SideMenuComponent>
            <SideMenuComponent className="btn-menu">
              Khuyến mãi
            </SideMenuComponent>
            <SideMenuComponent className="btn-menu">
              Trạng thái
            </SideMenuComponent>
            <SideMenuComponent className="btn-menu">
              Loại sản phẩm{" "}
            </SideMenuComponent>
            <SideMenuComponent className="btn-menu">
              Danh sách người dùng
            </SideMenuComponent>
            <SideMenuComponent className="btn-menu">
              Thống kê
            </SideMenuComponent>
          </div>
        
          <div className="report-list__content">
            <div className="report-list__action">
              <div className="report-dropdown-container">
                <DropdownComponent
                  placeholder="Chọn ngày"
                  className="report-dropdown"
                />
                <DropdownComponent
                  placeholder="Chọn tháng"
                  className="report-dropdown" 
                />
                <DropdownComponent
                  placeholder="Chọn năm"
                  className="report-dropdown" 
                />
                <div className="btn__action">
                <ButtonComponent className="btn-view">Xem</ButtonComponent>
              </div>
              </div>
            </div>

            <div class="report-total-container">
              <div class="report-container">
                <div class="report-title">
                  <table>
                    <tr>
                      <th>TỔNG DOANH THU</th>
                    </tr>
                  </table>
                </div>
                
                <div class="report-data">
                  <table>
                    <tr>
                      <td>10.000.000.000</td>
                    </tr>
                  </table>
                </div>
              </div>

              <div class="report-container">
                <div class="report-title">
                  <table>
                    <tr>
                      <th>TỔNG SẢN PHẨM BÁN RA</th>
                    </tr>
                  </table>
                </div>
                
                <div class="report-data">
                  <table>
                    <tr>
                      <td>10.000</td>
                    </tr>
                  </table>
                </div>
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
                    <th>Mã sản phẩm</th>
                    <th>Tên sản phẩm</th>
                    <th>Đơn giá</th>
                    <th>Số lượng</th>
                    <th>Tổng thu</th>
                    <th>Tỉ lệ</th>
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
                      <td>{promo.price}</td>
                      <td>{promo.quantity}</td>
                      <td>{promo.total}</td>
                      <td>{promo.percentage}</td>
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

export default ReportPage;

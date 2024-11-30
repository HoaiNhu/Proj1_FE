import React, { useState } from "react";
import "./OrderListPage.css";
import SideMenuComponent from "../../../../components/SideMenuComponent/SideMenuComponent";
import ButtonComponent from "../../../../components/ButtonComponent/ButtonComponent";
import CheckboxComponent from "../../../../components/CheckboxComponent/CheckboxComponent";
import DropdownComponent from "../../../../components/DropdownComponent/DropdownComponent";
const OrderListPage = () => {
  const [selectedRows, setSelectedRows] = useState([]);

  const orders = [
    {
      id: 1,
      orderId: "DH001",
      orderStatus: "Đang xử lý",
      orderBookDate: "28/11/2024",
      orderDelivery: "30/11/2024",
      orderTotal: "300,000 vnd",
    },
    {
      id: 2,
      orderId: "DH002",
      orderStatus: "Đã giao",
      orderBookDate: "25/11/2024",
      orderDelivery: "27/11/2024",
      orderTotal: "500,000 vnd",
    },
    {
      id: 3,
      orderId: "DH003",
      orderStatus: "Đã hủy",
      orderBookDate: "20/11/2024",
      orderDelivery: "—",
      orderTotal: "0 vnd",
    },
    {
      id: 4,
      orderId: "DH004",
      orderStatus: "Đang giao",
      orderBookDate: "27/11/2024",
      orderDelivery: "Dự kiến 29/11/2024",
      orderTotal: "450,000 vnd",
    },
    {
      id: 5,
      orderId: "DH005",
      orderStatus: "Đang xử lý",
      orderBookDate: "29/11/2024",
      orderDelivery: "Dự kiến 01/12/2024",
      orderTotal: "250,000 vnd",
    },
  ];

  const toggleSelectRow = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    setSelectedRows(
      selectedRows.length === orders.length
        ? []
        : orders.map((order) => order.id)
    );
  };

  const isSelected = (id) => selectedRows.includes(id);
  return (
    <div>
      <div className="container-xl">
        <div className="order-list__info">
          {/* side menu */}
          <div className="side-menu__order">
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
              Loại sản phẩm
            </SideMenuComponent>
            <SideMenuComponent className="btn-menu">
              Danh sách người dùng
            </SideMenuComponent>
            <SideMenuComponent className="btn-menu">Thống kê</SideMenuComponent>
          </div>
          {/* order list */}
          <div className="order-list__content">
            <div className="order-list__action">
              <h2 className="order-list__title">Danh sách khuyến mãi</h2>
              <div className="btn__action">
                <ButtonComponent className="btn btn-delete">
                  Chi tiết
                </ButtonComponent>
                <ButtonComponent className="btn btn-edit">
                  Hủy đơn
                </ButtonComponent>
                <ButtonComponent className="btn btn-add">
                  Cập nhật{" "}
                </ButtonComponent>
              </div>
            </div>
            <div className="filter-order">
              <DropdownComponent placeholder="Trạng thái"></DropdownComponent>
              <ButtonComponent>Lọc</ButtonComponent>
            </div>
            {/* table */}
            <div className="table-container">
              <table className="order-table">
                <thead>
                  <tr>
                    <th>
                      <CheckboxComponent
                        isChecked={selectedRows.length === orders.length}
                        onChange={toggleSelectAll}
                      />
                    </th>
                    <th>STT</th>
                    <th>Mã đơn</th>
                    <th>Trạng thái</th>
                    <th>Ngày đặt</th>
                    <th>Ngày giao</th>
                    <th>Tổng tiền</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, index) => (
                    <tr
                      key={order.id}
                      className={isSelected(order.id) ? "highlight" : ""}
                    >
                      <td>
                        <CheckboxComponent
                          isChecked={isSelected(order.id)}
                          onChange={() => toggleSelectRow(order.id)}
                        />
                      </td>
                      <td>{index + 1}</td>
                      <td>{order.orderId}</td>
                      <td>{order.orderStatus}</td>
                      <td>{order.orderBookDate}</td>
                      <td>{order.orderDelivery}</td>
                      <td>{order.orderTotal}</td>
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

export default OrderListPage;

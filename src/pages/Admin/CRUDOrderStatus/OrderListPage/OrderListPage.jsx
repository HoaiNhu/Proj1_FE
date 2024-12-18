import React, { useState } from "react";
import "./OrderListPage.css";
import SideMenuComponent from "../../../../components/SideMenuComponent/SideMenuComponent";
import ButtonComponent from "../../../../components/ButtonComponent/ButtonComponent";
import CheckboxComponent from "../../../../components/CheckboxComponent/CheckboxComponent";
import DropdownComponent from "../../../../components/DropdownComponent/DropdownComponent";
import { useNavigate } from "react-router-dom";
const OrderListPage = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const navigate = useNavigate();

  const orders = [
    {
      id: 1,
      orderId: "DH001",
      orderStatus: "Đang xử lý",
      orderBookDate: "28/11/2024",
      orderDelivery: "30/11/2024",
      orderTotal: "300,000 vnd",
      products: [
        { name: "Tiramisu", size: "20 cm", price: "100,000", quantity: 1 },
      ],
    },
    {
      id: 2,
      orderId: "DH002",
      orderStatus: "Đã giao",
      orderBookDate: "25/11/2024",
      orderDelivery: "27/11/2024",
      orderTotal: "500,000 vnd",
      products: [
        { name: "Bánh kem", size: "18 cm", price: "200,000", quantity: 2 },
      ],
    },
    // Thêm các đơn hàng khác
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

  const handleDetail = () => {
    if (selectedRows.length === 1) {
      const selectedOrder = orders.find(
        (order) => order.id === selectedRows[0]
      );
      navigate("/admin/order-detail/", { state: selectedOrder }); // Điều hướng kèm dữ liệu
    } else {
      alert("Vui lòng chọn 1 đơn hàng để xem chi tiết!");
    }
  };

  const isSelected = (id) => selectedRows.includes(id);

  //const navigate= useNavigate();
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
        <div className="order-list__info">
          {/* side menu */}
          <div className="side-menu__order">
          <SideMenuComponent onClick={ClickInfor}>Thông tin cửa hàng</SideMenuComponent>
            <SideMenuComponent onClick={ClickOrder}>Đơn hàng</SideMenuComponent>
            <SideMenuComponent onClick={ClickDiscount}>Khuyến mãi</SideMenuComponent>
            <SideMenuComponent onClick={ClickStatus}>Trạng thái</SideMenuComponent>
            <SideMenuComponent onClick={ClickCategory}>Loại sản phẩm</SideMenuComponent>
            <SideMenuComponent onClick={ClickUser}>Danh sách người dùng</SideMenuComponent>
            <SideMenuComponent onClick={ClickReprot}>Thống kê</SideMenuComponent>
          </div>
          {/* order list */}
          <div className="order-list__content">
            <div className="order-list__action">
              <h2 className="order-list__title">Danh sách khuyến mãi</h2>
              <div className="btn__action">
                <ButtonComponent
                  className="btn btn-detail"
                  onClick={handleDetail}
                >
                  Chi tiết
                </ButtonComponent>
                <ButtonComponent className="btn btn-cancel">
                  Hủy đơn
                </ButtonComponent>
                <ButtonComponent className="btn btn-update">
                  Cập nhật
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

import React, { useEffect, useState } from "react";
import "./OrderListPage.css";
import SideMenuComponent from "../../../../components/SideMenuComponent/SideMenuComponent";
import ButtonComponent from "../../../../components/ButtonComponent/ButtonComponent";
import CheckboxComponent from "../../../../components/CheckboxComponent/CheckboxComponent";
import DropdownComponent from "../../../../components/DropdownComponent/DropdownComponent";
import { useNavigate } from "react-router-dom";
import * as OrderService from "../../../../services/OrderService";

const OrderListPage = () => {
  const [orders, setOrders] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const ClickInfor = () => {
    navigate("/admin/store-info");
  };
  const ClickOrder = () => {
    navigate("/admin/order-list");
  };
  const ClickDiscount = () => {
    navigate("/admin/discount-list");
  };
  const ClickStatus = () => {
    navigate("/admin/status-list");
  };
  const ClickCategory = () => {
    navigate("/admin/category-list");
  };
  const ClickUser = () => {
    navigate("/admin/user-list");
  };
  const ClickReport = () => {
    navigate("/admin/report");
  };

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
      const selectedOrderId = selectedRows[0]; // Lấy ID của đơn hàng được chọn

      const selectedOrder = orders.find(
        (order) => order._id === selectedOrderId // Tìm đơn hàng trong danh sách
      );

      if (selectedOrder) {
        navigate("/admin/order-detail", { state: selectedOrder }); // Truyền dữ liệu qua state
      } else {
        alert("Không tìm thấy đơn hàng đã chọn.");
      }
    } else {
      alert("Vui lòng chọn 1 đơn hàng để xem chi tiết!");
    }
  };

  const isSelected = (id) => selectedRows.includes(id);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("access_token");
        // console.log("token", token);
        const response = await OrderService.getAllOrders(token);
        console.log("response", response);
        setOrders(response?.data || []);
      } catch (err) {
        setError(err.message || "Đã xảy ra lỗi khi tải danh sách đơn hàng.");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  console.log("orders", orders);
  return (
    <div>
      <div className="container-xl">
        <div className="order-list__info">
          {/* side menu */}
          <div className="side-menu__order">
            <SideMenuComponent onClick={ClickInfor}>
              Thông tin cửa hàng
            </SideMenuComponent>
            <SideMenuComponent onClick={ClickOrder}>Đơn hàng</SideMenuComponent>
            <SideMenuComponent onClick={ClickDiscount}>
              Khuyến mãi
            </SideMenuComponent>
            <SideMenuComponent onClick={ClickStatus}>
              Trạng thái
            </SideMenuComponent>
            <SideMenuComponent onClick={ClickCategory}>
              Loại sản phẩm
            </SideMenuComponent>
            <SideMenuComponent onClick={ClickUser}>
              Danh sách người dùng
            </SideMenuComponent>
            <SideMenuComponent onClick={ClickReport}>
              Thống kê
            </SideMenuComponent>
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
                      key={order._id}
                      className={isSelected(order._id) ? "highlight" : ""}
                    >
                      <td>
                        <CheckboxComponent
                          isChecked={isSelected(order._id)}
                          onChange={() => toggleSelectRow(order._id)}
                        />
                      </td>
                      <td>{index + 1}</td>
                      <td>{order.orderCode}</td>
                      <td>{order.status?.statusName || "Không xác định"}</td>
                      <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                      <td>
                        {order.deliveryDate
                          ? new Date(order.deliveryDate).toLocaleDateString()
                          : "Chưa xác định"}
                      </td>
                      <td>{order.totalPrice?.toLocaleString()} VND</td>
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

import React from "react";
import ButtonComponent from "../../../../components/ButtonComponent/ButtonComponent";
import SideMenuComponent from "../../../../components/SideMenuComponent/SideMenuComponent";
import "./UserListPage.css";
import img from "../../../../assets/img/avatar_1.jpg";
import { useNavigate } from "react-router-dom";

const UserListPage = () => {
  // Dữ liệu người dùng mẫu
  const users = [
    {
      id: 1,
      familyName: "Nguyễn",
      name: "Văn A",
      phone: "0912345678",
      email: "vana@example.com",
      password: "password123",
      address: "123 Đường ABC, Quận 1, TP. HCM",
      role: "Admin",
      createdAt: "01/01/2025",
      updateAt: "05/01/2025",
    },
    {
      id: 2,
      familyName: "Trần",
      name: "Thị B",
      phone: "0923456789",
      email: "thib@example.com",
      password: "password456",
      address: "456 Đường DEF, Quận 2, TP. HCM",
      role: "Khách hàng",
      createdAt: "02/01/2025",
      updateAt: "06/01/2025",
    },
    {
      id: 3,
      familyName: "Lê",
      name: "Hữu C",
      phone: "0934567890",
      email: "huuc@example.com",
      password: "password789",
      address: "789 Đường GHI, Quận 3, TP. HCM",
      role: "Nhân viên",
      createdAt: "03/01/2025",
      updateAt: "07/01/2025",
    },
  ];

  const navigate= useNavigate();
    const ClickInfor=()=>{navigate("/store-info")}
    const ClickOrder=()=>{navigate("/order-list")}
    const ClickDiscount=()=>{navigate("/discount-list")}
    const ClickStatus=()=>{navigate("/status-list")}
    const ClickCategory=()=>{navigate("/category-list")}
    const ClickUser=()=>{navigate("/user-list")}
    const ClickReprot=()=>{navigate("/report")}

  return (
    <div className="container-xl">
      <div className="user-list__info">
        {/* Menu bên trái */}
        <div className="side-menu__user">
        <SideMenuComponent onClick={ClickInfor}>Thông tin cửa hàng</SideMenuComponent>
            <SideMenuComponent onClick={ClickOrder}>Đơn hàng</SideMenuComponent>
            <SideMenuComponent onClick={ClickDiscount}>Khuyến mãi</SideMenuComponent>
            <SideMenuComponent onClick={ClickStatus}>Trạng thái</SideMenuComponent>
            <SideMenuComponent onClick={ClickCategory}>Loại sản phẩm</SideMenuComponent>
            <SideMenuComponent onClick={ClickUser}>Danh sách người dùng</SideMenuComponent>
            <SideMenuComponent onClick={ClickReprot}>Thống kê</SideMenuComponent>
        </div>

        {/* Nội dung chính */}
        <div className="user-list__content">
          {/* Header */}
          <div className="admin-top">
            <h2 className="user-list__title">Danh sách người dùng</h2>
            <div className="tag-admin">
              <img className="admin-avatar" src={img} alt="avatar" />
              <div className="name-role">
                <h3 className="admin-name">Nguyễn Văn A</h3>
                <label className="role">Admin</label>
              </div>
            </div>
          </div>

          {/* Nút thêm */}
          <div className="btn__action">
            <ButtonComponent className="btn btn-add">Thêm</ButtonComponent>
          </div>

          {/* Bảng người dùng */}
          <div className="table-container">
            <table className="promo-table">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Họ</th>
                  <th>Tên</th>
                  <th>Số điện thoại</th>
                  <th>Email</th>
                  <th>Mật khẩu</th>
                  <th>Địa chỉ</th>
                  <th>Vai trò</th>
                  <th>Ngày tạo</th>
                  <th>Chỉnh sửa gần nhất</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user.id}>
                    <td>{index + 1}</td>
                    <td>{user.familyName}</td>
                    <td>{user.name}</td>
                    <td>{user.phone}</td>
                    <td>{user.email}</td>
                    <td>{user.password}</td>
                    <td>{user.address}</td>
                    <td>{user.role}</td>
                    <td>{user.createdAt}</td>
                    <td>{user.updateAt}</td>
                    <td>
                      {/* Hành động chỉnh sửa */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M14.06 9.02L14.98 9.94L5.92 19H5V18.08L14.06 9.02ZM17.66 3C17.41 3 17.15 3.1 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04C20.8027 6.94749 20.8762 6.8376 20.9264 6.71662C20.9766 6.59565 21.0024 6.46597 21.0024 6.335C21.0024 6.20403 20.9766 6.07435 20.9264 5.95338C20.8762 5.8324 20.8027 5.72251 20.71 5.63L18.37 3.29C18.17 3.09 17.92 3 17.66 3ZM14.06 6.19L3 17.25V21H6.75L17.81 9.94L14.06 6.19Z"
                          fill="#3A060E"
                        />
                      </svg>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserListPage;

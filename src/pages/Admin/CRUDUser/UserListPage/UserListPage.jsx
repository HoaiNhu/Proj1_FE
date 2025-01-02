import React, { useEffect, useState } from "react";
import ButtonComponent from "../../../../components/ButtonComponent/ButtonComponent";
import SideMenuComponent from "../../../../components/SideMenuComponent/SideMenuComponent";
import "./UserListPage.css";
import img from "../../../../assets/img/avatar_1.jpg";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { isAdmin } from "../../../../utils";
import { setAllUser, setDetailUser } from "../../../../redux/slides/userSlide";
import Message from "../../../../components/MessageComponent/Message";
import { useMutationHook } from "../../../../hooks/useMutationHook";
import * as UserService from "../../../../services/UserService";
import { getAllUser } from "../../../../services/UserService";
import EditIconComponent from "../../../../components/EditIconComponent/EditIconComponent";
import CheckboxComponent from "../../../../components/CheckboxComponent/CheckboxComponent";

const UserListPage = () => {
  const navigate = useNavigate();
  const ClickInfor=()=>{navigate("/admin/store-info")}
  const ClickOrder=()=>{navigate("/admin/order-list")}
  const ClickDiscount=()=>{navigate("/admin/discount-list")}
  const ClickStatus=()=>{navigate("/admin/status-list")}
  const ClickCategory=()=>{navigate("/admin/category-list")}
  const ClickUser=()=>{navigate("/admin/user-list")}
  const ClickReprot=()=>{navigate("/admin/report")}

  const user = useSelector((state) => state.user.allUser || []);
  const userCurrent = useSelector((state) => state.user || {});

  const dispatch = useDispatch();
  const accessToken = localStorage.getItem("access_token");

  const [selectedRows, setSelectedRows] = useState([]);
  const [statusMessage, setStatusMessage] = useState(null);
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    if (!accessToken || !isAdmin(accessToken)) {
      navigate("/login"); // Điều hướng về trang đăng nhập nếu không phải admin
    }
  }, [accessToken, navigate]);

  const isSelected = (userEmail) => selectedRows.includes(userEmail);

  const toggleSelectRow = (userEmail) => {
    setSelectedRows((prev) =>
      prev.includes(userEmail)
        ? prev.filter((email) => email !== userEmail)
        : [...prev, userEmail]
    );
  };

  const toggleSelectAll = () => {
    setSelectedRows(
      selectedRows.length === user.length
        ? []
        : user.map((item) => item.userEmail)
    );
  };

  const fetchData = async () => {
    setShowLoading(true);
    try {
      const response = await getAllUser(accessToken); // Gọi API để lấy danh sách status
      // console.log("response", response);
      dispatch(setAllUser(response.data)); // Lưu danh sách status vào Redux
    } catch (error) {
      console.error("Failed to fetch statuses", error.message);
    } finally {
      setShowLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [dispatch]);

  const handleAddUser = () => {
    navigate("/admin/add-user", { state: { from: "/admin/user-list" } });
  };

  const mutation = useMutationHook(UserService.getAllUser);
  useEffect(() => {
    if (mutation.isSuccess) {
      setStatusMessage({
        type: "Success",
        message: "Lấy danh sách trạng thái thành công!",
      });
    } else if (mutation.isError) {
      const errorMessage =
        mutation.error?.message.message || "Lỗi khi lấy danh sách trạng thái.";
      setStatusMessage({
        type: "Error",
        message: errorMessage,
      });
    }
  }, [mutation.isSuccess, mutation.isError, mutation.error]);

  // const handleEditUser = () => {
  //   if (selectedRows.length === 1) {
  //     const selectedStatus = user.find(
  //       (item) => item.userEmail === selectedRows[0]
  //     );
  //     dispatch(setDetailUser(selectedStatus)); // Lưu trạng thái vào Redux
  //     navigate("/update-status"); // Điều hướng đến trang sửa
  //   } else {
  //     alert("Vui lòng chọn một người dùng để sửa.");
  //   }
  // };

  const handleDeleteUser = async () => {
    if (selectedRows.length === 0) {
      alert("Vui lòng chọn ít nhất một người dùng để xóa.");
      return;
    }

    if (window.confirm("Bạn có chắc chắn muốn xóa các người dùng đã chọn?")) {
      try {
        await Promise.all(
          selectedRows.map(async (email) => {
            const userToDelete = user.find((item) => item.userEmail === email);
            console.log("User to delete:", userToDelete);
            if (!userToDelete) {
              throw new Error(
                `Không tìm thấy người dùng với userEmail: ${email}`
              );
            }

            // Gọi API xóa với `_id`
            await UserService.deleteUser(userToDelete._id, accessToken);
          })
        );

        const response = await getAllUser(accessToken);
        dispatch(setAllUser(response.data));

        setStatusMessage({
          type: "Success",
          message: "Xóa người dùng thành công!",
        });

        setSelectedRows([]);
      } catch (error) {
        console.error("Failed to delete users", error);

        setStatusMessage({
          type: "Error",
          message:
            typeof error.message === "string"
              ? error.message
              : JSON.stringify(error.message) || "Xóa người dùng thất bại.",
        });
      }
    }
  };

  return (
    <div className="container-xl">
      {statusMessage && (
        <Message
          type={statusMessage.type}
          message={statusMessage.message}
          duration={3000}
          onClose={() => setStatusMessage(null)}
        />
      )}
      <div className="user-list__info">
        {/* Menu bên trái */}
        <div className="side-menu__user">
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
          <SideMenuComponent onClick={ClickReprot}>Thống kê</SideMenuComponent>
        </div>

        {/* Nội dung chính */}
        <div className="user-list__content">
          {/* Header */}
          <div className="admin-top">
            <h2 className="user-list__title">Danh sách người dùng</h2>
            <div className="tag-admin">
              <img
                className="admin-avatar"
                src={userCurrent.userImage || img}
                alt="avatar"
              />
              <div className="name-role">
                <h3 className="admin-name">
                  {(userCurrent.familyName || "") +
                    " " +
                    (userCurrent.userName || "")}
                </h3>
                <label className="role">Admin</label>
              </div>
            </div>
          </div>

          {/* Nút thêm */}
          <div className="btn__action">
            <ButtonComponent onClick={handleAddUser}>Thêm</ButtonComponent>
            {/* <ButtonComponent>Chi tiết</ButtonComponent> */}
            <ButtonComponent onClick={handleDeleteUser}>Xóa</ButtonComponent>
          </div>

          {/* Bảng người dùng */}
          <div className="table-container">
            <table className="promo-table">
              <thead>
                <tr>
                  <th>
                    <CheckboxComponent
                      isChecked={selectedRows.length === user.length}
                      onChange={toggleSelectAll}
                    />
                  </th>
                  <th>STT</th>
                  <th>Họ</th>
                  <th>Tên</th>
                  <th>Số điện thoại</th>
                  <th>Email</th>
                  {/* <th>Mật khẩu</th> */}
                  <th>Địa chỉ</th>
                  <th>Vai trò</th>
                  <th>Ngày tạo</th>
                  <th>Chỉnh sửa gần nhất</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {user.map((user, index) => (
                  <tr
                    key={user.userEmail}
                    className={isSelected(user.userEmail) ? "highlight" : ""}
                  >
                    <td>
                      <CheckboxComponent
                        isChecked={isSelected(user.userEmail)}
                        onChange={() => toggleSelectRow(user.userEmail)}
                      />
                    </td>

                    <td>{index + 1}</td>
                    <td>{user.familyName}</td>
                    <td>{user.userName}</td>
                    <td>{user.userPhone}</td>
                    <td>{user.userEmail}</td>
                    {/* <td>{user.userPassword}</td> */}
                    <td>{user.userAddress}</td>
                    <td>{user.isAdmin ? "Admin" : "Khách hàng"}</td>
                    <td>{user.createdAt}</td>
                    <td>{user.updatedAt}</td>
                    <td>
                      {/* Hành động chỉnh sửa */}
                      {/* <EditIconComponent onClick={handleEditUser}/> */}
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

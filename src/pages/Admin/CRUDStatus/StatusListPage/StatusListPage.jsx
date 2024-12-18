import React, { useEffect, useState } from "react";
import "./StatusListPage.css";
import SideMenuComponent from "../../../../components/SideMenuComponent/SideMenuComponent";
import ButtonComponent from "../../../../components/ButtonComponent/ButtonComponent";
import CheckboxComponent from "../../../../components/CheckboxComponent/CheckboxComponent";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import DeleteIconComponent from "../../../../components/DeleteIconComponent/DeleteIconComponent";
import {
  setAllStatus,
  setDetailStatus,
} from "../../../../redux/slides/statusSlide";
import { deleteStatus, getAllStatus } from "../../../../services/StatusService";
import { useNavigate } from "react-router-dom";
import { isAdmin } from "../../../../utils";
import Message from "../../../../components/MessageComponent/Message";
import { useMutationHook } from "../../../../hooks/useMutationHook";
import * as StatusService from "../../../../services/StatusService";


const StatusListPage = () => {
  const status = useSelector((state) => state.status.allStatus || []);
  console.log("status", status);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("access_token");

  const [selectedRows, setSelectedRows] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [showLoading, setShowLoading] = useState(false); // Thêm trạng thái riêng
  const [statusMessage, setStatusMessage] = useState(null);

  const [statusCode, setStatusCode] = useState(null);
  const [statusName, setStatusName] = useState(null);
  const [statusDescription, setStatusDescription] = useState(null);

  useEffect(() => {
    if (!accessToken || !isAdmin(accessToken)) {
      navigate("/login"); // Điều hướng về trang đăng nhập nếu không phải admin
    }
  }, [accessToken, navigate]);

  const isSelected = (statusCode) => selectedRows.includes(statusCode);

  const toggleSelectRow = (statusCode) => {
    setSelectedRows((prev) =>
      prev.includes(statusCode)
        ? prev.filter((code) => code !== statusCode)
        : [...prev, statusCode]
    );
  };

  const toggleSelectAll = () => {
    setSelectedRows(
      selectedRows.length === status.length
        ? []
        : status.map((item) => item.statusCode)
    );
  };
  // console.log("Selected Rows:", selectedRows);


  // const isSelected = (id) => selectedRows.includes(id);
const navigate= useNavigate();
  const ClickInfor=()=>{navigate("/store-info")}
  const ClickOrder=()=>{navigate("/order-list")}
  const ClickDiscount=()=>{navigate("/discount-list")}
  const ClickStatus=()=>{navigate("/status-list")}
  const ClickCategory=()=>{navigate("/category-list")}
  const ClickUser=()=>{navigate("/user-list")}
  const ClickReprot=()=>{navigate("/report")}

  const fetchData = async () => {
    setShowLoading(true);
    try {
      const response = await getAllStatus(accessToken); // Gọi API để lấy danh sách status
      // console.log("response", response);
      dispatch(setAllStatus(response.data)); // Lưu danh sách status vào Redux
    } catch (error) {
      console.error("Failed to fetch statuses", error.message);
    } finally {
      setShowLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [dispatch]);

  const handleEdit = () => {
    if (selectedRows.length === 1) {
      const selectedStatus = status.find(
        (item) => item.statusCode === selectedRows[0]
      );
      dispatch(setDetailStatus(selectedStatus)); // Lưu trạng thái vào Redux
      navigate("/update-status"); // Điều hướng đến trang sửa
    } else {
      alert("Vui lòng chọn một trạng thái để sửa.");
    }
  };

  const handleAddStatus = () => {
    navigate("/add-status", { state: { from: "/status-list" } });
  };

  const mutation = useMutationHook(StatusService.getAllStatus);
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

  // const handleDeleteStatus = async () => {
  //   try {
  //     await Promise.all(
  //       selectedRows.map(
  //         (id) => deleteStatus(id, accessToken) // Gọi hàm deleteStatus
  //       )
  //     );
  //     const response = await getAllStatus(accessToken); // Refresh danh sách
  //     dispatch(setAllStatus(response));
  //   } catch (error) {
  //     console.error("Failed to delete statuses", error.message);
  //   }
  // };

  const handleDeleteStatus = async () => {
    if (selectedRows.length === 0) {
      alert("Vui lòng chọn ít nhất một trạng thái để xóa.");
      return;
    }

    if (window.confirm("Bạn có chắc chắn muốn xóa các trạng thái đã chọn?")) {
      try {
        await Promise.all(
          selectedRows.map(async (code) => {
            const statusToDelete = status.find(
              (item) => item.statusCode === code
            );
            console.log("Status to delete:", statusToDelete);
            if (!statusToDelete) {
              throw new Error(
                `Không tìm thấy trạng thái với statusCode: ${code}`
              );
            }

            // Gọi API xóa với `_id`
            await deleteStatus(statusToDelete._id, accessToken);
          })
        );

        const response = await getAllStatus(accessToken);
        dispatch(setAllStatus(response.data));

        setStatusMessage({
          type: "Success",
          message: "Xóa trạng thái thành công!",
        });

        setSelectedRows([]);
      } catch (error) {
        console.error("Failed to delete statuses", error);

        setStatusMessage({
          type: "Error",
          message:
            typeof error.message === "string"
              ? error.message
              : JSON.stringify(error.message) || "Xóa trạng thái thất bại.",
        });
      }
    }
  };

>>>>>>> f7c4c971f228229fa2e003a6bd8f85c72ed3a038
  return (
    <div>
      <div className="container-xl">
        {statusMessage && (
          <Message
            type={statusMessage.type}
            message={statusMessage.message}
            duration={3000}
            onClose={() => setStatusMessage(null)}
          />
        )}
        <div className="status-list__info">
          {/* side menu */}
          <div className="side-menu__status">
<<<<<<< HEAD
          <SideMenuComponent onClick={ClickInfor}>Thông tin cửa hàng</SideMenuComponent>
            <SideMenuComponent onClick={ClickOrder}>Đơn hàng</SideMenuComponent>
            <SideMenuComponent onClick={ClickDiscount}>Khuyến mãi</SideMenuComponent>
            <SideMenuComponent onClick={ClickStatus}>Trạng thái</SideMenuComponent>
            <SideMenuComponent onClick={ClickCategory}>Loại sản phẩm</SideMenuComponent>
            <SideMenuComponent onClick={ClickUser}>Danh sách người dùng</SideMenuComponent>
            <SideMenuComponent onClick={ClickReprot}>Thống kê</SideMenuComponent>
=======
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
            <SideMenuComponent className="btn-menu">Thống kê</SideMenuComponent>
>>>>>>> f7c4c971f228229fa2e003a6bd8f85c72ed3a038
          </div>
          {/* status list */}
          <div className="status-list__content">
            <div className="status-list__action">
              <h2 className="status-list__title">
                Trạng thái đơn hàng hiện có
              </h2>
              <div className="btn__action">
                <ButtonComponent
                  className="btn btn-delete"
                  onClick={handleDeleteStatus}
                >
                  Xóa
                </ButtonComponent>
                <ButtonComponent className="btn btn-edit" onClick={handleEdit}>
                  Sửa
                </ButtonComponent>
                <ButtonComponent
                  className="btn btn-add"
                  onClick={handleAddStatus}
                >
                  Thêm
                </ButtonComponent>
              </div>
            </div>
            {/* table */}
            <div className="table-container">
              <table className="promo-table">
                <thead>
                  <tr>
                    <th>
                      <CheckboxComponent
                        isChecked={selectedRows.length === status.length}
                        onChange={toggleSelectAll}
                      />
                    </th>
                    <th>STT</th>
                    <th>Mã khuyến mãi</th>
                    <th>Tên khuyến mãi</th>
                    <th>Mô tả</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {status.map((status, index) => (
                    <tr
                      key={status.statusCode}
                      className={
                        isSelected(status.statusCode) ? "highlight" : ""
                      }
                    >
                      <td>
                        <CheckboxComponent
                          isChecked={isSelected(status.statusCode)}
                          onChange={() => toggleSelectRow(status.statusCode)}
                        />
                      </td>
                      <td>{index + 1}</td>
                      <td>{status.statusCode}</td>
                      <td>{status.statusName}</td>
                      <td>{status.statusDescription}</td>
                      <td>
                        <button className="delete-btn">
                          <DeleteIconComponent onClick={handleDeleteStatus} />
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

export default StatusListPage;

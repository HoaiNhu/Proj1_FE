import React, { useState } from "react";
import "./UpdateStatus.css"; // Import file CSS
import SideMenuComponent from "../../../../components/SideMenuComponent/SideMenuComponent";
import ButtonComponent from "../../../../components/ButtonComponent/ButtonComponent";
const UpdateStatus = () => {
  const [orders, setOrders] = useState([
    {
      id: 1,
      code: "S1",
      status: "Đang làm",
      receivedDate: "5/1/2024",
      deliveryDate: "6/1/2024",
      total: "625,000 VND",
    },
    {
      id: 2,
      code: "S2",
      status: "Đang làm",
      receivedDate: "5/1/2024",
      deliveryDate: "5/1/2024",
      total: "450,000 VND",
    },
    {
      id: 3,
      code: "S3",
      status: "Đang làm",
      receivedDate: "5/1/2024",
      deliveryDate: "5/1/2024",
      total: "1,000,000 VND",
    },
    {
      id: 4,
      code: "S4",
      status: "Đang làm",
      receivedDate: "5/1/2024",
      deliveryDate: "5/1/2024",
      total: "200,000 VND",
    },
  ]);

  const [currentStatus, setCurrentStatus] = useState("Đang làm");

  const statuses = ["Đã nhận", "Đang làm", "Đang giao", "Đã giao", "Đã hủy"];

  const updateStatus = () => {
    const newStatusIndex =
      (statuses.indexOf(currentStatus) + 1) % statuses.length;
    const newStatus = statuses[newStatusIndex];

    setOrders(orders.map((order) => ({ ...order, status: newStatus })));
    setCurrentStatus(newStatus);
  };

  const isLastStatus = currentStatus === statuses[statuses.length - 1];
  const currentIndex = statuses.indexOf(currentStatus);

  const navigate = useState();
  const handelClcikExit = () => {};

  return (
    <div className="container-xl">
      <div className="holderContent-updateStatus">
        {/* side menu */}
        <div className="side-menu__discount">
          <SideMenuComponent className="btn-menu">
            Thông tin cửa hàng
          </SideMenuComponent>
          <SideMenuComponent className="btn-menu">Đơn hàng</SideMenuComponent>
          <SideMenuComponent className="btn-menu">Khuyến mãi</SideMenuComponent>
          <SideMenuComponent className="btn-menu">Trạng thái</SideMenuComponent>
          <SideMenuComponent className="btn-menu">
            Loại sản phẩm{" "}
          </SideMenuComponent>
          <SideMenuComponent className="btn-menu">
            Danh sách người dùng{" "}
          </SideMenuComponent>
          <SideMenuComponent className="btn-menu">Thống kê </SideMenuComponent>
        </div>
        <div className="right-area-UpdateStatus">
          <h1 className="UpdateStatus-title">Cập nhật trạng thái đơn hàng</h1>
          <p className="CurrentStatus">Trạng thái hiện tại</p>
          <div className="status-bar">
            <div className="progress-line-wrapper">
              <div
                className="progress-line"
                style={{
                  width: `${(currentIndex / (statuses.length - 1)) * 100}%`, // Adjust width based on current progress
                  backgroundColor: "#B1E321", // Green color for completed part
                }}
              />
              <div className="status-circle-wrapper">
                {statuses.map((status, index) => (
                  <div
                    key={index}
                    className={`status-circle ${
                      status === currentStatus ? "active" : ""
                    } ${index < currentIndex ? "completed" : ""}`}
                  >
                    <div className="car-icon">
                      {status === currentStatus && (
                        <span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              d="M18 18.5C17.6022 18.5 17.2206 18.342 16.9393 18.0607C16.658 17.7794 16.5 17.3978 16.5 17C16.5 16.6022 16.658 16.2206 16.9393 15.9393C17.2206 15.658 17.6022 15.5 18 15.5C18.3978 15.5 18.7794 15.658 19.0607 15.9393C19.342 16.2206 19.5 16.6022 19.5 17C19.5 17.3978 19.342 17.7794 19.0607 18.0607C18.7794 18.342 18.3978 18.5 18 18.5ZM19.5 9.5L21.46 12H17V9.5M6 18.5C5.60218 18.5 5.22064 18.342 4.93934 18.0607C4.65804 17.7794 4.5 17.3978 4.5 17C4.5 16.6022 4.65804 16.2206 4.93934 15.9393C5.22064 15.658 5.60218 15.5 6 15.5C6.39782 15.5 6.77936 15.658 7.06066 15.9393C7.34196 16.2206 7.5 16.6022 7.5 17C7.5 17.3978 7.34196 17.7794 7.06066 18.0607C6.77936 18.342 6.39782 18.5 6 18.5ZM20 8H17V4H3C1.89 4 1 4.89 1 6V17H3C3 17.7956 3.31607 18.5587 3.87868 19.1213C4.44129 19.6839 5.20435 20 6 20C6.79565 20 7.55871 19.6839 8.12132 19.1213C8.68393 18.5587 9 17.7956 9 17H15C15 17.7956 15.3161 18.5587 15.8787 19.1213C16.4413 19.6839 17.2044 20 18 20C18.7956 20 19.5587 19.6839 20.1213 19.1213C20.6839 18.5587 21 17.7956 21 17H23V12L20 8Z"
                              fill="#3A060E"
                            />
                          </svg>
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="status-labels">
              {statuses.map((status, index) => (
                <div key={index} className="status-label">
                  {status}
                </div>
              ))}
            </div>
          </div>
          <table className="table-data-UpdateStatus">
            <thead>
              <tr>
                <th className="headerTableUpdate">STT</th>
                <th className="headerTableUpdate">Mã đơn</th>
                <th className="headerTableUpdate">Trạng thái</th>
                <th className="headerTableUpdate"> Ngày nhận</th>
                <th className="headerTableUpdate">Ngày giao</th>
                <th className="headerTableUpdate">Tổng tiền</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="UpdateStatusCol">{order.id}</td>
                  <td className="UpdateStatusCol">{order.code}</td>
                  <td className="UpdateStatusCol">{order.status}</td>
                  <td className="UpdateStatusCol">{order.receivedDate}</td>
                  <td className="UpdateStatusCol">{order.deliveryDate}</td>
                  <td className="UpdateStatusCol">{order.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="BtnHolder-UpdateStatus">
            <div className="UpdateStatus-btn">
              <ButtonComponent
                onClick={updateStatus}
                disabled={isLastStatus}
                className="UpdateStatus-btnCustom"
              >
                Cập nhật trạng thái
              </ButtonComponent>
            </div>
            <div className="ExitHolder-btn">
              <ButtonComponent
                className="ExitBtn-Custom-updatestatus"
                onClick={handelClcikExit}
              >
                Thoát
              </ButtonComponent>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateStatus;

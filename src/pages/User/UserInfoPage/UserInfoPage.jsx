import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import "./UserInfoPage.css";
import SideMenuComponent from "../../../components/SideMenuComponent/SideMenuComponent";
import FormComponent from "../../../components/FormComponent/FormComponent";
import DropdownComponent from "../../../components/DropdownComponent/DropdownComponent";
import ButtonComponent from "../../../components/ButtonComponent/ButtonComponent";
import img from "../../../assets/img/hero_5.jpg";
import EditIconComponent from "../../../components/EditIconComponent/EditIconComponent";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../../redux/slides/userSlide";
import * as UserService from "../../../services/UserService";
import { useMutationHook } from "../../../hooks/useMutationHook";
import Loading from "../../../components/LoadingComponent/Loading";
import Message from "../../../components/MessageComponent/Message";
import { getBase64 } from "../../../utils";

Modal.setAppElement("#root");

function UserInfoPage() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  // console.log("user", user);

  const [isEditing, setIsEditing] = useState(false);
  const [showLoading, setShowLoading] = useState(false); // Thêm trạng thái riêng
  const [statusMessage, setStatusMessage] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);

  const [familyName, setFamilyName] = useState(user?.familyName);
  const [userName, setUserName] = useState(user?.userName);
  const [userPhone, setUserPhone] = useState(user?.userPhone);
  const [userEmail, setUserEmail] = useState(user?.userEmail);
  const [userAddress, setUserAddress] = useState(user?.userAddress);
  const [userImage, setUserImage] = useState(user?.userImage);

  const mutation = useMutationHook((data) => {
    const { id, access_token, ...rests } = data;
    UserService.updateUserInfo(id, rests, access_token);
  });
  const { data, isSuccess, isError } = mutation;

  useEffect(() => {
    // console.log("user Eff", user);
    if (user) {
      setFamilyName(user?.familyName || "");
      setUserName(user?.userName || "");
      setUserPhone(user?.userPhone || "");
      setUserEmail(user?.userEmail || "");
      setUserAddress(user?.userAddress || "");
      setUserImage(user?.userImage || "");
    }
  }, [user]);

  const handleFamilyNameChange = (value) => {
    setFamilyName(value);
  };
  const handleUserNameChange = (value) => {
    setUserName(value);
  };
  const handleUserPhoneChange = (value) => {
    setUserPhone(value);
  };
  const handleUserEmailChange = (value) => {
    setUserEmail(value);
  };

  const handleUserAddressChange = (value) => {
    setUserAddress(value);
  };

  // const handleUserImageChange = async (event) => {
  //   const fileList = event.target.files;
  //   if (!fileList || fileList.length === 0) {
  //     console.error("No file selected.");
  //     return;
  //   }

  //   const file = fileList[0];
  //   const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
  //   if (!validImageTypes.includes(file.type)) {
  //     console.error("Invalid file type. Please select an image.");
  //     return;
  //   }

  //   try {
  //     const preview = await getBase64(file);
  //     setUserImage(preview);
  //     console.log("Base64 preview:", preview);
  //   } catch (error) {
  //     console.error("Error converting file to base64:", error);
  //   }
  // };
  // const file = e.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       dispatch(updateUser({ userImage: reader.result }));
  //     };
  //     reader.readAsDataURL(file);
  //   }

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setShowConfirm(true);
    // console.log("showConfirm", showConfirm);
  };

  // const handleConfirmCancel = () => {
  //   setIsEditing(false);
  //   setShowConfirm(false);
  //   // Reset lại các giá trị về trạng thái ban đầu
  //   setFamilyName(user?.familyName);
  //   setUserName(user?.userName);
  //   setUserPhone(user?.userPhone);
  //   setUserEmail(user?.userEmail);
  //   setUserAddress(user?.userAddress);
  //   setUserImage(user?.userImage);
  // };

  // const handleContinueEditing = () => {
  //   setShowConfirm(false);
  // };

  const handleUpdate = () => {
    const userData = {
      id: user?.id,
      familyName,
      userName,
      userPhone,
      userEmail,
      userAddress,
      userImage,
      access_token: user?.access_token,
    };
    // console.log("User  data to update:", userData); // Log dữ liệu
    // console.log("Size of userData:", JSON.stringify(userData).length); // Log kích thước
    mutation.mutate(userData);
    // const dataSize = new Blob([JSON.stringify(userData)]).size; // Sử dụng Blob để tính kích thước
    // console.log("Size of userData:", dataSize, "bytes");
    setIsEditing(false);
  };

  const handleGetDetailsUser = async (id, token) => {
    const res = await UserService.getDetailsUser(id, token);
    // console.log("res", res);
    dispatch(updateUser({ ...res?.data, access_token: token }));
  };


  useEffect(() => {
    if (mutation.isSuccess) {
      setShowLoading(false);
      handleGetDetailsUser(user?.id, user?.access_token);
      setStatusMessage({
        type: "Success",
        message: "Cập nhật thông tin thành công",
      });
    } else if (mutation.isError) {
      // setShowLoading(false);
      const errorMessage =
        mutation.error?.message ||
        mutation.error?.message?.message ||
        "Cập nhật thông tin thất bại. Vui lòng thử lại.";
      setStatusMessage({
        type: "Error",
        message: errorMessage,
      });
      setTimeout(() => setShowLoading(false), 500); // Ẩn loading nếu lỗi
    }
  }, [mutation.isSuccess, mutation.isError, mutation.error]);

  return (
    <div>
      <div className="container-xl">
        <div className=" user-info__container">
          {statusMessage && (
            <Message
              type={statusMessage.type}
              message={statusMessage.message}
              duration={3000}
              onClose={() => setStatusMessage(null)}
            />
          )}
          {/* info top */}
          <div className="user-info__top">
            <div className="user-profile">
              <div className="section-item">
                <img
                  className="user-top__avatar"
                  src={userImage ? userImage : img}
                  alt="User Avatar"
                />

                <h2 className="user-top__name">
                  {familyName + " " + userName}
                </h2>
              </div>
              {/* {isEditing && (
                <ButtonComponent
                  className="btn__upload"
                  type="file"
                  onChange={handleUserImageChange}
                  accept="image/*"
                  // maxCount={1}
                >
                  Chọn ảnh
                </ButtonComponent>
              )} */}
            </div>
          </div>
          {/* info bot */}
          <div className="user-info__bot">
            {/* side menu */}
            <div className="side-menu__info">
              <SideMenuComponent>Thông tin cá nhân</SideMenuComponent>
              <SideMenuComponent>Khuyến mãi</SideMenuComponent>
              <SideMenuComponent>Đơn hàng</SideMenuComponent>
              <SideMenuComponent>Đăng xuất</SideMenuComponent>
            </div>
            <Loading isLoading={showLoading} />
            {!showLoading && (
              <div className="user-info">
                <div
                  className="d-flex"
                  style={{ justifyContent: "space-between" }}
                >
                  <h2 className="user-info__title">Thông tin cá nhân</h2>
                  <EditIconComponent onClick={handleEditClick} />
                </div>
                <div className="user-name form-group">
                  <label>Họ</label>
                  <FormComponent
                    className="family-name"
                    value={familyName}
                    style={{ width: "100%" }}
                    onChange={handleFamilyNameChange}
                  ></FormComponent>
                </div>
                <div className="user-name form-group">
                  <label>Tên người dùng</label>
                  <FormComponent
                    className="name"
                    value={userName}
                    style={{ width: "100%" }}
                    onChange={handleUserNameChange}
                  ></FormComponent>
                </div>

                <div className="form-row">
                  <div className="user-email form-group">
                    <label>Email</label>
                    <FormComponent
                      className="email"
                      value={userEmail}
                      style={{ width: "100%" }}
                      onChange={handleUserEmailChange}
                    ></FormComponent>
                  </div>
                  <div className="user-phone form-group">
                    <label>Số điện thoại</label>
                    <FormComponent
                      className="phone"
                      value={userPhone}
                      style={{ width: "100%" }}
                      onChange={handleUserPhoneChange}
                    ></FormComponent>
                  </div>
                </div>
                <div className="user-address form-group">
                  <label>Địa chỉ</label>
                  <FormComponent
                    className="address"
                    value={userAddress}
                    style={{ width: "100%" }}
                    onChange={handleUserAddressChange}
                  ></FormComponent>

                  <div className="form-row">
                    <DropdownComponent placeholder="Chọn phường"></DropdownComponent>
                    <DropdownComponent placeholder="Chọn quận"></DropdownComponent>
                    <DropdownComponent placeholder="Chọn thành phố"></DropdownComponent>
                  </div>
                </div>

                {isEditing && (
                  <>
                    <div className="d-flex gap-3">
                      <ButtonComponent onClick={handleUpdate}>
                        Lưu
                      </ButtonComponent>
                      <ButtonComponent onClick={handleCancelClick}>
                        Thoát
                      </ButtonComponent>
                    </div>
                  </>
                )}
                {/* <Modal
                  isOpen={showConfirm}
                  onRequestClose={handleContinueEditing} // Cho phép đóng modal khi nhấn overlay
                  contentLabel="Xác nhận thoát"
                  className="modal"
                  overlayClassName="overlay"
                  style={{
                    overlay: {
                      backgroundColor: "rgba(0, 0, 0, 0.5)",
                      zIndex: 999,
                    },
                    content: {
                      top: "50%",
                      left: "50%",
                      right: "auto",
                      bottom: "auto",
                      marginRight: "-50%",
                      transform: "translate(-50%, -50%)",
                      zIndex: 1000,
                    },
                  }}
                >
                  <h2>Bạn có chắc chắn muốn thoát không?</h2>
                  <div className="modal-buttons">
                    <button onClick={handleConfirmCancel}>Thoát</button>
                    <button onClick={handleContinueEditing}>Tiếp tục</button>
                  </div>
                </Modal> */}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserInfoPage;

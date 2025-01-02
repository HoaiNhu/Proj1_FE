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
import { useNavigate } from "react-router-dom";

function UserInfoPage() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate= useNavigate();
  console.log("user", user);

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

  // const [address, setAddress] = useState(user?.userAddress);
  const [wards, setWards] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedWard, setSelectedWard] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  // Lấy danh sách thành phố từ API
  useEffect(() => {
    const getCities = async () => {
      const data = await UserService.fetchCities();
      // console.log("Fetched Cities:", data);
      setCities(data);
    };
    getCities();
  }, []);

  // const handleCityChange = (cityCode) => {
  //   setSelectedCity(cityCode);
  //   setDistricts(
  //     cities.find((city) => city.code === cityCode)?.districts || []
  //   );
  //   setSelectedDistrict("");
  //   setSelectedWard("");
  // };

  // const handleCityChange = (cityCode) => {
  //   setSelectedCity(cityCode);
  //   const selectedCity = cities.find((city) => city.code === cityCode);
  //   setDistricts(selectedCity?.districts || []); // Cập nhật danh sách quận/huyện
  //   setWards([]); // Reset danh sách phường/xã
  //   setSelectedDistrict(""); // Reset quận/huyện
  //   setSelectedWard(""); // Reset phường/xã
  // };

  const handleCityChange = (cityCode) => {
    setSelectedCity(cityCode);

    const selectedCity = cities.find((city) => city.code === cityCode);
    console.log("Selected City:", selectedCity);

    const newDistricts = selectedCity?.districts || [];
    console.log("New Districts:", newDistricts);

    setDistricts(
      newDistricts.map((d) => ({
        label: d.name,
        value: d.code,
        wards: d.wards,
      }))
    );

    // Reset các dropdown khác
    setSelectedDistrict("");
    setWards([]);
    setSelectedWard("");
  };

  // const handleDistrictChange = (districtCode) => {
  //   setSelectedDistrict(districtCode);
  //   setWards(
  //     districts.find((district) => district.code === districtCode)?.wards || []
  //   );
  //   setSelectedWard("");
  // };

  // const handleDistrictChange = (districtCode) => {
  //   setSelectedDistrict(districtCode);
  //   const selectedDistrict = districts.find(
  //     (district) => district.code === districtCode
  //   );
  //   setWards(selectedDistrict?.wards || []); // Cập nhật danh sách phường/xã
  //   setSelectedWard(""); // Reset phường/xã
  // };

  const handleDistrictChange = (districtCode) => {
    setSelectedDistrict(districtCode);

    const selectedDistrict = districts.find((d) => d.value === districtCode);
    console.log("Selected District:", selectedDistrict);

    const newWards = selectedDistrict?.wards || [];
    console.log("New Wards:", newWards);

    setWards(
      newWards.map((w) => ({
        label: w.name,
        value: w.code,
      }))
    );

    setSelectedWard("");
  };

  const handleWardChange = (wardCode) => {
    setSelectedWard(wardCode);
  };

  //update user
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

  const handleFamilyNameChange = (e) => {
    const value = e.target.value;
    if (typeof value === "string" && value.trim().length > 0) {
      setFamilyName(value);
    }
  };

  const handleUserNameChange = (e) => {
    const value = e.target.value;
    if (typeof value === "string" && value.trim().length > 0) {
      setUserName(value);
    }
  };

  const handleUserPhoneChange = (e) => {
    const value = e.target.value;
    // Kiểm tra chỉ cho phép số và không vượt quá 10 ký tự
    if (/^\d{0,10}$/.test(value)) {
      setUserPhone(value);
    }
  };

  const handleUserEmailChange = (e) => {
    const value = e.target.value;
    // Kiểm tra email có hợp lệ hay không
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(value)) {
      setUserEmail(value);
    }
  };

  const handleUserAddressChange = (e) => {
    const value = e.target.value;
    if (typeof value === "string" && value.trim().length >= 0) {
      setUserAddress(value);
    }
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
      userCity: selectedCity,
      userDistrict: selectedDistrict,
      userWard: selectedWard,
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

  console.log(
    "Cities options:",
    cities.map((city) => ({ label: city.name, value: city.code }))
  );
  console.log(
    "Districts options:",
    districts.map((district) => ({
      label: district.name,
      value: district.code,
    }))
  );
  console.log(
    "Wards options:",
    wards.map((ward) => ({ label: ward.name, value: ward.code }))
  );

  const handleClickProfile=(()=>{
    navigate('/user-info')
  })
  const handleClickOrder=(()=>{
    navigate('/order-history')
  })

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
            <SideMenuComponent onClick={handleClickProfile}>Thông tin cá nhân</SideMenuComponent>
              {/* <SideMenuComponent>Khuyến mãi</SideMenuComponent> */}
              <SideMenuComponent onClick={handleClickOrder}>Đơn hàng</SideMenuComponent>
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
                    <DropdownComponent
                      options={cities.map((city) => ({
                        label: city.name,
                        value: city.code,
                      }))}
                      placeholder="Chọn thành phố"
                      value={selectedCity}
                      onSelect={(selectedCity) =>
                        handleCityChange(selectedCity)
                      }
                      // onSelect={handleCityChange}
                    ></DropdownComponent>
                    <DropdownComponent
                      options={districts.map((district) => ({
                        label: district.name,
                        value: district.code,
                      }))}
                      placeholder="Chọn quận/huyện"
                      value={selectedDistrict}
                      onSelect={(selectedDistrict) =>
                        handleDistrictChange(selectedDistrict)
                      }
                      // onSelect={handleDistrictChange}
                    ></DropdownComponent>
                    <DropdownComponent
                      options={wards.map((ward) => ({
                        label: ward.name,
                        value: ward.code,
                      }))}
                      placeholder="Chọn phường/xã"
                      value={selectedWard}
                      onSelect={(selectedWard) =>
                        handleWardChange(selectedWard)
                      }
                      // onSelect={handleWardChange}
                    ></DropdownComponent>
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

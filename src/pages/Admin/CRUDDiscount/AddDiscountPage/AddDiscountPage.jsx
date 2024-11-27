import React, { useEffect, useRef, useState } from "react";
import $ from "jquery";
import banner1 from "../../../../assets/img/banner_1.png";
import DropdownComponent from "../../../../components/DropdownComponent/DropdownComponent";
import FormComponent from "../../../../components/FormComponent/FormComponent";
import SideMenuComponent from "../../../../components/SideMenuComponent/SideMenuComponent";
import ButtonComponent from "../../../../components/ButtonComponent/ButtonComponent";
import "./AddDiscountPage.css";

const AddDiscountPage = () => {
  const [startDateTime, setStartDateTime] = useState("");
  const [endDateTime, setEndDateTime] = useState("");

  const startDateRef = useRef(null);
  const endDateRef = useRef(null);

  useEffect(() => {
    // Initialize Bootstrap Datepicker cho ngày bắt đầu
    $(startDateRef.current)
      .datepicker({
        format: "dd/mm/yyyy", // Định dạng dd/MM/yyyy
        autoclose: true, // Tự động đóng khi chọn ngày
        todayHighlight: true, // Làm nổi bật ngày hôm nay
      })
      .on("changeDate", (e) => {
        setStartDateTime(e.format()); // Cập nhật giá trị state khi thay đổi
      });

    // Initialize Bootstrap Datepicker cho ngày kết thúc
    $(endDateRef.current)
      .datepicker({
        format: "dd/mm/yyyy",
        autoclose: true,
        todayHighlight: true,
      })
      .on("changeDate", (e) => {
        setEndDateTime(e.format());
      });
  }, []);

  return (
    <div>
      <div className="container-xl">
        <div className="add-discount__container">
          {/* side menu */}
          <div className="side-menu__discount">
            <SideMenuComponent>Thông tin cửa hàng</SideMenuComponent>
            <SideMenuComponent>Đơn hàng</SideMenuComponent>
            <SideMenuComponent>Khuyến mãi</SideMenuComponent>
            <SideMenuComponent>Trạng thái</SideMenuComponent>
            <SideMenuComponent>Loại sản phẩm </SideMenuComponent>
            <SideMenuComponent>Danh sách người dùng</SideMenuComponent>
            <SideMenuComponent>Thống kê</SideMenuComponent>
          </div>
          {/* info */}
          <div className="add-discount__content">
            <div className="discount__info">
              {/* banner */}
              <div className="banner">
                <label className="banner__title">Banner khuyến mãi</label>
                <img
                  className="banner__image"
                  src={banner1}
                  alt="banner__discount"
                />
              </div>
              {/* content */}
              <div className="content">
                <div className="content__item">
                  <label className="id__title">Mã khuyến mãi</label>
                  <FormComponent placeholder="D1"></FormComponent>
                </div>
                <div className="content__item">
                  <label className="name__title">Tên khuyến mãi</label>
                  <FormComponent placeholder="Khuyến mãi mùa hè"></FormComponent>
                </div>
                <div className="content__item">
                  <label className="value__title">Giá trị khuyến mãi (%)</label>
                  <FormComponent placeholder="10"></FormComponent>
                </div>
                <div className="content__item">
                  <label className="category__title">Loại áp dụng</label>
                  <DropdownComponent
                    placeholder="Bánh kem"
                    style={{
                      width: "44rem",
                      borderRadius: "50px",
                      height: "4.4rem",
                      margin: "10px 0",
                    }}
                  ></DropdownComponent>
                </div>
                <div className="content__item">
                  <label className="time-start__title">
                    Ngày bắt đầu: <strong>{startDateTime}</strong>
                  </label>
                  <input
                    type="text"
                    className="form-control discount__date"
                    placeholder="Chọn ngày bắt đầu"
                    ref={startDateRef}
                  />
                </div>
                <div className="content__item">
                  <label className="time-end__title">
                    Ngày kết thúc: <strong>{endDateTime}</strong>
                  </label>
                  <input
                    type="text"
                    className="form-control discount__date"
                    placeholder="Chọn ngày kết thúc"
                    ref={endDateRef}
                  />
                </div>
              </div>

              {/* button */}
              <div className="btn__add-discount">
                <ButtonComponent>Lưu</ButtonComponent>
                <ButtonComponent>Thoát</ButtonComponent>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddDiscountPage;

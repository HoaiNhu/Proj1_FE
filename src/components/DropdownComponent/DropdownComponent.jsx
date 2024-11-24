import React, { useState } from "react";
import "./DropdownComponent.css";

const DropdownComponent = ({
  children,
  menuItems,
  placeholder = "Chọn",
  className = "",
  style = {},
  onSelect = () => {}, // Hàm callback khi chọn item
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false); // State để kiểm tra dropdown có mở không
  const [selectedItem, setSelectedItem] = useState(""); // Item được chọn

  const toggleDropdown = () => {
    setIsOpen(!isOpen); // Đổi trạng thái mở/đóng
  };

  // const handleSelectItem = (item) => {
  //   setSelectedItem(item); // Cập nhật item được chọn
  //   onSelect(item); // Gọi hàm callback truyền từ ngoài
  //   setIsOpen(false); // Đóng dropdown
  // };

  return (
    <div className={`dropdown-container ${className}`} {...props}>
      <button
        className="btn__dropdown"
        onClick={toggleDropdown}
        aria-expanded={isOpen}
        style={style}
      >
        <div className="content__dropdown">
          {selectedItem || placeholder}
          {/* Hiển thị placeholder hoặc item đã chọn */}
        </div>
        <div
          className={`icon__dropdown ${isOpen ? "rotate" : ""}`} // Thêm class rotate nếu mở dropdown
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="14"
            viewBox="0 0 25 14"
            fill="none"
          >
            <path
              d="M12.1875 13.6788C12.0277 13.6807 11.8692 13.6493 11.7223 13.5866C11.5753 13.5238 11.4432 13.4312 11.3344 13.3145L0.365625 2.38593C-0.121875 1.90022 -0.121875 1.14736 0.365625 0.661649C0.853125 0.175935 1.60875 0.175935 2.09625 0.661649L12.2119 10.7402L22.3031 0.685935C22.7906 0.20022 23.5462 0.20022 24.0337 0.685935C24.5212 1.17165 24.5212 1.92451 24.0337 2.41022L13.065 13.3388C12.8212 13.5816 12.5044 13.7031 12.2119 13.7031L12.1875 13.6788Z"
              fill="#3A060E"
            />
          </svg>
        </div>
      </button>

      {/* Menu dropdown */}
      {/* {isOpen && (
        <ul className="dropdown-menu">
          {menuItems.map((item, index) => (
            <li key={index} className="dropdown-item">
              <a href="#" onClick={() => alert(`Selected: ${item}`)}>
                {item}
              </a>

              // thay thẻ a ==> onClick={() => handleSelectItem(item)}
            </li>
          ))}
        </ul>
      )} */}
    </div>
  );
};

export default DropdownComponent;
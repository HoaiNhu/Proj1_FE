import React from "react";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import SearchBoxComponent from "../../components/SearchBoxComponent/SearchBoxComponent";
import ButtonNoBGComponent from "../../components/ButtonNoBGComponent/ButtonNoBGComponent";
import "./NotFoundPage.css";

const NotFoundPage = () => {
  return (
    <div className="bg">
      <h1>This page is unavailable</h1>
      <ButtonComponent>Đăng nhập</ButtonComponent>
      <SearchBoxComponent></SearchBoxComponent>
      <ButtonNoBGComponent className="custom_btn">home</ButtonNoBGComponent>
    </div>
  );
};

export default NotFoundPage;

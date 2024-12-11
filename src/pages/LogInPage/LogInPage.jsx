import React, { useEffect, useState } from "react";
import ButtonFormComponent from "../../components/ButtonFormComponent/ButtonFormComponent";
import FormComponent from "../../components/FormComponent/FormComponent";
import styles from "./LogInPage.css";
import img1 from "../../assets/img/hero_2.jpg";
import img2 from "../../assets/img/AVOCADO.png";
import { Link, useNavigate } from "react-router-dom";
import ForgotPassword from "../ForgotPasswordPage/pages/EnterEmail";
import { useMutation } from "@tanstack/react-query";
import * as UserService from "../../services/UserService";
import { useMutationHook } from "../../hooks/useMutationHook";
import Loading from "../../components/LoadingComponent/Loading";

const LogInPage = () => {
  const [formData, setFormData] = useState({
    userEmail: "",
    userPassword: "",
  });

  const navigate = useNavigate();
  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  const mutation = useMutationHook((data) => UserService.loginUser(data));
  const { data, isLoading } = mutation;

  // Check if all fields are filled to enable the button
  const isFormValid =
    formData.userEmail.trim() !== "" && formData.userPassword.trim() !== "";

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    mutation.mutate({
      userEmail: formData.userEmail,
      userPassword: formData.userPassword,
    });
    // console.log("userEmail: ", formData.userEmail, " ", "userPassword: ", formData.userPassword);

    // try {
    //   const response = await axios.post(
    //     `${process.env.REACT_APP_API_URL_BACKEND}/user/log-in`,
    //     formData
    //   );
    //   if (response.data.success) {
    //     alert("Đăng nhập thành công!");
    //     setTimeout(() => {
    //       navigate("/"); // Chuyển đến trang chủ
    //     }, 1000);
    //   } else {
    //     alert(response.data.message || "Đăng nhập thất bại!");
    //   }
    // } catch (error) {
    //   console.error(error);
    //   alert("Đăng nhập thất bại! Vui lòng thử lại.");
    // }
  };

  return (
    <div className="container-xl container-login">
      <div className="login-container">
        {/* logIn right */}
        <div className="login-container__img">
          <img className="login__img" src={img1} alt="Hình cái bánh" />
          <img className="login__logo" src={img2} alt="Login logo" />
        </div>
        {/* logIn left */}
        <div className="login__left">
          <h1 className="login__title">ĐĂNG NHẬP</h1>
          <Loading isLoading={isLoading} delay={500}>
            <form onSubmit={handleSubmit}>
              <FormComponent
                id="emailInput"
                name="userEmail"
                label="Email"
                type="email"
                placeholder="Nhập email"
                value={formData.userEmail}
                onChange={handleChange}
              />
              <FormComponent
                id="passwordInput"
                name="userPassword"
                label="Password"
                type="password"
                placeholder="Nhập mật khẩu"
                value={formData.userPassword}
                onChange={handleChange}
              />
              {/* hiện thông báo lỗi */}
              <span
                style={{
                  color: "red",
                  display: "block",
                  fontSize: "16px",
                  marginTop: "10px",
                }}
              >
                {data?.status === "ERR" && data?.message}
                
              </span>
              console.log(status);
              {/* Thêm phần checkbox */}
              <div className="login__extend">
                <label className="remember__password">
                  <input className="remember__checkbox" type="checkbox" />
                  Ghi nhớ mật khẩu
                </label>
                <div
                  onClick={handleForgotPassword}
                  className="forgot__password"
                >
                  Quên mật khẩu?
                </div>
              </div>
              <ButtonFormComponent type="submit" disabled={!isFormValid}>
                Đăng nhập
              </ButtonFormComponent>
            </form>
          </Loading>
          <div className="case__signup">
            Bạn chưa có tài khoản?
            <u>
              <Link to="./signup" className="btn__goto__signup">
                Đăng ký
              </Link>
            </u>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogInPage;

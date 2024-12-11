import React, { useState } from "react";
import axios from "axios";
import ButtonFormComponent from "../../components/ButtonFormComponent/ButtonFormComponent";
import FormComponent from "../../components/FormComponent/FormComponent";
import "./SignUpPage.css";
import img1 from "../../assets/img/hero_2.jpg";
import img2 from "../../assets/img/AVOCADO.png";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import * as UserService from "../../services/UserService";
import { useMutationHook } from "../../hooks/useMutationHook";
import Loading from "../../components/LoadingComponent/Loading";


const SignUpPage = () => {
  const [formData, setFormData] = useState({
    familyName: "",
    userName: "",
    userPhone: "",
    userEmail: "",
    userPassword: "",
    userConfirmPassword: "",
  });


  const mutation = useMutationHook((data) => UserService.signupUser(data));
  const { data, isLoading } = mutation;


  const navigate = useNavigate();

  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    mutation.mutate({
      familyName: formData.familyName,
      userName: formData.userName,
      userPhone: formData.userPhone,
      userEmail: formData.userEmail,
      userPassword: formData.userPassword,
      userConfirmPassword: formData.userConfirmPassword,
    });
    // try {
    //   const response = await axios.post(
    //     `${process.env.REACT_APP_API_URL_BACKEND}/user/sign-up`,
    //     formData
    //   );
    //   console.log(response.data);
    //   alert("Đăng ký thành công!");
    //   // Lưu thông tin người dùng vào context sau khi đăng ký thành công
    //   // const userData = {
    //   //   name: formData.userName,
    //   //   avatar: "/path/to/avatar.jpg", // Có thể là ảnh đại diện mặc định hoặc lấy từ response nếu có
    //   // };
    //   // login(userData); // Cập nhật context với thông tin người dùng

    //   navigate("/");
    // } catch (error) {
    //   console.error(error);
    //   alert("Đăng ký thất bại!");
    // }
  };

  return (
    <div className="container-xl container-signup">
      <div className="signup-container">
        {/* SignUp left */}
        <div className="signup-container__img">
          <img className="signup__img" src={img1} alt="Hình cái bánh" />
          <img className="signup__logo" src={img2} alt="Signup logo" />
        </div>
        {/* SignUp right */}
        <div className="signup__right">
          <h1 className="signup__title">ĐĂNG KÍ</h1>
          <form onSubmit={handleSubmit}>
            <FormComponent
              name="familyName"
              label="FamilyName"
              type="text"
              placeholder="Họ"
              value={formData.familyName}
              onChange={handleChange}
            />
            <FormComponent
              name="userName"
              label="Name"
              type="text"
              placeholder="Tên"
              value={formData.userName}
              onChange={handleChange}
            />
            <FormComponent
              name="userPhone"
              label="Phone"
              type="tel"
              placeholder="Số điện thoại"
              value={formData.userPhone}
              onChange={handleChange}
            />
            <FormComponent
              name="userEmail"
              label="Email"
              type="email"
              placeholder="Email"
              value={formData.userEmail}
              onChange={handleChange}
            />
            <FormComponent
              name="userPassword"
              label="Password"
              type="password"
              placeholder="Nhập mật khẩu"
              value={formData.userPassword}
              onChange={handleChange}
            />
            <FormComponent
              name="userConfirmPassword"
              label="ConfirmPassword"
              type="password"
              placeholder="Xác nhận mật khẩu"
              value={formData.userConfirmPassword}
              onChange={handleChange}
            />
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
            <ButtonFormComponent type="submit">
              Đăng kí tài khoản
            </ButtonFormComponent>
          </form>
          <div className="case__login">
            Bạn đã có tài khoản?
            <u>
              <Link to="./login" className="btn__goto__login">
                Đăng nhập
              </Link>
            </u>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;

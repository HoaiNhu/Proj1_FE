import React from "react";
import ButtonFormComponent from "../../components/ButtonFormComponent/ButtonFormComponent";
import FormComponent from "../../components/FormComponent/FormComponent";
import "./SignUpPage.css";
import img1 from "../../assets/img/hero_2.jpg";
import img2 from "../../assets/img/AVOCADO.png";

const SignUpPage = () => {
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
          <form>
            <FormComponent
              id="familyNameInput"
              label="FamilyName"
              type="familyName"
              placeholder="Họ"
            ></FormComponent>

            <FormComponent
              id="nameInput"
              label="Name"
              type="name"
              placeholder="Tên"
            ></FormComponent>

            <FormComponent
              id="phoneInput"
              label="Phone"
              type="tel"
              placeholder="Số điện thoại"
            ></FormComponent>

            <FormComponent
              id="emailInput"
              label="Phone number"
              type="email"
              placeholder="Email"
            ></FormComponent>

            <FormComponent
              id="passwordInput"
              label="Password"
              type="password"
              placeholder="Nhập mật khẩu"
            ></FormComponent>

            <FormComponent
              id="confirmPasswordInput"
              label="ConfirmPassword"
              type="confirmPassword"
              placeholder="Xác nhận mật khẩu"
            ></FormComponent>

            <ButtonFormComponent>Đăng kí tài khoản</ButtonFormComponent>
          </form>
          <div className="case__login">
            Bạn đã có tài khoản?
            <u>
              <a className="btn__goto__login" href="./login">
                Đăng nhập
              </a>
            </u>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;

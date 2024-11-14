import React from "react";
import ButtonFormComponent from "../../components/ButtonFormComponent/ButtonFormComponent";
import FormComponent from "../../components/FormComponent/FormComponent";
import styles from "./LogInPage.css";
import img1 from "../../assets/img/hero_2.jpg";
import img2 from "../../assets/img/AVOCADO.png";

const LogInPage = () => {
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
          <form>
            <FormComponent
              id="emailInput"
              label="Email"
              type="email"
              placeholder="Nhập email"
            />

            <FormComponent
              id="passwordInput"
              label="Password"
              type="password"
              placeholder="Nhập mật khẩu"
            />

            {/* Thêm phần checkbox */}
            <div className="login__extend">
              <label className="remember__password">
                <input className="remember__checkbox" type="checkbox" />
                Ghi nhớ mật khẩu
              </label>
              <a href="#" className="forgot__password">
                Quên mật khẩu?
              </a>
            </div>

            <ButtonFormComponent>Đăng nhập</ButtonFormComponent>
          </form>

          <div className="case__signup">
            Bạn chưa có tài khoản?
            <u>
              <a className="btn__goto__signup" href="./signup">
                Đăng ký
              </a>
            </u>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogInPage;

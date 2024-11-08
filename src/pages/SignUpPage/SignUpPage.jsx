import React from "react";
import ButtonFormComponent from "../../components/ButtonFormComponent/ButtonFormComponent";
import FormComponent from "../../components/FormComponent/FormComponent";


const SignUpPage = () => {
  return (
    <div
      className="signup-container"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "120vh",
      }}
    >
      <div
        style={{
          width: "auto",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "8px",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
          backgroundColor: "rgba(187, 229, 172, 0.3)",
        }}
      >
        <h1
          className="title title_signup"
          style={{
            marginBottom: "20px",
            textAlign: "center",
            color: "#3A060E",
          }}
        >
          Đăng kí
        </h1>
        <form
          className="signup__form"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
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

          <ButtonFormComponent
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "#5C9EAD",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontWeight: "bold",
              marginTop: "10px",
            }}
          >
            Đăng kí tài khoản
          </ButtonFormComponent>
        </form>
        <div
          style={{
            textAlign: "center",
            marginTop: "15px",
            fontSize: "14px",
            color: "#333",
          }}
        >
          Bạn đã có tài khoản{" "}
          <a
            href="./login"
            style={{
              color: "#3A060E",
              textDecoration: "none",
              fontStyle: "italic",
            }}
          >
            Đăng nhập
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;

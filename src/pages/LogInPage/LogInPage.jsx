import React from "react";
import ButtonFormComponent from "../../components/ButtonFormComponent/ButtonFormComponent";
import FormComponent from "../../components/FormComponent/FormComponent";
import Styles from "../../style";

const LogInPage = () => {
  return (
    <div
      className="login-container"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
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
          className="title title_login"
          style={{
            marginBottom: "20px",
            textAlign: "center",
            color: "#3A060E",
          }}
        >
          ĐĂNG NHẬP
        </h1>
        <form
          className="login__form"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
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
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              fontSize: "14px",
              color: "#003366",
              marginBottom: "10px",
            }}
          >
            <label style={{ display: "flex", alignItems: "center" }}>
              <input type="checkbox" style={{ marginRight: "8px" }} />
              Ghi nhớ mật khẩu
            </label>
            <a
              href="#"
              className="forgot-password"
              style={{
                textAlign: "right",
                fontSize: "14px",
                color: "#003366",
                textDecoration: "none",
              }}
            >
              Quên mật khẩu?
            </a>
          </div>

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
            }}
          >
            Đăng nhập
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
          Bạn chưa có tài khoản?{" "}
          <u>
          <a
            href="./signup"
            style={{
              color: "#003366",
              textDecoration: "none",
              fontStyle: "italic",
            }}
          >
            Đăng ký
          </a>
          </u>
        </div>
      </div>
    </div>
  );
};

export default LogInPage;

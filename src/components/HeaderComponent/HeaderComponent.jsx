import React, { useEffect, useRef, useState } from "react";
import styles from "./HeaderComponent.module.css";
import img from "../../assets/img/AVOCADO.png";
import SearchBoxComponent from "../SearchBoxComponent/SearchBoxComponent";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import ButtonNoBGComponent from "../ButtonNoBGComponent/ButtonNoBGComponent";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useSelector } from "react-redux";
import { Popover, OverlayTrigger, Button } from "react-bootstrap";
import SideMenuComponent from "../SideMenuComponent/SideMenuComponent";
import * as UserService from "../../services/UserService";
import { useDispatch } from "react-redux";
import { resetUser } from "../../redux/slides/userSlide";
import Loading from "../LoadingComponent/Loading";
import UserIconComponent from "../UserIconComponent/UserIconComponent";

const HeaderComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showLoading, setShowLoading] = useState(false);
  const [userName, setUserName] = useState("");
  const [userImage, setUserImage] = useState("");

  const handleNavigationLogin = () => {
    navigate("/login");
  };
  const handleClickCart = () => {
    navigate("/cart");
  };

  // const { user, logout } = useAuth();

  const user = useSelector((state) => state.user);
  // console.log("user", user);

  const handleLogout = async () => {
    setShowLoading(true);
    await UserService.logoutUser();
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    // console.log(
    //   "Access token after removal:",
    //   localStorage.getItem("access-token")
    // ); // Kiểm tra xem token đã bị xóa chưa
    dispatch(resetUser());
    setShowLoading(false);
  };

  useEffect(() => {
    setShowLoading(true);
    setUserName(user?.userName);
    setShowLoading(false);
  }, [user?.userName, user?.userImage]);

  const handleUserInfo = () => {
    navigate("/user-info"); // Navigate to user information page
  };

  const popover = (
    <Popover id="popover-basic">
      <Popover.Body>
        <div className="d-flex flex-column">
          <SideMenuComponent
            variant="link"
            className="text-start"
            onClick={handleUserInfo}
          >
            Thông tin người dùng
          </SideMenuComponent>
          <SideMenuComponent
            variant="link"
            className="text-start"
            onClick={handleLogout}
          >
            Đăng xuất
          </SideMenuComponent>
        </div>
      </Popover.Body>
    </Popover>
  );

  return (
    <div className="bg-white sticky-top bg-shadow">
      <div
        className="container-xl text-center "
        style={{ width: "width-screen" }}
      >
        <div className={styles.navbar}>
          <div className="container-fluid">
            {/* nav top */}
            <div className="row">
              <div className="col">
                <a className="navbar-brand" href="/">
                  <img src={img} alt="Avocado" className="navbar__img" />
                </a>
              </div>
              <div className={`col ${styles.navbar__search__form}`}>
                <SearchBoxComponent></SearchBoxComponent>
                <ButtonComponent>Tìm kiếm</ButtonComponent>
              </div>

              <div className={`col ${styles.nav__cart}`}>
                <svg
                  className="nav__icon"
                  xmlns="http://www.w3.org/2000/svg"
                  width="31"
                  height="30"
                  viewBox="0 0 31 30"
                  fill="currentColor"
                  onClick={handleClickCart}
                >
                  <path
                    d="M0 2.13924C0 1.37992 0.57647 0.769043 1.29302 0.769043H3.74436C4.92962 0.769043 5.9802 1.49981 6.47047 2.59597H28.6134C30.0303 2.59597 31.0647 4.02325 30.693 5.47337L28.4841 14.1684C28.0261 15.961 26.4907 17.2113 24.7397 17.2113H9.19658L9.48751 18.8385C9.60603 19.4836 10.1394 19.9517 10.759 19.9517H26.2913C27.0079 19.9517 27.5843 20.5626 27.5843 21.3219C27.5843 22.0812 27.0079 22.6921 26.2913 22.6921H10.759C8.89487 22.6921 7.29477 21.2877 6.94996 19.3523L4.16998 3.88052C4.13226 3.66357 3.95447 3.50943 3.74436 3.50943H1.29302C0.57647 3.50943 0 2.89855 0 2.13924ZM6.89609 27.2594C6.89609 26.8996 6.96298 26.5432 7.09294 26.2107C7.2229 25.8782 7.41338 25.5762 7.65352 25.3217C7.89365 25.0672 8.17873 24.8654 8.49249 24.7276C8.80624 24.5899 9.14252 24.519 9.48212 24.519C9.82172 24.519 10.158 24.5899 10.4717 24.7276C10.7855 24.8654 11.0706 25.0672 11.3107 25.3217C11.5509 25.5762 11.7413 25.8782 11.8713 26.2107C12.0013 26.5432 12.0682 26.8996 12.0681 27.2594C12.0682 27.6193 12.0013 27.9756 11.8713 28.3081C11.7413 28.6406 11.5509 28.9427 11.3107 29.1972C11.0706 29.4516 10.7855 29.6535 10.4717 29.7912C10.158 29.9289 9.82172 29.9998 9.48212 29.9998C9.14252 29.9998 8.80624 29.9289 8.49249 29.7912C8.17873 29.6535 7.89365 29.4516 7.65352 29.1972C7.41338 28.9427 7.2229 28.6406 7.09294 28.3081C6.96298 27.9756 6.89609 27.6193 6.89609 27.2594ZM24.9983 24.519C25.6842 24.519 26.3419 24.8078 26.8269 25.3217C27.3119 25.8356 27.5843 26.5326 27.5843 27.2594C27.5843 27.9862 27.3119 28.6833 26.8269 29.1972C26.3419 29.7111 25.6842 29.9998 24.9983 29.9998C24.3125 29.9998 23.6547 29.7111 23.1697 29.1972C22.6847 28.6833 22.4123 27.9862 22.4123 27.2594C22.4123 26.5326 22.6847 25.8356 23.1697 25.3217C23.6547 24.8078 24.3125 24.519 24.9983 24.519Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <div className={`col text-end ${styles.btn__container}`}>
                <Loading isLoading={showLoading} />
                {!showLoading && user?.isLoggedIn ? (
                  <OverlayTrigger
                    trigger="click"
                    placement="bottom"
                    overlay={popover}
                  >
                    <div className={styles.user__icon}>
                      {userImage ? (
                        <img
                          src={userImage}
                          alt="avatar"
                          style={{
                            width: "30px",
                            height: "30px",
                            borderRadius: "50%",
                            objectFit: "cover",
                          }}
                        />
                      ) : (
                        <UserIconComponent />
                      )}
                      <span>{user.userName || user.userEmail || "User"}</span>
                    </div>
                  </OverlayTrigger>
                ) : (
                  <div className="d-flex gap-2">
                    <Link to="/signup" className={styles.btn__signup}>
                      Đăng kí
                    </Link>
                    <div className={styles.btn__signup}>
                      <ButtonComponent onClick={handleNavigationLogin}>
                        Đăng nhập
                      </ButtonComponent>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* nav bottom */}
            <div className={`row ${styles.nav__bot}`}>
              <div className={styles.nav__content}>
                <ButtonNoBGComponent to="/">Trang chủ</ButtonNoBGComponent>
                <ButtonNoBGComponent to="/products">
                  Sản phẩm
                </ButtonNoBGComponent>
                <ButtonNoBGComponent to="/news">Tin tức</ButtonNoBGComponent>
                <ButtonNoBGComponent to="/introduce">
                  Giới thiệu
                </ButtonNoBGComponent>
                <ButtonNoBGComponent to="/contact">Liên hệ</ButtonNoBGComponent>
                <ButtonNoBGComponent to="/others">Khác</ButtonNoBGComponent>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderComponent;

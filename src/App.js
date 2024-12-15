import "@glints/poppins";
import axios from "axios";
import React, { Fragment, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import WebFont from "webfontloader";
import "./../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-datepicker";
import "./assets/css/reset.css";
import "./assets/css/style.css";
import DefaultComponent from "./components/DefaultComponent/DefaultComponent";
import FooterComponent from "./components/FooterComponent/FooterComponent";
import { routes } from "./routes";
import { AuthProvider } from "./context/AuthContext";
import { isJsonString } from "./utils";
import { jwtDecode } from "jwt-decode";
import { updateUser } from "./redux/slides/userSlide";
import * as UserService from "./services/UserService";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Poppins"],
      },
    });
  }, []);

  const handleDecoded = () => {
    let storageData = localStorage.getItem("access_token");
    // console.log("storageData", storageData);

    let decoded = {};
    if (storageData) {
      try {
        decoded = jwtDecode(storageData);
        console.log("decoded", decoded);
      } catch (error) {
        console.error("Token không hợp lệ", error);
      }
    }
    return { decoded, storageData };
  };

  useEffect(() => {
    const { storageData, decoded } = handleDecoded();
    console.log("decoded?.id", decoded?.id);
    if (decoded?.id) {
      handleGetDetailsUser(decoded?.id, storageData);
    }
  }, []);

  //token hết hạn
  UserService.axiosJWT.interceptors.request.use(
    async (config) => {
      // Do something before request is sent
      const currentTime = new Date();
      const { decoded } = handleDecoded();
      if (decoded?.exp < currentTime.getTime() / 1000) {
        // console.log("decoded?.exp", decoded?.exp);

        try {
          const data = await UserService.refreshToken();
          // localStorage.setItem("access_token", data?.access_token);
          config.headers["token"] = `Bearer ${data?.access_token}`;
        } catch (error) {
          console.error("Lỗi khi làm mới token", error);
        }
      }
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  const handleGetDetailsUser = async (id, token) => {
    const res = await UserService.getDetailsUser(id, token);
    // console.log("res", res);
    dispatch(updateUser({ ...res?.data, access_token: token }));
  };

  // useEffect(() => {
  //   fetchApi();
  // }, []);

  console.log(
    "REACT_APP_API_URL_BACKEND: ",
    process.env.REACT_APP_API_URL_BACKEND
  );

  const fetchApi = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL_BACKEND}/user/get-all-user`
    );
    return res.data;
  };

  const query = useQuery({ queryKey: ["todos"], queryFn: fetchApi });
  console.log("query: ", query);

  return (
    <div style={{ fontFamily: "poppins" }}>
      <Router>
        <AuthProvider>
          <Routes>
            {routes.map((route) => {
              const Page = route.page;
              const Header = route.isShowHeader ? DefaultComponent : Fragment;
              const Footer = route.isShowFooter ? FooterComponent : Fragment;
              return (
                <Route
                  key={route.path}
                  path={route.path}
                  element={
                    <div>
                      <Header />
                      <Page />
                      <Footer />
                    </div>
                  }
                />
              );
            })}
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;

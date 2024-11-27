import "@glints/poppins";
import axios from "axios";
import React, { Fragment, useEffect } from "react";
import { useQuery } from "react-query";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import WebFont from "webfontloader";
import "./../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css";
import "bootstrap-datepicker";

import "./assets/css/reset.css";
import "./assets/css/style.css";
import DefaultComponent from "./components/DefaultComponent/DefaultComponent";
import FooterComponent from "./components/FooterComponent/FooterComponent";
import { routes } from "./routes";

function App() {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Poppins"],
      },
    });
  }, []);

  // useEffect(() => {
  //   fetchApi();
  // }, []);

  // const fetchApi = async () => {
  //   const res = await axios.get(
  //     `${process.env.REACT_APP_API_URL_BACKEND}/product/get-all`
  //   );
  //   return res.data;
  // };

  // const query = useQuery({ queryKey: ["todos"], queryFn: fetchApi });

  return (
    <div style={{ fontFamily: "poppins" }}>
      <Router>
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
      </Router>
    </div>
  );
}

export default App;

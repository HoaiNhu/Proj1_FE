import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "./routes";
import "./assets/css/reset.css";
import "./assets/css/style.css";
import HeaderComponent from "./components/HeaderComponent/HeaderComponent";
import DefaultComponent from "./components/DefaultComponent/DefaultComponent";
import ButtonComponent from "./components/ButtonComponent/ButtonComponent";
import ButtonNoBGComponent from "./components/ButtonNoBGComponent/ButtonNoBGComponent";
import LogInPage from "./pages/LogInPage/LogInPage";
import "./../node_modules/bootstrap/dist/css/bootstrap.min.css";
import WebFont from "webfontloader";
import "@glints/poppins";
import FooterComponent from "./components/FooterComponent/FooterComponent";

function App() {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Poppins"],
      },
    });
  }, []);

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
                    <Header>
                      <Page />
                    </Header>
                    <Footer>
                      <Page />
                    </Footer>
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

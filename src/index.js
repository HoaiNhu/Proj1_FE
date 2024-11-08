import React from "react";
import ReactDOM from "react-dom/client";
import './assets/css/reset.css';
import "./assets/css/style.css";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import "./../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "@glints/poppins";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();

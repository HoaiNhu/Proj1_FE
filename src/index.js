import "@glints/poppins";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import "./../node_modules/bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import "./assets/css/reset.css";
import "./assets/css/style.css";
import "./index.css";
import { store } from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
// const queryClient = new QueryClient();
root.render(
  <React.StrictMode>
    {/* // <QueryClientProvider client={queryClient}> */}
    <Provider store={store}>
      <App />
    </Provider>
    {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    {/* </QueryClientProvider> */}
  </React.StrictMode>
);

import HomePage from "../pages/User/HomePage/HomePage";
import OrderPage from "../pages/User/OrderPage/OrderPage";
import ProductsPage from "../pages/User/ProductsPage/ProductsPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import LogInPage from "../pages/LogInPage/LogInPage";

export const routes = [
  {
    path: "/",
    page: HomePage,
    isShowHeader: true,
  },

  {
    path: "/order",
    page: OrderPage,
    isShowHeader: true,
  },
  {
    path: "/products",
    page: ProductsPage,
    isShowHeader: true,
  },

  {
    path: "/signup",
    page: SignUpPage,
    isShowHeader: true,
  },

  {
    path: "/login",
    page: LogInPage,
    isShowHeader: true,
  },

  {
    path: "*",
    page: NotFoundPage,
    isShowHeader: false,
  },
];

const { default: OrderPage } = require("../../pages/OrderPage/OrderPage");
const { default: ProductsPage } = require("../../pages/ProductsPage/ProductsPage");
const { default: HomePage } = require("../pages/HomePage/HomePage");
const { default: NotFoundPage } = require("../pages/NotFoundPage/NotFoundPage");

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
    path: "*",
    page: NotFoundPage,
    isShowHeader: false,
  },
];

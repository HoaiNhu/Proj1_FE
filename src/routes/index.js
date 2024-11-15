import HomePage from "../pages/User/HomePage/HomePage";
import OrderPage from "../pages/User/OrderPage/OrderPage";
import ProductsPage from "../pages/User/ProductsPage/ProductsPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import LogInPage from "../pages/LogInPage/LogInPage";
import HeaderComponent from "../components/HeaderComponent/HeaderComponent";
import IntroducePage from "../pages/User/IntroducePage/IntroducePage";
import ContactPage from "../pages/User/ContactPage/ContactPage";
import NewsPage from "../pages/User/NewsPage/NewsPage"
export const routes = [
  {
    path: "/",
    page: HomePage,
    isShowHeader: true,
    isShowFooter: true,
  },

  {
    path: "/order",
    page: OrderPage,
    isShowHeader: true,
    isShowFooter: true,
  },

  {
    path: "/products",
    page: ProductsPage,
    isShowHeader: true,
    isShowFooter: true,
  },

  {
    path: "/introduce",
    page: IntroducePage,
    isShowHeader: true,
    isShowFooter: true,
  },

  {
    path: "/signup",
    page: SignUpPage,
    isShowHeader: true,
    isShowFooter: true,
  },

  {
    path: "/login",
    page: LogInPage,
    isShowHeader: true,
    isShowFooter: true,
  },

  {
    path: "*",
    page: NotFoundPage,
    isShowHeader: false,
    isShowFooter: false,
  },

  {
    path: "/contact",
    page: ContactPage,
    isShowHeader: true,
    isShowFooter: true,
  },
  {
    path: "/news",
    page: NewsPage,
    isShowHeader: true,
    isShowFooter: true,
  },
];

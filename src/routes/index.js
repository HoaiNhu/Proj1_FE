import AddDiscountPage from "../pages/Admin/CRUDDiscount/AddDiscountPage/AddDiscountPage";
import DiscountListPage from "../pages/Admin/CRUDDiscount/DiscountListPage/DiscountListPage";
import AddProductPage from "../pages/Admin/CRUDProduct/AddProductPage/AddProductPage";
import UpdateProductPage from "../pages/Admin/CRUDProduct/UpdateProductPage/UpdateProductPage";
import ViewProductDetailPage from "../pages/Admin/CRUDProduct/ViewProductDetailPage/ViewProductDetailPage";
import StoreInfoPage from "../pages/Admin/CRUDStoreInfo/StoreInfoPage";
import ForgotPassword from "../pages/ForgotPasswordPage/pages/EnterEmail";
import EnterNewPassword from "../pages/ForgotPasswordPage/pages/EnterNewPassword";
import EnterOTP from "../pages/ForgotPasswordPage/pages/EnterOTP";
import LogInPage from "../pages/LogInPage/LogInPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import BankingInfoPage from "../pages/User/BankingInfoPage/BankingInfoPage";
import ContactPage from "../pages/User/ContactPage/ContactPage";
import HomePage from "../pages/User/HomePage/HomePage";
import IntroducePage from "../pages/User/IntroducePage/IntroducePage";
import NewsPage from "../pages/User/NewsPage/NewsPage";
import OrderPage from "../pages/User/OrderPage/OrderPage";
import ProductsPage from "../pages/User/ProductsPage/ProductsPage";
import UserInfoPage from "../pages/User/UserInfoPage/UserInfoPage";
import CartPage from "../pages/User/CartPage/CartPage"
import OrderInformationPage from "../pages/User/OrderInformationPage/OrderInformationPage";
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
    path: "/forgot-password",
    page: ForgotPassword,
    isShowHeader: true,
    isShowFooter: true,
  },

  {
    path: "/forgot-password/enter-otp",
    page: EnterOTP,
    isShowHeader: true,
    isShowFooter: true,
  },

  {
    path: "/forgot-password/new-password",
    page: EnterNewPassword,
    isShowHeader: true,
    isShowFooter: true,
  },

  {
    path: "/info",
    page: UserInfoPage,
    isShowHeader: true,
    isShowFooter: true,
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

  {
    path: "/add-product",
    page: AddProductPage,
    isShowHeader: true,
    isShowFooter: true,
  },
  {
    path: "/view-product-detail",
    page: ViewProductDetailPage,
    isShowHeader: true,
    isShowFooter: true,
  },
  {
    path: "/update-product",
    page: UpdateProductPage,
    isShowHeader: true,
    isShowFooter: true,
  },

  {
    path: "/banking-info",
    page: BankingInfoPage,
    isShowHeader: true,
    isShowFooter: true,
  },

  {
    path: "/store-info",
    page: StoreInfoPage,
    isShowHeader: true,
    isShowFooter: true,
  },

  {
    path: "/discount-list",
    page: DiscountListPage,
    isShowHeader: true,
    isShowFooter: true,
  },

  {
    path: "/add-discount",
    page: AddDiscountPage,
    isShowHeader: true,
    isShowFooter: true,
  },

  {
    path: "/cart",
    page: CartPage,
    isShowHeader: true,
    isShowFooter: true,
  },
  {
    path: "/order-information",
    page: OrderInformationPage,
    isShowHeader: true,
    isShowFooter: true,
  },
  {
    path: "*",
    page: NotFoundPage,
    isShowHeader: false,
    isShowFooter: false,
  },
];

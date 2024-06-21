import { Navigate, createBrowserRouter } from "react-router-dom";

import RootPage from "../pages/RootPage.jsx";
import RootAuthPage from "../pages/RootAuthPage.jsx";
import RootUserPage from "../pages/RootUserPage.jsx";
import RootAdminPage from "../pages/RootAdminPage.jsx";
import HomePage from "../pages/Client/HomePage/HomePage.jsx";
import TourPage from "../pages/Client/ToursPage/TourPage.jsx";
import DetailPage from "../pages/Client/DetailTourPage/DetailTourPage.jsx";
import BlogPage from "../pages/Client/BlogPage/BlogPage.jsx";
import BlogManagePage from "../pages/Client/BlogPage/BlogManagePage.jsx";
import BlogDetailPage from "../pages/Client/BlogPage/BlogDetailPage.jsx";
import BlogCreatePage from "../pages/Client/BlogPage/BlogCreatePage.jsx";
import BlogEditPage from "../pages/Client/BlogPage/BlogEditPage.jsx";
import AboutUsPage from "../pages/Client/AboutUsPage/AboutUsPage.jsx";
import MyTourPage from "../pages/Client/MyTourPage/MyTourPage.jsx";
import LoginPage from "../pages/Client/LoginPage/LoginPage.jsx";
import RegisterPage from "../pages/Client/RegisterPage/RegisterPage.jsx";
import ForgotPassword from "../pages/Client/ForgotPassword/ForgotPassword.jsx";
import OTPPage from "../pages/Client/ForgotPassword/OTPPage.jsx";
import ResetPassword from "../pages/Client/ForgotPassword/ResetPassword.jsx";
import UserDetailPage from "../pages/Client/UserDetailPage/UserDetailPage.jsx";
import UserUpdateInfo from "../pages/Client/UserDetailPage/UserUpdateInfor.jsx";
import UserChangePassword from "../pages/Client/UserDetailPage/UserChangePassword.jsx";
import BookingPage from "../pages/Client/BookingPage/BookingPage.jsx";
import SuccessCheckout from "../components/Booking/SuccessCheckout.jsx";
import ErrorPage from "../pages/ErrorPage/ErrorPage.jsx";

import HomeAdminPage from "../pages/Admin/Home/HomePage.jsx";
import ManageTourPage from "../pages/Admin/Tour/ManageTourPage.jsx";
import AddTourAdminPage from "../pages/Admin/Tour/AddTourPage.jsx";
import EditTourAdminPage from "../pages/Admin/Tour/EditTourPage.jsx";
import DetailTourAdminPage from "../pages/Admin/Tour/DetailTourPage.jsx";
import ManageCountryPage from "../pages/Admin/Country/ManageCountryPage.jsx";
import AddCountryAdminPage from "../pages/Admin/Country/AddCountryPage.jsx";
import EditCountryAdminPage from "../pages/Admin/Country/EditCountryPage.jsx";
import DetailCountryAdminPage from "../pages/Admin/Country/DetailCountryPage.jsx";
import ManageBlogPage from "../pages/Admin/Blog/ManageBlogPage.jsx";
import AddBlogAdminPage from "../pages/Admin/Blog/AddBlogPage.jsx";
import EditBlogAdminPage from "../pages/Admin/Blog/EditBlogPage.jsx";
import DetailBlogAdminPage from "../pages/Admin/Blog/DetailBlogPage.jsx";
import ManageReviewPage from "../pages/Admin/Review/ManageReviewPage.jsx";
import AddReviewAdminPage from "../pages/Admin/Review/AddReviewPage.jsx";
import EditReviewAdminPage from "../pages/Admin/Review/EditReviewPage.jsx";
import DetailReviewAdminPage from "../pages/Admin/Review/DetailReviewPage.jsx";
import ManageUserPage from "../pages/Admin/User/ManageUserPage.jsx";
import AddUserAdminPage from "../pages/Admin/User/AddUserPage.jsx";
import EditUserAdminPage from "../pages/Admin/User/EditUserPage.jsx";
import DetailUserAdminPage from "../pages/Admin/User/DetailUserPage.jsx";
import Revenue from "../pages/Admin/Statistical/Revenue.jsx";
import Schedule from "../pages/Admin/Statistical/Schedule.jsx";
import ManageBooking from "../pages/Admin/Booking/ManageBooking.jsx";
import DetailBooking from "../pages/Admin/Booking/BookingDetail.jsx";
import ManageDiscountPage from "../pages/Admin/Discount/ManageDiscountPage.jsx";
import AddDiscountPage from "../pages/Admin/Discount/CreateDiscountPage.jsx";
import EditDiscountPage from "../pages/Admin/Discount/EditDiscountPage.jsx";
import DetailDiscountPage from "../pages/Admin/Discount/DetailDiscountPage.jsx";

import ProtectedRoute from "./ProtectedRoute.jsx";

import { loader as loadData } from "../utils/Client/loadHomeData.js";
import { loader as loadTourData } from "../utils/Client/loadTourData.js";
import { loader as loadTourDetailData } from "../utils/Client/loadTourDetailData.js";
import { loader as loadUserDetail } from "../utils/Client/loadUserDetail.js";
import { loader as loadBookingTour } from "../utils/Client/loadBookingTour.js";
import { loader as loadSuccessCheckout } from "../utils/Client/loadSuccessCheckout.js";
import { loader as loadBlogData } from "../utils/Client/loadBlogData.js";
import { loader as loadBlogCreate } from "../utils/Client/loadBlogCreate.js";
import { loader as loadBlogEdit } from "../utils/Client/loadBlogEdit.js";
import { loader as loadBlogDetail } from "../utils/Client/loadBlogDetail.js";
import { loader as loadBlogManage } from "../utils/Client/loadBlogManage.js";
import { loader as loadMyTour } from "../utils/Client/loadMyTour.js";

import { loader as loadDataAdmin } from "../utils/Admin/loadDataAdmin.js";
import { loader as loadTourAdmin } from "../utils/Admin/loadTourAdmin.js";
import { loader as loadTourCreatAdmin } from "../utils/Admin/loadTourCreateAdmin.js";
import { loader as loadTourEditAdmin } from "../utils/Admin/loadTourEditAdmin.js";
import { loader as loadTourDetailAdmin } from "../utils/Admin/loadTourDetailAdmin.js";
import { loader as loadCountryAdmin } from "../utils/Admin/loadCountryAdmin.js";
import { loader as loadCountryDetailAdmin } from "../utils/Admin/loadCountryDetailAdmin.js";
import { loader as loadReviewAdmin } from "../utils/Admin/loadReviewAdmin.js";
import { loader as loadReviewCreateAdmin } from "../utils/Admin/loadReviewCreatAdmin.js";
import { loader as loadReviewEditAdmin } from "../utils/Admin/loadReviewEditAdmin.js";
import { loader as loadReviewDetailAdmin } from "../utils/Admin/loadReviewDetailAdmin.js";
import { loader as loadUserAdmin } from "../utils/Admin/loadUserAdmin.js";
import { loader as loadUserDetailAdmin } from "../utils/Admin/loadUserDetailAdmin.js";
import { loader as loadRevenue } from "../utils/Admin/loadRevenue.js";
import { loader as loadSchedule } from "../utils/Admin/loadSchedule.js";
import { loader as loadBooking } from "../utils/Admin/loadBookingAdmin.js";
import { loader as loadBookingDetailAdmin } from "../utils/Admin/loadBookingDetail.js";
import { loader as loadBlogsAdmin } from "../utils/Admin/loadBlogsAdmin.js";
import { loader as loadDiscountAdmin } from "../utils/Admin/loadDiscountAdmin.js";
import { loader as loadDiscountDetailAdmin } from "../utils/Admin/loadDiscountDetail.js";
import { loader as loadDiscountEditAdmin } from "../utils/Admin/loadDiscountEdit.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage />, loader: loadData },
      {
        path: "tours",
        children: [
          { index: true, element: <TourPage />, loader: loadTourData },
          { path: "search", element: <TourPage />, loader: loadTourData },
          { path: "search/:slug", element: <TourPage />, loader: loadTourData },
          {
            path: "detail/:slug",
            element: <DetailPage />,
            loader: loadTourDetailData,
          },
        ],
      },
      {
        path: "blog",
        children: [
          { index: true, element: <BlogPage />, loader: loadBlogData },
          {
            path: "country/:slug",
            element: <BlogPage />,
            loader: loadBlogData,
          },
          {
            path: "manage",
            element: <BlogManagePage />,
            loader: loadBlogManage,
          },
          {
            path: "detail/:idBlog",
            element: <BlogDetailPage />,
            loader: loadBlogDetail,
          },
          {
            path: "create",
            element: <BlogCreatePage />,
            loader: loadBlogCreate,
          },
          {
            path: "edit/:idBlog",
            element: <BlogEditPage />,
            loader: loadBlogEdit,
          },
        ],
      },
      { path: "about-us", element: <AboutUsPage /> },
      { path: "my-tour", element: <MyTourPage />, loader: loadMyTour },
      {
        path: "user",
        element: <RootUserPage />,
        children: [
          {
            path: "detail",
            element: <UserDetailPage />,
            loader: loadUserDetail,
          },
          {
            path: "update-info",
            element: <UserUpdateInfo />,
            loader: loadUserDetail,
          },
          {
            path: "update-password",
            element: <UserChangePassword />,
          },
        ],
      },
      {
        path: "booking/:slug",
        element: <BookingPage />,
        loader: loadBookingTour,
      },
      {
        path: "checkout-success/:idBooking",
        element: <SuccessCheckout />,
        loader: loadSuccessCheckout,
      },
    ],
  },
  { path: "/home", element: <Navigate to="/" /> },
  {
    path: "/login",
    errorElement: <ErrorPage />,
    element: (
      <RootAuthPage>
        <LoginPage />
      </RootAuthPage>
    ),
  },
  {
    path: "/register",
    errorElement: <ErrorPage />,
    element: (
      <RootAuthPage>
        <RegisterPage />
      </RootAuthPage>
    ),
  },
  {
    path: "/forgot-password",
    errorElement: <ErrorPage />,
    element: (
      <RootAuthPage>
        <ForgotPassword />
      </RootAuthPage>
    ),
  },
  {
    path: "/verify-otp",
    errorElement: <ErrorPage />,
    element: (
      <RootAuthPage>
        <OTPPage />
      </RootAuthPage>
    ),
  },
  {
    path: "/reset-password",
    errorElement: <ErrorPage />,
    element: (
      <RootAuthPage>
        <ResetPassword />
      </RootAuthPage>
    ),
  },
  {
    path: "/admin",
    errorElement: <ErrorPage />,
    element: (
      <ProtectedRoute>
        <RootAdminPage />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <HomeAdminPage />, loader: loadDataAdmin },
      {
        path: "tours",
        children: [
          { index: true, element: <ManageTourPage />, loader: loadTourAdmin },
          {
            path: "add",
            element: <AddTourAdminPage />,
            loader: loadTourCreatAdmin,
          },
          {
            path: ":idTour/edit",
            element: <EditTourAdminPage />,
            loader: loadTourEditAdmin,
          },
          {
            path: ":idTour/detail",
            element: <DetailTourAdminPage />,
            loader: loadTourDetailAdmin,
          },
        ],
      },
      {
        path: "countries",
        children: [
          {
            index: true,
            element: <ManageCountryPage />,
            loader: loadCountryAdmin,
          },
          {
            path: "add",
            element: <AddCountryAdminPage />,
          },
          {
            path: ":idCountry/edit",
            element: <EditCountryAdminPage />,
            loader: loadCountryDetailAdmin,
          },
          {
            path: ":idCountry/detail",
            element: <DetailCountryAdminPage />,
            loader: loadCountryDetailAdmin,
          },
        ],
      },
      {
        path: "blogs",
        children: [
          { index: true, element: <ManageBlogPage />, loader: loadBlogsAdmin },
          {
            path: "add",
            element: <AddBlogAdminPage />,
            loader: loadBlogCreate,
          },
          {
            path: ":idBlog/edit",
            element: <EditBlogAdminPage />,
            loader: loadBlogEdit,
          },
          {
            path: ":idBlog/detail",
            element: <DetailBlogAdminPage />,
            loader: loadBlogDetail,
          },
        ],
      },
      {
        path: "booking",
        children: [
          { index: true, element: <ManageBooking />, loader: loadBooking },
          {
            path: ":idBooking/detail",
            element: <DetailBooking />,
            loader: loadBookingDetailAdmin,
          },
        ],
      },
      {
        path: "reviews",
        children: [
          {
            index: true,
            element: <ManageReviewPage />,
            loader: loadReviewAdmin,
          },
          {
            path: "add",
            element: <AddReviewAdminPage />,
            loader: loadReviewCreateAdmin,
          },
          {
            path: ":idReview/edit",
            element: <EditReviewAdminPage />,
            loader: loadReviewEditAdmin,
          },
          {
            path: ":idReview/detail",
            element: <DetailReviewAdminPage />,
            loader: loadReviewDetailAdmin,
          },
        ],
      },
      {
        path: "users",
        children: [
          { index: true, element: <ManageUserPage />, loader: loadUserAdmin },
          { path: "add", element: <AddUserAdminPage /> },
          {
            path: ":idUser/edit",
            element: <EditUserAdminPage />,
            loader: loadUserDetailAdmin,
          },
          {
            path: ":idUser/detail",
            element: <DetailUserAdminPage />,
            loader: loadUserDetailAdmin,
          },
        ],
      },
      {
        path: "discounts",
        children: [
          {
            index: true,
            element: <ManageDiscountPage />,
            loader: loadDiscountAdmin,
          },
          {
            path: "add",
            element: <AddDiscountPage />,
            loader: loadBlogCreate,
          },
          {
            path: ":idDiscount/edit",
            element: <EditDiscountPage />,
            loader: loadDiscountEditAdmin,
          },
          {
            path: ":idDiscount/detail",
            element: <DetailDiscountPage />,
            loader: loadDiscountDetailAdmin,
          },
        ],
      },
      {
        path: "revenue",
        element: <Revenue />,
        loader: loadRevenue,
      },
      { path: "schedule", element: <Schedule />, loader: loadSchedule },
    ],
  },
]);

export default router;

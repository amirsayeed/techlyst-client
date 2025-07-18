import {
  createBrowserRouter
} from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Authentication/Login/Login";
import Register from "../pages/Authentication/Register/Register";
import DashboardLayout from "../layouts/DashboardLayout";
import PrivateRoute from "../routes/PrivateRoute";
import MyProfile from "../pages/Dashboard/MyProfile/MyProfile";
import AddProduct from "../pages/Dashboard/AddProduct/AddProduct";
import MyProducts from "../pages/Dashboard/MyProducts/MyProducts";
import UpdateProduct from "../pages/Dashboard/MyProducts/UpdateProduct";
import Payment from "../pages/Dashboard/Payment/Payment";
import Forbidden from "../pages/Forbidden/Forbidden";
import AdminRoute from "../routes/AdminRoute";
import ManageUsers from "../pages/Dashboard/ManageUsers/ManageUsers";
import ManageCoupons from "../pages/Dashboard/ManageCoupons/ManageCoupons";
import Statistics from "../pages/Dashboard/Statistics/Statistics";
import ModeratorRoute from "../routes/ModeratorRoute";
import ReviewQueue from "../pages/Dashboard/ReviewQueue/ReviewQueue";
import ReportedProducts from "../pages/Dashboard/ReportedProducts/ReportedProducts";
import ProductDetails from "../pages/Dashboard/ProductDetails/ProductDetails";
import Products from "../pages/Products/Products";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout/>,
    children: [
        {
            index: true,
            Component: Home
        },
        {
            path: 'forbidden',
            Component: Forbidden
        },
        {
            path: 'products',
            Component: Products
        },
        {
          path: 'products/:id',
          element: <PrivateRoute><ProductDetails/></PrivateRoute>
        }
    ]
  },
  {
    path: '/',
    Component: AuthLayout,
    children: [
        {
            path: 'login',
            Component: Login
        },
        {
            path: 'register',
            Component: Register
        }
    ]
  },
  {
    path: '/dashboard',
    element: <PrivateRoute><DashboardLayout/></PrivateRoute>,
    children: [
      {
        path: 'myProfile',
        Component: MyProfile
      },
      {
        path: 'addProduct',
        Component: AddProduct
      },
      {
        path: 'updateProduct/:id',
        Component: UpdateProduct
      },
      {
        path: 'myProducts',
        Component: MyProducts
      }, 
      {
        path: 'payment',
        Component: Payment
      },

      //moderator only routes
      {
        path: 'review-queue',
        element: <ModeratorRoute><ReviewQueue/></ModeratorRoute>
      },
      {
        path: 'reported-products',
        element: <ModeratorRoute><ReportedProducts/></ModeratorRoute>
      },

      //admin only routes
      {
        path: 'adminStatistics',
        element: <AdminRoute><Statistics/></AdminRoute>
      },
      {
        path: 'manageUsers',
        element: <AdminRoute><ManageUsers/></AdminRoute>
      },
      {
        path: 'manageCoupons',
        element: <AdminRoute><ManageCoupons/></AdminRoute>
      }
    ]
  }
]);
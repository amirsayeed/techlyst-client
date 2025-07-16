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

      //admin only routes
      {
        path: 'manageUsers',
        element: <AdminRoute><ManageUsers/></AdminRoute>
      }
    ]
  }
]);
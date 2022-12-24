import React from "react";
import Auth from "./layouts/auth";
import User from "./layouts/user";
import Main from "./layouts/main";
import Admin from "./layouts/admin";
import Logout from "./layouts/logout";
import { Navigate } from "react-router-dom";
import LoginForm from "./components/ui/loginForm";
import RegisterForm from "./components/ui/registerForm";
import UserPage from "./components/pages/userPages/userPage";
import EditUserPage from "./components/pages/userPages/editUserPage";
import CartUserPage from "./components/pages/userPages/cartUserPage";
import ProductPage from "./components/pages/productPages/productPage";
import PaymentUserPage from "./components/pages/userPages/paymentUserPage";
import FavoriteUserPage from "./components/pages/userPages/favoriteUserPage";
import AdminProductsPage from "./components/pages/adminPages/adminProductsPage";
import ProductsListPage from "./components/pages/productPages/productsListPage";

export const routes = [
    {
        path: "/",
        element: <Main />,
        children: [
            { path: "", element: <ProductsListPage /> },
            { path: ":productId", element: <Navigate to="info" /> },
            { path: ":productId/info", element: <ProductPage /> }
        ]
    },
    {
        path: "user",
        element: <User />,
        children: [
            { path: "", element: <Navigate to="profile" /> },
            { path: "profile", element: <UserPage /> },
            { path: "edit", element: <EditUserPage /> },
            { path: "favorites", element: <FavoriteUserPage /> },
            { path: "cart", element: <CartUserPage /> },
            { path: "payment", element: <PaymentUserPage /> },
            { path: "*", element: <Navigate to="profile" /> }
        ]
    },
    {
        path: "admin",
        element: <Admin />,
        children: [
            { path: "", element: <Navigate to="editProducts" /> },
            { path: "editProducts", element: <AdminProductsPage /> }
        ]
    },
    {
        path: "auth",
        element: <Auth />,
        children: [
            { path: "", element: <Navigate to="signin" /> },
            { path: "signin", element: <LoginForm /> },
            { path: "signup", element: <RegisterForm /> },
            { path: "*", element: <Navigate to="signin" /> }
        ]
    },
    { path: "logout", element: <Logout /> },
    { path: "*", element: <Navigate to="" /> }
];

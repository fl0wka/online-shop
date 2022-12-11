import React from "react";
import { Navigate } from "react-router-dom";
import RegisterForm from "./components/ui/registerForm";
import LoginForm from "./components/ui/loginForm";
import Auth from "./layouts/auth";
import User from "./layouts/user";
import Main from "./layouts/main";
import Menu from "./layouts/menu";
import Stock from "./layouts/stock";
import Logout from "./layouts/logout";
import UserPage from "./pages/userPage";
import ProductPage from "./pages/productPage";
import EditUserPage from "./pages/editUserPage";
import CartUserPage from "./pages/CartUserPage";
import ProductsListPage from "./pages/productsListPage";
import FavoritesUserPage from "./pages/favoritesUserPage";

export const routes = [
    { path: "/", element: <Main /> },
    { path: "stock", element: <Stock /> },
    {
        path: "menu",
        element: <Menu />,
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
            { path: "favorites", element: <FavoritesUserPage /> },
            { path: "cart", element: <CartUserPage /> },
            { path: "*", element: <Navigate to="profile" /> }
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

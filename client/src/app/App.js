import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Stock from "./layouts/stock";
import Purchases from "./layouts/purchases";
import Logout from "./layouts/logout";
import Navbar from "./components/ui/navbar";
import Main from "./layouts/main";
import Menu from "./layouts/menu";
import Auth from "./layouts/auth";
import LoginForm from "./components/ui/loginForm";
import RegisterForm from "./components/ui/registerForm";
import ProductsListPage from "./pages/productsListPage";
import ProductPage from "./pages/productPage";

function App() {
    return (
        <>
            <Navbar />
            <Routes>
                <Route index element={<Main />} />
                <Route path="stock" element={<Stock />} />
                <Route path="menu" element={<Menu />}>
                    <Route index element={<ProductsListPage />} />
                    <Route
                        path=":productId"
                        element={<Navigate to={"info"} />}
                    />
                    <Route path=":productId/info" element={<ProductPage />} />
                </Route>
                <Route path="purchases" element={<Purchases />} />
                <Route path="logout" element={<Logout />} />
                <Route path="auth" element={<Auth />}>
                    <Route index element={<Navigate to="signin" />} />
                    <Route path="signin" element={<LoginForm />} />
                    <Route path="signup" element={<RegisterForm />} />
                    <Route path="*" element={<Navigate to="signin" />} />
                </Route>
                <Route path="*" element={<Navigate to="" />} />
            </Routes>
        </>
    );
}

export default App;

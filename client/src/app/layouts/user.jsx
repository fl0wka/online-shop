import React from "react";
import { Outlet } from "react-router-dom";
import ProtectedRoute from "../components/common/protectedRoute";

const User = () => {
    return (
        <ProtectedRoute>
            <div className="container-fluid mt-3">
                <Outlet />
            </div>
        </ProtectedRoute>
    );
};

export default User;

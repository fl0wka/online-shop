import React from "react";
import { Outlet } from "react-router-dom";
import ProtectedRoute from "../components/common/protectedRoute";

const User = () => {
    return (
        <ProtectedRoute>
            <div className="container-fluid pt-3">
                <Outlet />
            </div>
        </ProtectedRoute>
    );
};

export default User;

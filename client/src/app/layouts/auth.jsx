import React from "react";
import { Outlet } from "react-router-dom";

const Auth = () => {
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-5">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Auth;

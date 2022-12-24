import React from "react";
import { Outlet } from "react-router-dom";

const Auth = () => {
    return (
        <div className="container pt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 bg-light shadow p-5 rounded-3">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Auth;

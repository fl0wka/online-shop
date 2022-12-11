import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getIsLoggedIn } from "../store/currentUser";

const Auth = () => {
    const isLogged = useSelector(getIsLoggedIn());
    const navigate = useNavigate();

    useEffect(() => {
        if (isLogged) return navigate("/");
    }, []);

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

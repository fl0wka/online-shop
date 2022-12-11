import React from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getIsLoggedIn } from "../../store/currentUser";

const ProtectedRoute = ({ children, redirect = "/auth/signin" }) => {
    const isLoggedIn = useSelector(getIsLoggedIn());
    const location = useLocation();
    if (!isLoggedIn) {
        return (
            <Navigate
                to={redirect}
                state={{ from: location.pathname }}
                replace
            />
        );
    }
    return children || <Outlet />;
};

ProtectedRoute.propTypes = {
    redirect: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default ProtectedRoute;

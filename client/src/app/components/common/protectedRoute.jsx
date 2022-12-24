import React from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import {
    getCurrentUserData,
    getIsLoggedIn,
    getUserLoadingStatus
} from "../../store/currentUser";
import Loader from "./loader";

const ProtectedRoute = ({ children, role, redirect }) => {
    const isLoggedIn = useSelector(getIsLoggedIn());
    const currentUser = useSelector(getCurrentUserData());
    const isCurrentUserLoadingStatus = useSelector(getUserLoadingStatus());
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

    if (isCurrentUserLoadingStatus) return <Loader />;

    if (role === "admin" && currentUser.role === "consumer") {
        return <Navigate from="/admin" to="/" />;
    } else if (
        currentUser.role === role ||
        (role === "consumer" && currentUser.role === "admin")
    ) {
        return children || <Outlet />;
    }
};

ProtectedRoute.defaultProps = {
    role: "consumer",
    redirect: "/auth/signin"
};

ProtectedRoute.propTypes = {
    redirect: PropTypes.string,
    role: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default ProtectedRoute;

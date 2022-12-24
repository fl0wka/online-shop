import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logOut } from "../store/currentUser";
import { useNavigate } from "react-router-dom";
import Loader from "../components/common/loader";
import { logOutUserCart } from "../store/userCart";
import { logOutUserFavorite } from "../store/userFavorite";

const Logout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(logOut());
        dispatch(logOutUserCart());
        dispatch(logOutUserFavorite());
        navigate("/");
    }, []);
    return <Loader />;
};

export default Logout;

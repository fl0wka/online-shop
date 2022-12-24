import React, { useEffect } from "react";
import { createUserCart, getUserCartData } from "../../../store/userCart";
import { createUserFavorite } from "../../../store/userFavorite";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../common/loader";
import {
    getIsLoggedIn,
    getUserLoadingStatus,
    loadCurrentUserData
} from "../../../store/currentUser";
import {
    getTypeProductLoadingStatus,
    loadTypeProduct
} from "../../../store/typeProduct";
import PropTypes from "prop-types";
import {
    getProductsLoadingStatus,
    loadProducts
} from "../../../store/products";

const AppLoader = ({ children }) => {
    const typeProductStatusLoading = useSelector(getTypeProductLoadingStatus());
    const productsStatusLoading = useSelector(getProductsLoadingStatus());
    const userStatusLoading = useSelector(getUserLoadingStatus());
    const isLoggedIn = useSelector(getIsLoggedIn());
    const userCart = useSelector(getUserCartData());
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadTypeProduct());
        dispatch(loadProducts());
        if (isLoggedIn) {
            dispatch(loadCurrentUserData());
            dispatch(createUserCart());
            dispatch(createUserFavorite());
        }
        if (userCart) {
            console.log(userCart);
        }
    }, [isLoggedIn]);

    if (
        productsStatusLoading &&
        typeProductStatusLoading &&
        userStatusLoading
    ) {
        return <Loader />;
    } else {
        return children;
    }
};

AppLoader.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default AppLoader;

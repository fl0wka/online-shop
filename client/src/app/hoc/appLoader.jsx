import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { getProductsLoadingStatus, loadProducts } from "../store/products";
import {
    getTypeProductLoadingStatus,
    loadTypeProduct
} from "../store/typeProduct";
import {
    getIsLoggedIn,
    getUserLoadingStatus,
    loadCurrentUserData
} from "../store/currentUser";
import Loader from "../components/common/loader";

const AppLoader = ({ children }) => {
    const isLoggedIn = useSelector(getIsLoggedIn());
    const productsStatusLoading = useSelector(getProductsLoadingStatus());
    const typeProductStatusLoading = useSelector(getTypeProductLoadingStatus());
    const userStatusLoading = useSelector(getUserLoadingStatus());
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadTypeProduct());
        dispatch(loadProducts());
        if (isLoggedIn) {
            dispatch(loadCurrentUserData());
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

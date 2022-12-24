import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getIsLoggedIn } from "../../../store/currentUser";
import { changeCartIcon } from "../../../utils/changeCartIcon";
import { getUserCartData, updateUserCart } from "../../../store/userCart";

const ButtonAddToCart = ({ productId }) => {
    const isLoggedIn = useSelector(getIsLoggedIn());
    const userCart = useSelector(getUserCartData());
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const addToCart = () => {
        if (isLoggedIn) {
            dispatch(updateUserCart(userCart, productId));
        } else {
            navigate("/auth/signIn");
        }
    };

    return (
        <button
            className="btn btn-outline-success mx-2 fs-4 border-0"
            onClick={() => {
                addToCart();
            }}
        >
            <i className={changeCartIcon(isLoggedIn, userCart, productId)}></i>
        </button>
    );
};

ButtonAddToCart.propTypes = {
    productId: PropTypes.string
};

export default ButtonAddToCart;

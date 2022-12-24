import React from "react";
import { changeFavoriteIcon } from "../../../utils/changeFavoriteIcon";
import { getIsLoggedIn } from "../../../store/currentUser";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    getUserFavoriteData,
    updateUserFavorite
} from "../../../store/userFavorite";
import PropTypes from "prop-types";

const ButtonAddToFavorite = ({ productId }) => {
    const userFavorite = useSelector(getUserFavoriteData());
    const isLoggedIn = useSelector(getIsLoggedIn());
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const addToFavorite = () => {
        if (isLoggedIn) {
            dispatch(updateUserFavorite(userFavorite, productId));
        } else {
            navigate("/auth/signIn");
        }
    };

    return (
        <button
            className="btn btn-outline-danger mx-2 fs-5 border-0"
            onClick={() => {
                addToFavorite();
            }}
        >
            <i
                className={changeFavoriteIcon(
                    isLoggedIn,
                    userFavorite,
                    productId
                )}
            ></i>
        </button>
    );
};

ButtonAddToFavorite.propTypes = {
    productId: PropTypes.string
};

export default ButtonAddToFavorite;

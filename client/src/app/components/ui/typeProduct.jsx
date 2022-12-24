import React from "react";
import { useSelector } from "react-redux";
import Loader from "../common/loader";
import PropTypes from "prop-types";
import {
    getTypeProductById,
    getTypeProductLoadingStatus
} from "../../store/typeProduct";

const TypeProduct = ({ id }) => {
    const type = useSelector(getTypeProductById(id));
    const isTypeProductLoadingStatus = useSelector(
        getTypeProductLoadingStatus()
    );

    if (isTypeProductLoadingStatus) return <Loader />;
    return <p>{type.name}</p>;
};

TypeProduct.propTypes = {
    id: PropTypes.string
};

export default TypeProduct;

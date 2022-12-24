import React from "react";
import PropTypes from "prop-types";

const ButtonRemoveProduct = ({ remove, productId }) => {
    return (
        <button
            className="btn btn-outline-danger m-2 fs-4 border-0"
            onClick={() => remove(productId)}
        >
            <i className="bi bi-trash3"></i>
        </button>
    );
};

ButtonRemoveProduct.propTypes = {
    remove: PropTypes.func,
    productId: PropTypes.string
};

export default ButtonRemoveProduct;

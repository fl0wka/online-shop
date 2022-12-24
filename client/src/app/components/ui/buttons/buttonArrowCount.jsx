import React from "react";
import PropTypes from "prop-types";

const ButtonArrowCount = ({
    disable,
    amount,
    productId,
    type,
    classNameIcon
}) => {
    return (
        <button
            className={`btn text-success border-0 ${disable(type, productId)}`}
            onClick={() => amount(productId, type)}
        >
            <i className={classNameIcon}></i>
        </button>
    );
};

ButtonArrowCount.propTypes = {
    classNameIcon: PropTypes.string,
    productId: PropTypes.string,
    type: PropTypes.string,
    disable: PropTypes.func,
    amount: PropTypes.func
};

export default ButtonArrowCount;

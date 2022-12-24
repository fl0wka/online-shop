import React from "react";
import PropTypes from "prop-types";

const PreviousPage = ({ back }) => {
    return (
        <button
            className="btn btn-outline-dark m-3 fs-3 border-0 position-fixed top-50 start-0"
            onClick={back}
        >
            <i className="bi bi-arrow-left"></i>
        </button>
    );
};

PreviousPage.propTypes = {
    back: PropTypes.func.isRequired
};

export default PreviousPage;

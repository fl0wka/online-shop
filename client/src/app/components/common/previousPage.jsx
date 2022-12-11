import React from "react";
import PropTypes from "prop-types";

const PreviousPage = ({ back }) => {
    return (
        <button className="btn btn-secondary mb-3" onClick={back}>
            <i className="bi bi-caret-left-fill" /> назад
        </button>
    );
};

PreviousPage.propTypes = {
    back: PropTypes.func.isRequired
};

export default PreviousPage;

import React from "react";
import PropTypes from "prop-types";

const Loader = ({ margin }) => {
    return (
        <div className="text-center">
            <div
                className={`spinner-border text-secondary ${margin}`}
                role="status"
            >
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );
};

Loader.defaultProps = {
    margin: "m-5"
};

Loader.propTypes = {
    margin: PropTypes.string
};

export default Loader;

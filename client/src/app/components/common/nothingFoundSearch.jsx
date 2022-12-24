import React from "react";
import PropTypes from "prop-types";

const NothingFoundSearch = ({ message }) => {
    return (
        <div className="text-center mt-5">
            <h5>{message}</h5>
        </div>
    );
};

NothingFoundSearch.defaultProps = {
    message: "Ничего не найдено!"
};

NothingFoundSearch.propTypes = {
    message: PropTypes.string
};

export default NothingFoundSearch;

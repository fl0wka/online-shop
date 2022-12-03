import React from "react";
import PropTypes from "prop-types";

const SearchField = ({ type, name, onChange, value, placeholder }) => {
    return (
        <input
            type={type}
            placeholder={placeholder}
            name={name}
            value={value}
            className="form-control mt-2 border-black bg-light"
            onChange={onChange}
        />
    );
};

SearchField.defaultProps = {
    type: "text",
    placeholder: "Поиск"
};

SearchField.propTypes = {
    type: PropTypes.string,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func
};

export default SearchField;

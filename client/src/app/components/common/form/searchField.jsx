import React from "react";
import PropTypes from "prop-types";

const SearchField = ({
    type,
    name,
    onChange,
    value,
    placeholder,
    clearSearch
}) => {
    return (
        <div className="position-relative ">
            <input
                type={type}
                placeholder={placeholder}
                name={name}
                value={value}
                className="form-control border-black bg-light"
                onChange={onChange}
            />
            <button
                className="position-absolute top-50 end-0 translate-middle-y btn btn-light border-0 me-1 p-1"
                onClick={() => {
                    clearSearch();
                }}
            >
                <i className="bi bi-x-lg"></i>
            </button>
        </div>
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
    onChange: PropTypes.func,
    clearSearch: PropTypes.func
};

export default SearchField;

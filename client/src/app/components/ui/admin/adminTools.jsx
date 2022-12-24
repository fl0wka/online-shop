import React from "react";
import PropTypes from "prop-types";

const AdminTools = ({ toggleForm, removeItem, itemId }) => {
    return (
        <div>
            <button
                className="btn text-dark me-1 fs-5"
                onClick={() => toggleForm(true, itemId)}
            >
                <i className="bi bi-pencil-fill "></i>
            </button>
            <button
                className="btn text-danger fs-5"
                onClick={() => removeItem(itemId)}
            >
                <i className="bi bi-trash3"></i>
            </button>
        </div>
    );
};

AdminTools.propTypes = {
    toggleForm: PropTypes.func,
    removeItem: PropTypes.func,
    itemId: PropTypes.string
};

export default AdminTools;

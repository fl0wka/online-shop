import React from "react";
import PropTypes from "prop-types";

const Modal = ({ children, title, onClose }) => {
    return (
        <>
            <div
                className="position-fixed bg-black bg-opacity-50"
                style={{
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0
                }}
            />
            <div className="position-absolute top-50 start-50 translate-middle w-50 p-5 rounded-3 bg-white">
                <i
                    className="bi bi-x-lg position-absolute top-0 end-0 px-2 pt-1"
                    role="button"
                    onClick={() => onClose()}
                ></i>
                <h4 className="mb-4 text-center">{title}</h4>
                {children}
            </div>
        </>
    );
};

Modal.propTypes = {
    children: PropTypes.node,
    title: PropTypes.string,
    onClose: PropTypes.func
};

export default Modal;

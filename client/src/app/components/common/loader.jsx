import React from "react";

const Loader = () => {
    return (
        <div className="text-center">
            <div className="spinner-border text-secondary m-5" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );
};

export default Loader;

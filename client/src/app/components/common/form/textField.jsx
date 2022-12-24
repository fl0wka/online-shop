import React, { useState } from "react";
import PropTypes from "prop-types";

const TextField = ({ label, type, value, onChange, name, error }) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    };
    const getInputClasses = () => {
        return "form-control" + (error ? " is-invalid" : "");
    };
    const toggleShowPassword = () => {
        setShowPassword((prevState) => !prevState);
    };

    return (
        <div className="mb-3">
            <label htmlFor={name} className="form-label">
                {label}
            </label>
            <div className="input-group has-validation">
                <input
                    className={getInputClasses()}
                    value={value || ""}
                    id={name}
                    type={showPassword ? "text" : type}
                    name={name}
                    onChange={handleChange}
                />
                {type === "password" && (
                    <button
                        className="btn btn-secondary"
                        type="button"
                        onClick={toggleShowPassword}
                    >
                        <i
                            className={
                                "bi bi-eye-" +
                                (!showPassword ? "slash-fill" : "fill")
                            }
                        ></i>
                    </button>
                )}
                {error && <div className="invalid-feedback">{error}</div>}
            </div>
        </div>
    );
};

TextField.defaultProps = {
    type: "text"
};

TextField.propTypes = {
    type: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string,
    error: PropTypes.string,
    onChange: PropTypes.func
};

export default TextField;

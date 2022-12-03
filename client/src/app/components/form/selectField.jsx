import React from "react";

const SelectField = () => {
    return (
        <div className="d-inline-flex">
            <label htmlFor="validationCustom04" className="form-label"></label>
            <select className="form-select" id="validationCustom04" required>
                {/* <option selected disabled value="">
                    Choose...
                </option>
                <button>1</button>
                <button>2</button>
                <option value="_id">...</option> */}
            </select>
            {/* <div className="invalid-feedback">Please select a valid state.</div> */}
        </div>
    );
};

export default SelectField;

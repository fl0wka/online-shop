import React from "react";
import PropTypes from "prop-types";

const GroupList = ({
    items,
    valueProperty,
    contentProperty,
    onItemSelect,
    selectedItem
}) => {
    return (
        <ul className="d-flex d-sm-flex list-group list-group-horizontal">
            {Object.keys(items).map((item) => (
                <li
                    key={items[item][valueProperty]}
                    role="button"
                    className={
                        "border-0 list-group-item list-group-item-action list-group-item-warning text-center" +
                        (items[item] === selectedItem ? " active" : "")
                    }
                    onClick={() => onItemSelect(items[item])}
                >
                    {items[item][contentProperty]}
                </li>
            ))}
        </ul>
    );
};

GroupList.defaultProps = {
    valueProperty: "id",
    contentProperty: "name"
};

GroupList.propTypes = {
    valueProperty: PropTypes.string.isRequired,
    contentProperty: PropTypes.string.isRequired,
    items: PropTypes.object.isRequired,
    onItemSelect: PropTypes.func,
    selectedItem: PropTypes.object
};

export default GroupList;

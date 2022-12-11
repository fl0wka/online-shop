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
            {Array.isArray(items)
                ? items.map((item) => (
                      <li
                          key={item[valueProperty]}
                          role="button"
                          className={
                              "border-0 list-group-item list-group-item-action list-group-item-warning text-center" +
                              (item === selectedItem ? " active" : "")
                          }
                          onClick={() => onItemSelect(item)}
                      >
                          {item[contentProperty]}
                      </li>
                  ))
                : Object.keys(items).map((item) => (
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
    valueProperty: "_id",
    contentProperty: "name"
};

GroupList.propTypes = {
    items: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    valueProperty: PropTypes.string.isRequired,
    contentProperty: PropTypes.string.isRequired,
    onItemSelect: PropTypes.func,
    selectedItem: PropTypes.object
};

export default GroupList;

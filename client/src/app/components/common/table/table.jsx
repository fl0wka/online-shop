import React from "react";
import PropTypes from "prop-types";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

const Table = ({ columns, data, children }) => {
    return (
        <div className="table-responsive">
            <table className="table table-striped text-center">
                {children || (
                    <>
                        <TableHeader {...{ columns }} />
                        <TableBody {...{ columns, data }} />
                    </>
                )}
            </table>
        </div>
    );
};

Table.propTypes = {
    columns: PropTypes.object,
    data: PropTypes.array,
    children: PropTypes.array
};

export default Table;

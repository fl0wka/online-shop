import React from "react";
import Table from "../common/table/";
import PropTypes from "prop-types";
import Loader from "../common/loader";
import TypeProduct from "./typeProduct";
import AdminTools from "./admin/adminTools";

const ProductTable = ({ products, toggleForm, removeProduct }) => {
    const columns = {
        name: {
            name: "Название",
            component: (product) => product.name
        },
        content: {
            name: "Описание",
            component: (product) => product.content
        },
        typeProduct: {
            name: "Категория",
            component: (product) => <TypeProduct id={product.typeProduct} />
        },
        price: {
            name: "Цена, руб.",
            component: (product) => product.price
        },
        tools: {
            name: "Действия",
            component: (product) => (
                <AdminTools
                    toggleForm={toggleForm}
                    removeItem={removeProduct}
                    itemId={product._id}
                />
            )
        }
    };

    if (!products) return <Loader />;
    return <Table columns={columns} data={products} />;
};

ProductTable.propTypes = {
    toggleForm: PropTypes.func,
    removeProduct: PropTypes.func,
    products: PropTypes.array
};

export default ProductTable;

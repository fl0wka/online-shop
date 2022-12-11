import React, { useState, useEffect } from "react";
import _ from "lodash";
import { paginate } from "../utils/paginate";
import CardProduct from "../components/ui/cardProduct";
import Pagination from "../components/common/pagination";
import GroupList from "../components/common/groupList";
import SearchField from "../components/form/searchField";
import Loader from "../components/common/loader";
import { useSelector } from "react-redux";
import { getProducts, getProductsLoadingStatus } from "../store/products";
import {
    getTypeProduct,
    getTypeProductLoadingStatus
} from "../store/typeProduct";
import { scrollToUpPage } from "../utils/scrollToUpPage";

const ProductsListPage = () => {
    const products = useSelector(getProducts());
    const typeProduct = useSelector(getTypeProduct());
    const isLoadingStatusProducts = useSelector(getProductsLoadingStatus());
    const isLoadingStatusTypeProduct = useSelector(
        getTypeProductLoadingStatus()
    );
    const [selectedTypeProduct, setSelectedTypeProduct] = useState();
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState({ path: "price", order: "desc" });
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 8;

    const handleTypeProductSelect = (items) => {
        setSelectedTypeProduct(items);
        setSearchQuery("");
    };

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
        scrollToUpPage();
    };

    const clearFilter = () => {
        setSelectedTypeProduct();
        setCurrentPage(1);
        setSearchQuery("");
    };

    const handleSearchQuery = ({ target }) => {
        setSelectedTypeProduct();
        setSearchQuery(target.value);
    };

    const handleSort = (item) => {
        if (item === sortBy.path) {
            setSortBy({
                ...sortBy,
                order: sortBy.order === "asc" ? "desc" : "asc"
            });
        }
        // Если несколько видов сортировки
        // } else {
        //     setSortBy({ path: item, order: "desc" });
        // }
    };

    // Выставляет 1 страницу при переключении категорий
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedTypeProduct, searchQuery]);

    if (!isLoadingStatusProducts) {
        const filteredProducts = searchQuery
            ? products.filter(
                  (product) =>
                      product.name.toLowerCase().indexOf(searchQuery) !== -1
              )
            : selectedTypeProduct
            ? products.filter(
                  (product) =>
                      //   _.isEqual(product.category, selectedTypeProduct)
                      product.typeProduct === selectedTypeProduct._id
              )
            : products;

        const count = filteredProducts.length;

        const sorteredProducts = _.orderBy(
            filteredProducts,
            [sortBy.path],
            [sortBy.order]
        );

        const productsCrop = paginate(sorteredProducts, currentPage, pageSize);

        return (
            <div className="d-flex flex-column">
                <div className="d-sm-inline-flex align-items-center mx-4">
                    {!isLoadingStatusTypeProduct && (
                        <>
                            <div className="me-3">
                                <button
                                    className="btn list-group-item-action list-group-item-warning text-center border-warning"
                                    onClick={clearFilter}
                                >
                                    все
                                </button>
                            </div>
                            <div className="me-3">
                                <GroupList
                                    selectedItem={selectedTypeProduct}
                                    items={typeProduct}
                                    onItemSelect={handleTypeProductSelect}
                                />
                            </div>
                            <div className="me-3">
                                <button
                                    onClick={() => handleSort("price")}
                                    className="btn list-group-item-action list-group-item-warning text-center border-warning"
                                >
                                    цена{" "}
                                    <i
                                        className={`bi bi-arrow-${
                                            sortBy.order === "desc"
                                                ? "down"
                                                : "up"
                                        }`}
                                    ></i>
                                </button>
                            </div>
                            <div className="ms-auto">
                                <SearchField
                                    name="searchQuery"
                                    value={searchQuery}
                                    onChange={handleSearchQuery}
                                />
                            </div>
                        </>
                    )}
                </div>
                <div className="row m-3">
                    {count > 0 &&
                        productsCrop.map((p) => (
                            <CardProduct
                                key={p._id}
                                id={p._id}
                                image={p.image}
                                name={p.name}
                                content={p.content}
                                price={p.price}
                            />
                        ))}
                </div>
                <Pagination
                    itemCount={count}
                    pageSize={pageSize}
                    onPageChange={handlePageChange}
                    currentPage={currentPage}
                />
            </div>
        );
    }
    return <Loader />;
};

export default ProductsListPage;

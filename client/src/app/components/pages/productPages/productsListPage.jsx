import React, { useState, useEffect } from "react";
import { getProducts, getProductsLoadingStatus } from "../../../store/products";
import NothingFoundSearch from "../../common/nothingFoundSearch";
import { scrollToUpPage } from "../../../utils/scrollToUpPage";
import SearchField from "../../common/form/searchField";
import CardProduct from "../../ui/cards/cardProduct";
import { paginate } from "../../../utils/paginate";
import Pagination from "../../common/pagination";
import GroupList from "../../common/groupList";
import { useSelector } from "react-redux";
import Loader from "../../common/loader";
import {
    getTypeProduct,
    getTypeProductLoadingStatus
} from "../../../store/typeProduct";
import _ from "lodash";

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

    const clearSearch = () => {
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
    };

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
                  (product) => product.typeProduct === selectedTypeProduct._id
              )
            : products;

        const count = filteredProducts.length;

        const sortedProducts = _.orderBy(
            filteredProducts,
            [sortBy.path],
            [sortBy.order]
        );

        const productsCrop = paginate(sortedProducts, currentPage, pageSize);

        if (productsCrop.length === 0 && currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }

        return (
            <div className="d-flex flex-column col-11 mx-auto">
                <div className="d-sm-inline-flex align-items-center mx-4">
                    {!isLoadingStatusTypeProduct && (
                        <>
                            <div className="me-3 mt-3">
                                <button
                                    className="btn list-group-item-action list-group-item-warning text-center border-0"
                                    onClick={clearFilter}
                                >
                                    все
                                </button>
                            </div>
                            <div className="me-3 mt-3">
                                <GroupList
                                    selectedItem={selectedTypeProduct}
                                    items={typeProduct}
                                    onItemSelect={handleTypeProductSelect}
                                />
                            </div>
                            <div className="me-3 mt-3">
                                <button
                                    onClick={() => handleSort("price")}
                                    className="btn list-group-item-action list-group-item-warning text-center border-0"
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
                            <div className="ms-auto mt-3">
                                <SearchField
                                    name="searchQuery"
                                    value={searchQuery}
                                    onChange={handleSearchQuery}
                                    clearSearch={clearSearch}
                                />
                            </div>
                        </>
                    )}
                </div>
                <hr />
                {productsCrop.length === 0 ? (
                    <NothingFoundSearch />
                ) : (
                    <div className="row mx-3">
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
                )}

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

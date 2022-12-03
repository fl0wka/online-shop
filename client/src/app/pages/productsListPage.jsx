import React, { useState, useEffect } from "react";
import api from "../api";
import _ from "lodash";
import { paginate } from "../utils/paginate";
import CardProduct from "../components/cardProduct";
import Pagination from "../components/common/pagination";
import GroupList from "../components/common/groupList";
import SearchField from "../components/form/searchField";
import Loader from "../components/common/loader";
import httpService from "../services/http.service";

const ProductsListPage = () => {
    const [products, setProducts] = useState();
    const [typeProduct, setTypeProduct] = useState();
    const [selectedTypeProduct, setSelectedTypeProduct] = useState();
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState({ path: "price", order: "desc" });
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 8;

    const productsEndpoint = "products/";

    useEffect(() => {
        httpService.get(productsEndpoint);
    }, []);

    const handleTypeProductSelect = (items) => {
        setSelectedTypeProduct(items);
        setSearchQuery("");
    };

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
        // Прокрутка на начало страницы при переходе
        window.scrollTo(0, 0);
    };

    const clearFilter = () => {
        setSelectedTypeProduct();
        setCurrentPage(1);
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

    useEffect(() => {
        api.products.fetchAll().then((data) => setProducts(data));
        api.products.fetchAllByType().then((data) => setTypeProduct(data));
    }, []);

    // Выставляет 1 страницу при переключении категорий
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedTypeProduct, searchQuery]);

    if (products) {
        const filteredProducts = searchQuery
            ? products.filter(
                  (product) =>
                      product.name.toLowerCase().indexOf(searchQuery) !== -1
              )
            : selectedTypeProduct
            ? products.filter((product) =>
                  _.isEqual(product.category, selectedTypeProduct)
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
            <div className="d-flex flex-column p-2">
                <div className="d-sm-inline-flex align-items-center mx-4">
                    {typeProduct && (
                        <>
                            <div className="me-3 mt-2">
                                <button
                                    className="btn list-group-item-action list-group-item-warning text-center border-warning"
                                    onClick={clearFilter}
                                >
                                    все
                                </button>
                            </div>
                            <div className="me-3 mt-2">
                                <GroupList
                                    selectedItem={selectedTypeProduct}
                                    items={typeProduct}
                                    onItemSelect={handleTypeProductSelect}
                                />
                            </div>
                            <div className="mt-2 me-3">
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

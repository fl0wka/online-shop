import React, { useEffect, useState } from "react";
import AdminCreateProductForm from "../../ui/admin/adminCreateProductForm";
import AdminEditProductForm from "../../ui/admin/adminEditProductForm";
import { getProducts, removeProduct } from "../../../store/products";
import NothingFoundSearch from "../../common/nothingFoundSearch";
import SearchField from "../../common/form/searchField";
import { useDispatch, useSelector } from "react-redux";
import { paginate } from "../../../utils/paginate";
import ProductTable from "../../ui/productTable";
import Pagination from "../../common/pagination";

const AdminProductsPage = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [isOpenEditForm, setIsOpenEditForm] = useState(false);
    const [prodId, setProdId] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const dispatch = useDispatch();
    const products = useSelector(getProducts());
    const pageSize = 10;

    const handleSearchQuery = ({ target }) => {
        setSearchQuery(target.value);
    };

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const toggleEditForm = (value, prodId) => {
        setIsOpenEditForm(value);
        setProdId(prodId);
    };

    const clearSearch = () => {
        setSearchQuery("");
    };

    const remove = (prodId) => {
        dispatch(removeProduct(prodId));
        setIsOpenEditForm(false);
    };

    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery]);

    if (products) {
        const filteredProducts = searchQuery
            ? products.filter(
                  (product) =>
                      product.name.toLowerCase().indexOf(searchQuery) !== -1
              )
            : products;

        const count = filteredProducts.length;
        const productsCrop = paginate(filteredProducts, currentPage, pageSize);

        if (productsCrop.length === 0 && currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }

        return (
            <>
                <div className="col-11 mx-auto">
                    <SearchField
                        name="searchQuery"
                        value={searchQuery}
                        onChange={handleSearchQuery}
                        clearSearch={clearSearch}
                    />
                </div>
                <div className="d-flex justify-content-around mt-3">
                    <div className="col-3">
                        {isOpenEditForm ? (
                            <>
                                <h4 className="text-center">Редактировать</h4>
                                <hr />
                                <AdminEditProductForm
                                    isOpen={toggleEditForm}
                                    productId={prodId}
                                />
                            </>
                        ) : (
                            <>
                                <h4 className="text-center">Создать</h4>
                                <hr />
                                <AdminCreateProductForm />
                            </>
                        )}
                        <hr />
                    </div>
                    <div className="col-8">
                        {productsCrop.length === 0 ? (
                            <NothingFoundSearch />
                        ) : (
                            <ProductTable
                                products={productsCrop}
                                toggleForm={toggleEditForm}
                                removeProduct={remove}
                            />
                        )}
                    </div>
                </div>
                <Pagination
                    itemCount={count}
                    pageSize={pageSize}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                />
            </>
        );
    }
};

export default AdminProductsPage;

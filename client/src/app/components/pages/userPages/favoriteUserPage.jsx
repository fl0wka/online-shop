import React, { useState } from "react";
import CardFavoriteProduct from "../../ui/cards/cardFavoriteProduct";
import { scrollToUpPage } from "../../../utils/scrollToUpPage";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../../store/products";
import PreviousPage from "../../common/previousPage";
import { paginate } from "../../../utils/paginate";
import { isEmpty } from "../../../utils/isEmpty";
import Pagination from "../../common/pagination";
import { useNavigate } from "react-router-dom";
import {
    getUserFavoriteData,
    removeAllFavoriteProducts,
    removeFavoriteProduct
} from "../../../store/userFavorite";

const FavoriteUserPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const userFavorite = useSelector(getUserFavoriteData());
    const products = useSelector(getProducts());
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const pageSize = 4;

    if (products && userFavorite) {
        const productsFavorite = userFavorite.products.map((p) => {
            return products.find((item) => item._id === p.prodId);
        });

        if (isEmpty(userFavorite.products)) {
            return (
                <div className="text-center mt-5">
                    <h3>Список избранных товаров пуст!</h3>
                </div>
            );
        }

        const handlePageChange = (pageIndex) => {
            setCurrentPage(pageIndex);
            scrollToUpPage();
        };

        const removeProduct = (id) => {
            dispatch(removeFavoriteProduct(userFavorite, id));
        };

        const removeAllProduct = () => {
            dispatch(removeAllFavoriteProducts(userFavorite));
        };

        const backPage = () => {
            navigate(-1);
        };

        const count = productsFavorite.length;
        const productsFavoriteCrop = paginate(
            productsFavorite,
            currentPage,
            pageSize
        );

        if (productsFavoriteCrop.length === 0 && currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }

        return (
            <div className="col-11 mx-auto">
                <div className="d-flex position-relative">
                    <PreviousPage back={backPage} />
                    <div>
                        <div className="text-center">
                            <h3>Избранное</h3>
                        </div>
                        <hr />
                        <CardFavoriteProduct
                            productsFavorite={productsFavoriteCrop}
                            removeProduct={removeProduct}
                        />
                    </div>
                    <button
                        className="btn btn-danger position-absolute top-0 end-0"
                        onClick={() => removeAllProduct()}
                    >
                        Удалить всё
                    </button>
                </div>
                <Pagination
                    itemCount={count}
                    pageSize={pageSize}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                />
            </div>
        );
    }
};

export default FavoriteUserPage;

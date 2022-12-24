import React, { useState } from "react";
import { scrollToUpPage } from "../../../utils/scrollToUpPage";
import CardCartProduct from "../../ui/cards/cardCartProduct";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../../store/products";
import { Link, useNavigate } from "react-router-dom";
import PreviousPage from "../../common/previousPage";
import { paginate } from "../../../utils/paginate";
import { isEmpty } from "../../../utils/isEmpty";
import Pagination from "../../common/pagination";
import {
    countProductCart,
    getUserCartData,
    removeAllCartProducts,
    removeCartProduct
} from "../../../store/userCart";

const CartUserPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const userCart = useSelector(getUserCartData());
    const products = useSelector(getProducts());
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const pageSize = 4;

    if (products && userCart) {
        const productsCart = userCart.products.map((p) => {
            return products.find((item) => item._id === p.prodId);
        });

        const sumAll = () => {
            let sum = 0;
            for (let i = 0; i < productsCart.length; i++) {
                sum += productsCart[i].price * userCart.products[i].count;
            }
            return sum;
        };

        const getCount = (productId) => {
            for (let i = 0; i < userCart.products.length; i++) {
                if (userCart.products[i].prodId === productId) {
                    return userCart.products[i].count;
                }
            }
        };

        const handleAmount = (productId, type = "decrement") => {
            const updatedCount = userCart.products.map((p) => {
                let count = p.count;
                if (p.prodId === productId) {
                    return {
                        ...p,
                        count:
                            type === "increment" ? (count += 1) : (count -= 1)
                    };
                } else {
                    return p;
                }
            });
            dispatch(countProductCart({ ...userCart, products: updatedCount }));
        };

        const handlePageChange = (pageIndex) => {
            setCurrentPage(pageIndex);
            scrollToUpPage();
        };

        const removeProduct = (id) => {
            dispatch(removeCartProduct(userCart, id));
        };

        const removeAllProduct = () => {
            dispatch(removeAllCartProducts(userCart));
        };

        const backPage = () => {
            navigate(-1);
        };

        if (isEmpty(userCart.products)) {
            return (
                <div className="text-center mt-5">
                    <h3>Ваша корзина пуста!</h3>
                </div>
            );
        }

        const count = productsCart.length;
        const productsCartCrop = paginate(productsCart, currentPage, pageSize);

        if (productsCartCrop.length === 0 && currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }

        return (
            <div className="d-flex flex-md-row position-relative col-11 mx-auto">
                <PreviousPage back={backPage} />
                <div>
                    <div className="text-center">
                        <h3>Корзина</h3>
                        <hr />
                    </div>
                    <CardCartProduct
                        productsCart={productsCartCrop}
                        handleAmount={handleAmount}
                        removeProduct={removeProduct}
                        getCount={getCount}
                    />
                    <div className="col-md-3 offset-md-1 text-center position-fixed top-50 end-0 translate-middle-y mx-5">
                        <h4>Общая сумма к оплате: </h4>
                        <p className="fs-1">{sumAll(productsCartCrop)} руб.</p>
                        <hr />
                        <Link
                            to="/user/payment"
                            className="btn btn-success"
                            onClick={() => removeAllProduct()}
                        >
                            Оплатить
                        </Link>
                    </div>
                    <Pagination
                        itemCount={count}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                    />
                </div>
                <button
                    className="btn btn-danger position-absolute top-0 end-0"
                    onClick={() => removeAllProduct()}
                >
                    Удалить всё
                </button>
            </div>
        );
    }
};

export default CartUserPage;

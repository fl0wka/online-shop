import React from "react";
import ButtonAddToFavorite from "../../ui/buttons/buttonAddToFavorite";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import ButtonAddToCart from "../../ui/buttons/buttonAddToCart";
import PreviousPage from "../../common/previousPage";
import { useSelector } from "react-redux";
import Loader from "../../common/loader";
import {
    getProductById,
    getProductsLoadingStatus
} from "../../../store/products";

const ProductPage = () => {
    const { productId } = useParams();
    const currentProduct = useSelector(getProductById(productId));
    const isLoading = useSelector(getProductsLoadingStatus());
    const navigate = useNavigate();

    const backPage = () => {
        navigate(-1);
    };

    if (isLoading) return <Loader />;
    if (productId !== currentProduct?._id) return <Navigate to="/" />;
    return (
        <>
            <PreviousPage back={backPage} />
            <div className="d-flex row text-center">
                <div className="bg-warning bg-opacity-25 my-2">
                    <div className="d-inline-flex justify-content-around col-5">
                        <h4 className="pt-2">{currentProduct.name}</h4>
                        <div>
                            <ButtonAddToFavorite
                                productId={currentProduct._id}
                            />
                            <ButtonAddToCart productId={currentProduct._id} />
                        </div>
                    </div>
                </div>
                <div className="col-5 rounded-3 p-0 mx-auto">
                    <img
                        src={currentProduct.image}
                        className="rounded-3 img-fluid h-auto shadow"
                    />
                    <div className="d-inline-flex justify-content-between mt-4 rounded-3 col-12 mx-auto pt-2 px-3 bg-warning bg-opacity-25">
                        <p>{currentProduct.content}</p>
                        <p>
                            цена: <strong>{currentProduct.price}</strong> руб.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductPage;

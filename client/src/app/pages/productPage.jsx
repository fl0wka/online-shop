import React from "react";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import Loader from "../components/common/loader";
import PreviousPage from "../components/common/previousPage";
import { useSelector } from "react-redux";
import { getProductsById, getProductsLoadingStatus } from "../store/products";

const ProductPage = () => {
    const { productId } = useParams();
    const currentProduct = useSelector(getProductsById(productId));
    const isLoading = useSelector(getProductsLoadingStatus());
    const navigate = useNavigate();
    const backPage = () => {
        navigate(-1);
    };

    if (isLoading) return <Loader />;
    if (productId !== currentProduct?._id) return <Navigate to="/menu" />;
    return (
        <div className="card my-3 mx-auto h-100 col-9 border-0 bg-light">
            <PreviousPage back={backPage} />
            <div className="row g-0">
                <div className="col-md-4">
                    <img
                        src={currentProduct.image}
                        className="img-fluid rounded-start h-100"
                    />
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title">{currentProduct.name}</h5>
                        <p className="card-text">{currentProduct.content}</p>
                        <p className="card-text">{`Цена: ${currentProduct.price} руб.`}</p>
                        <button className="btn btn-success col-3">
                            купить
                        </button>
                        <p className="card-text text-end">
                            <small>{`ID: ${productId}`}</small>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;

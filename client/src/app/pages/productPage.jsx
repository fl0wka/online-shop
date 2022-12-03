import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";
import Loader from "../components/common/loader";

const ProductPage = () => {
    const { productId } = useParams();
    const [currentProduct, setCurrentProduct] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        if (productId) {
            api.products
                .getProductById(productId)
                .then((data) => setCurrentProduct(data));
        }
    }, []);

    if (currentProduct) {
        return (
            <>
                <button
                    className="btn btn-secondary mt-3"
                    onClick={() => navigate(-1)}
                >
                    <i className="bi bi-caret-left-fill" /> назад
                </button>
                <div className="card my-3 mx-auto h-100 col-9 border-0 bg-light">
                    {currentProduct && (
                        <div className="row g-0">
                            <div className="col-md-4">
                                <img
                                    src={currentProduct.image}
                                    className="img-fluid rounded-start h-100"
                                />
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                    <h5 className="card-title">
                                        {currentProduct.name}
                                    </h5>
                                    <p className="card-text">
                                        {currentProduct.content}
                                    </p>
                                    <p className="card-text">{`Цена: ${currentProduct.price} руб.`}</p>
                                    <p className="card-text">{`Id товара: ${productId}`}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </>
        );
    }
    return <Loader />;
};

export default ProductPage;

import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import ButtonAddToCart from "../buttons/buttonAddToCart";
import ButtonRemoveProduct from "../buttons/buttonRemoveProduct";

const CardFavoriteProduct = ({ productsFavorite, removeProduct }) => {
    const navigate = useNavigate();

    return (
        <div className="d-flex mx-3">
            <div className="row justify-content-center">
                {productsFavorite.map((item) => {
                    return (
                        <div
                            key={item._id}
                            className="card mb-4 border-0 col-md-8 bg-light shadow p-2"
                        >
                            <div className="row g-0">
                                <div className="col-md-3">
                                    <img
                                        src={item.image}
                                        className="img-fluid rounded-start h-100"
                                        alt="..."
                                    />
                                </div>
                                <div className="col-md-9">
                                    <div className="card-body">
                                        <h5 className="card-title">
                                            {item.name}
                                        </h5>
                                        <p className="card-text">
                                            {item.content}
                                        </p>
                                        <div className="d-flex justify-content-between">
                                            <div>
                                                <p className="card-text">
                                                    цена:{" "}
                                                    <strong>
                                                        {item.price}
                                                    </strong>{" "}
                                                    руб.
                                                </p>
                                            </div>
                                            <div>
                                                <button
                                                    className="btn btn-outline-secondary m-2 fs-5 border-0"
                                                    onClick={() =>
                                                        navigate(
                                                            `/${item._id}/info`
                                                        )
                                                    }
                                                >
                                                    <i className="bi bi-three-dots"></i>
                                                </button>
                                                <ButtonAddToCart
                                                    productId={item._id}
                                                />
                                                <ButtonRemoveProduct
                                                    remove={removeProduct}
                                                    productId={item._id}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

CardFavoriteProduct.propTypes = {
    productsFavorite: PropTypes.array,
    removeProduct: PropTypes.func
};

export default CardFavoriteProduct;

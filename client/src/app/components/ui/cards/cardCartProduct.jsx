import React from "react";
import PropTypes from "prop-types";
import ButtonArrowCount from "../buttons/buttonArrowCount";
import ButtonRemoveProduct from "../buttons/buttonRemoveProduct";

const CardCartProduct = ({
    productsCart,
    removeProduct,
    getCount,
    handleAmount
}) => {
    const disableButton = (type, productId) => {
        const count = getCount(productId);
        if (type === "increment") {
            return count >= 5 ? "disabled" : "";
        } else if (type === "decrement") {
            return count <= 1 ? "disabled" : "";
        }
    };

    return (
        <div className="d-flex flex-md-row mx-3">
            <div className="row">
                {productsCart.map((item) => {
                    return (
                        <div
                            key={item._id}
                            className="card mb-4 border-0 col-md-7 bg-light offset-md-1 shadow p-2"
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
                                                    руб. |{" "}
                                                    <ButtonArrowCount
                                                        disable={disableButton}
                                                        amount={handleAmount}
                                                        productId={item._id}
                                                        type={"increment"}
                                                        classNameIcon={
                                                            "bi bi-caret-up-fill"
                                                        }
                                                    />
                                                    <strong>
                                                        {getCount(item._id)}
                                                    </strong>{" "}
                                                    шт.
                                                    <ButtonArrowCount
                                                        disable={disableButton}
                                                        amount={handleAmount}
                                                        productId={item._id}
                                                        type={"decrement"}
                                                        classNameIcon={
                                                            "bi bi-caret-down-fill"
                                                        }
                                                    />
                                                </p>
                                            </div>
                                            <ButtonRemoveProduct
                                                remove={removeProduct}
                                                productId={item._id}
                                            />
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

CardCartProduct.propTypes = {
    productsCart: PropTypes.array,
    handleAmount: PropTypes.func,
    removeProduct: PropTypes.func,
    getCount: PropTypes.func
};

export default CardCartProduct;

import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import ButtonAddToCart from "../buttons/buttonAddToCart";
import { scrollToUpPage } from "../../../utils/scrollToUpPage";
import ButtonAddToFavorite from "../buttons/buttonAddToFavorite";

const CardProduct = ({ image, name, content, price, id }) => {
    return (
        <div className="col-md-3 mb-4">
            <div className="card h-100 bg-light border-0 shadow">
                <img src={image} className="card-img-top h-50"></img>
                <div className="card-body">
                    <h5 className="card-title text-center">{name}</h5>
                    <hr />
                    <p className="card-text pb-4">{content}</p>
                    <p className="card-text text-end me-3">
                        <small className="pe-2">Цена:</small>{" "}
                        <b className="fs-4">{price}</b>
                        <small> руб.</small>
                    </p>
                    <hr />
                    <div className=" text-center">
                        <Link
                            to={`${id}/info`}
                            className="btn btn-outline-secondary mx-2 fs-5 border-0"
                            onClick={() => scrollToUpPage()}
                        >
                            <i className="bi bi-three-dots"></i>
                        </Link>
                        <ButtonAddToFavorite productId={id} />
                        <ButtonAddToCart productId={id} />
                    </div>
                </div>
            </div>
        </div>
    );
};

CardProduct.propTypes = {
    image: PropTypes.string,
    name: PropTypes.string,
    id: PropTypes.string,
    price: PropTypes.number,
    content: PropTypes.string
};

export default CardProduct;

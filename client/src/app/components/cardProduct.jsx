import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const CardProduct = ({ image, name, content, price, id }) => {
    return (
        <div className="col-md-3 mb-3">
            <div className="card h-100 bg-light border-0">
                <img src={image} className="card-img-top h-50"></img>
                <div className="card-body">
                    <h5 className="card-title text-center">{name}</h5>
                    <p className="card-text">{content}</p>
                    <p className="card-text">
                        <small>Цена:</small> <b className="fs-4">{price}</b>
                        <small> руб.</small>
                    </p>
                </div>
                <div className="card-body text-center">
                    <Link
                        to={`${id}/info`}
                        className="btn btn-outline-secondary m-2 fs-5 border-0"
                    >
                        <i className="bi bi-three-dots"></i>
                    </Link>
                    <a className="btn btn-outline-danger m-2 fs-5 border-0">
                        <i className="bi bi-heart"></i>
                        {/* <i class="bi bi-heart-fill"></i> */}
                    </a>
                    <a className="btn btn-outline-success m-2 fs-5 border-0">
                        <i className="bi bi-cart3"></i>
                    </a>
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

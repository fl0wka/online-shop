import React from "react";
import { useNavigate } from "react-router-dom";

const PaymentUserPage = () => {
    const navigate = useNavigate();
    return (
        <div className="card my-5 mx-auto h-100 col-5 border-0 bg-light shadow p-4 text-center">
            <h2>Успешно оплачено!</h2>
            <hr />
            <h4>Благодарим за покупку!</h4>
            <br />
            <h5>Приятного аппетита и ждем Вас снова!</h5>
            <hr />
            <div>
                <button
                    className="btn btn-outline-success m-2 fs-5 border-0"
                    onClick={() =>
                        navigate("/", {
                            replace: true
                        })
                    }
                >
                    Главная
                </button>
                |
                <button
                    className="btn btn-outline-success m-2 fs-5 border-0"
                    onClick={() =>
                        navigate("/user/favorites", {
                            replace: true
                        })
                    }
                >
                    Избранное
                </button>
            </div>
        </div>
    );
};

export default PaymentUserPage;

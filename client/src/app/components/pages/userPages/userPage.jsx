import React from "react";
import { getCurrentUserData } from "../../../store/currentUser";
import { Link, useNavigate } from "react-router-dom";
import PreviousPage from "../../common/previousPage";
import { useSelector } from "react-redux";
import Loader from "../../common/loader";

const UserPage = () => {
    const currentUser = useSelector(getCurrentUserData());
    const navigate = useNavigate();
    const backPage = () => {
        navigate("/");
    };

    if (!currentUser) return <Loader />;
    return (
        <div className="row">
            <div className="col-md-6 offset-md-3 bg-light shadow p-5 text-center rounded-3">
                <PreviousPage back={backPage} />
                <h2 className="text-center mb-4">Обо мне</h2>
                <hr />
                <h5>Имя: {currentUser.name}</h5>
                <br />
                <h5>Адрес доставки:</h5>
                <h5>
                    город {currentUser.city}, улица {currentUser.street}
                </h5>
                <br />
                <h5>e-mail:</h5>
                <h5>{currentUser.email}</h5>
                <hr />
                <Link
                    to={"/user/edit"}
                    className="btn btn-outline-success fs-2 border-0"
                >
                    <i className="bi bi-pencil"></i>
                </Link>
            </div>
        </div>
    );
};

export default UserPage;

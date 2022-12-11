import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getCurrentUserData, getUserLoadingStatus } from "../store/currentUser";
import Loader from "../components/common/loader";

const UserPage = () => {
    const currentUser = useSelector(getCurrentUserData());
    const isLoading = useSelector(getUserLoadingStatus());
    console.log(isLoading);
    if (!currentUser) return <Loader />;
    return (
        <div className="row">
            <div className="col-md-6 offset-md-3 shadow p-5 text-center">
                <h2 className="text-center mb-4">Обо мне</h2>
                <h5>Имя: {currentUser.name}</h5>
                <br />
                <h5>Адрес доставки:</h5>
                <h5>
                    город {currentUser.city}, улица {currentUser.street}
                </h5>
                <br />
                <h5>e-mail:</h5>
                <h5>{currentUser.email}</h5>
                <Link to={"/user/edit"} className="btn btn-primary mt-5">
                    Редактировать
                </Link>
            </div>
        </div>
    );
};

export default UserPage;

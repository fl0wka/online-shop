import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getProductsLoadingStatus } from "../../../store/products";
import { getCurrentUserData } from "../../../store/currentUser";
import Loader from "../../common/loader";

const NavProfile = () => {
    const currentUser = useSelector(getCurrentUserData());
    const isLoading = useSelector(getProductsLoadingStatus());
    const [isOpen, setOpen] = useState(false);
    const toggleMenu = () => {
        setOpen((prevState) => !prevState);
    };

    if (isLoading) return <Loader margin={"m-2"} />;
    return (
        <div className="dropdown" onClick={toggleMenu}>
            <div className="btn dropdown-toggle d-flex align-items-center">
                <div className="text-white">
                    Привет, {currentUser.name}!
                    <i
                        className={`mx-2 bi bi-caret-${isOpen ? "up" : "down"}`}
                    ></i>
                </div>
            </div>
            <div className={"dropdown-menu w-100" + (isOpen ? " show" : "")}>
                <Link to="user/profile" className="dropdown-item my-2">
                    <b>
                        <i className="bi bi-person-circle mx-2"></i>
                    </b>
                    Мой профиль
                </Link>
                <Link to="user/favorites" className="dropdown-item my-2">
                    <b>
                        <i className="bi bi-heart-fill mx-2"></i>
                    </b>
                    Избранное
                </Link>
                <Link to="logout" className="dropdown-item my-2">
                    <b>
                        <i className="bi bi-door-open-fill mx-2"></i>
                    </b>
                    Выйти
                </Link>
            </div>
        </div>
    );
};

export default NavProfile;

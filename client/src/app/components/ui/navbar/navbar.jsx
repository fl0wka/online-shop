import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getCurrentUserData, getIsLoggedIn } from "../../../store/currentUser";
import NavProfile from "./navProfile";

const Navbar = () => {
    const [toggle, setToggle] = useState(false);
    const currentUser = useSelector(getCurrentUserData());
    const isLoggedIn = useSelector(getIsLoggedIn());

    const toggleCollapse = () => {
        setToggle(!toggle);
    };

    return (
        <nav className="navbar sticky-top navbar-expand-sm navbar-dark bg-dark">
            <div className="container-fluid d-inline-flex justify-content-between">
                <Link to="" className="navbar-brand text-warning">
                    PIZZA TIME
                </Link>
                {/* Кнопка появляется при сужении ширины окна (адаптация) */}
                <button
                    className="navbar-toggler my-2"
                    role="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarContent"
                    aria-controls="navbarContent"
                    aria-expanded="false"
                    onClick={toggleCollapse}
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
            </div>
            <div
                className={`collapse ${toggle ? "show" : ""} navbar-collapse`}
                id="navbarContent"
            >
                {/* <ul className="navbar-nav me-auto my-2">
                        <li className="nav-item">
                            <Link to="menu" className="nav-link me-2" href="">
                                Меню
                            </Link>
                        </li>
                    </ul> */}
                {isLoggedIn && currentUser ? (
                    <>
                        {currentUser.role === "admin" && (
                            <Link
                                to="/admin/editProducts"
                                className="btn btn-success me-2 text-nowrap"
                            >
                                Админ панель
                            </Link>
                        )}
                        <Link
                            to={"user/cart"}
                            className="btn text-warning me-2"
                        >
                            <i className="bi bi-cart3 fs-5"></i>
                        </Link>
                        <NavProfile />
                    </>
                ) : (
                    <Link
                        to="auth"
                        state={{ from: "occupation" }}
                        className="btn text-warning me-2"
                    >
                        Войти
                    </Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;

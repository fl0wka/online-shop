import React, { useState } from "react";
import { Link } from "react-router-dom";
// import Modal from "./modal";
// import Registration from "./registerForm";

const Navbar = () => {
    const [toggle, setToggle] = useState(false);
    // const [modal, setModal] = useState(false);

    // const closeModalHandler = () => {
    //     if (modal) {
    //         setModal(false);
    //     }
    // };

    const toggleCollapse = () => {
        setToggle(!toggle);
    };

    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
            <div className="container-fluid">
                <Link to="" className="navbar-brand text-warning">
                    PIZZA TIME
                </Link>
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
                <div
                    className={`collapse ${
                        toggle ? "show" : ""
                    } navbar-collapse`}
                    id="navbarContent"
                >
                    <ul className="navbar-nav me-auto my-2">
                        <li className="nav-item">
                            <Link to="stock" className="nav-link me-2">
                                Хит продаж
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="menu" className="nav-link me-2" href="">
                                Меню
                            </Link>
                        </li>
                    </ul>
                    <Link to="purchases" className="btn text-warning me-2">
                        <i className="bi bi-cart3 fs-5"></i>
                    </Link>
                    <Link to="auth" className="btn text-warning me-2">
                        Войти
                    </Link>
                    <button className="btn btn-outline-secondary me-2 border-0">
                        Выйти
                    </button>
                </div>
            </div>
        </nav>
    );
};

// {
//     modal && (
//         <Modal title={"Вход/Регистрация"} onClose={closeModalHandler}>
//             <Registration />
//         </Modal>
//     );
// }

export default Navbar;

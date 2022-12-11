import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../components/common/loader";
import { logOut } from "../store/currentUser";

const Logout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(logOut());
        navigate("/");
    }, []);
    return <Loader />;
};

export default Logout;

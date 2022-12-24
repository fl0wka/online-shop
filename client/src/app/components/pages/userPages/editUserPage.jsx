import React, { useState, useEffect } from "react";
import { getCurrentUserData, updateUserData } from "../../../store/currentUser";
import { useSelector, useDispatch } from "react-redux";
import TextField from "../../common/form/textField";
import { useNavigate } from "react-router-dom";
import Loader from "../../common/loader";
import * as yup from "yup";

const EditUserPage = () => {
    const [data, setData] = useState();
    const [errors, setErrors] = useState({});
    const currentUser = useSelector(getCurrentUserData());
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (currentUser) {
            setData(currentUser);
        }
    }, [currentUser]);

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const validatorScheme = yup.object().shape({
        street: yup
            .string()
            .required("Обязательно укажите вашу улицу")
            .matches(
                /^[A-zА-я]+(?:[\s.-][A-zА-я]+)*$/,
                "Название должно содержать только буквы"
            ),
        city: yup
            .string()
            .required("Обязательно укажите ваш город")
            .matches(
                /^[A-zА-я]+(?:[\s.-][A-zА-я]+)*$/,
                "Название должно содержать только буквы"
            ),
        name: yup
            .string()
            .required("Укажите ваше имя")
            .matches(
                /^[A-zА-я]+(?:[\s.-][A-zА-я]+)*$/,
                "ФИО должны содержать только буквы"
            )
    });

    useEffect(() => {
        validate();
    }, [data]);

    const validate = () => {
        validatorScheme
            .validate(data)
            .then(() => setErrors({}))
            .catch((err) => setErrors({ [err.path]: err.message }));
        return Object.keys(errors).length === 0;
    };

    const isValid = Object.keys(errors).length === 0;

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        dispatch(updateUserData(data));
        navigate("/user/profile", {
            replace: true
        });
    };

    if (!data) return <Loader />;
    return (
        <div className="row">
            <div className="col-md-6 offset-md-3 bg-light shadow p-5 rounded-3">
                <h2 className="text-center mb-4">Редактировать</h2>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Имя"
                        name="name"
                        value={data.name}
                        onChange={handleChange}
                        error={errors.name}
                    />
                    <p>Укажите адрес для доставки:</p>
                    <TextField
                        label="Город"
                        name="city"
                        value={data.city}
                        onChange={handleChange}
                        error={errors.city}
                    />
                    <TextField
                        label="Улица"
                        name="street"
                        value={data.street}
                        onChange={handleChange}
                        error={errors.street}
                    />
                    <div className="text-center">
                        <button
                            type="submit"
                            className="btn btn-success my-1 mx-2"
                            disabled={!isValid}
                        >
                            Сохранить
                        </button>
                        <button
                            className="btn btn-danger my-1 mx-2"
                            type="button"
                            onClick={() => navigate(`/user/profile`)}
                        >
                            Отмена
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditUserPage;

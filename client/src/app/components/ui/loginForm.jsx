import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CheckBoxField from "../common/form/checkBoxField";
import TextField from "../common/form/textField";
import { signIn } from "../../store/currentUser";
import { useDispatch } from "react-redux";
import * as yup from "yup";

const LoginForm = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
        stayOn: false
    });
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from || "/";

    const handleChange = (target) => {
        setData((prevState) => ({ ...prevState, [target.name]: target.value }));
    };

    const validatorScheme = yup.object().shape({
        password: yup.string().required("Введите пароль"),
        email: yup.string().required("Введите адрес электронной почты")
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
        dispatch(signIn(data, navigate, from));
    };

    return (
        <>
            <h2 className="text-center mb-4">Вход</h2>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Ваш e-mail"
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                    error={errors.email}
                />
                <TextField
                    label="Пароль"
                    name="password"
                    value={data.password}
                    onChange={handleChange}
                    type="password"
                    error={errors.password}
                />
                <CheckBoxField
                    name="stayOn"
                    value={data.stayOn}
                    onChange={handleChange}
                >
                    Оставаться в системе
                </CheckBoxField>
                <button
                    type="submit"
                    className="btn btn-success w-100 mb-4"
                    disabled={!isValid}
                >
                    Войти
                </button>
            </form>
            <p className="text-center">
                Нет аккаунта?{" "}
                <Link
                    className="text-primary"
                    role="button"
                    to={"/auth/signup"}
                >
                    Регистрация
                </Link>
            </p>
        </>
    );
};

export default LoginForm;

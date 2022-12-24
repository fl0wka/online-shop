import React, { useState, useEffect } from "react";
import { scrollToUpPage } from "../../utils/scrollToUpPage";
import CheckBoxField from "../common/form/checkBoxField";
import { Link, useNavigate } from "react-router-dom";
import RadioField from "../common/form/radioField";
import TextField from "../common/form/textField";
import { signUp } from "../../store/currentUser";
import { useDispatch } from "react-redux";
import * as yup from "yup";

const RegisterForm = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
        name: "",
        sex: "male",
        city: "",
        street: "",
        license: false
    });
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const validatorScheme = yup.object().shape({
        license: yup
            .boolean()
            .oneOf([true], "Вы должны принять пользовательское соглашение"),
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
                "Имя должно содержать только буквы"
            ),
        password: yup
            .string()
            .required("Пароль обязателен для заполнения")
            .matches(
                /(?=.*[A-Z])/,
                "Пароль должен содержать хотя бы одну заглавную букву"
            )
            .matches(
                /(?=.*[0-9])/,
                "Пароль должен содержать хотя бы одну цифру"
            )
            .matches(
                /(?=.*[!@#$%^&*])/,
                "Пароль должен содержать хотя бы один из символов !@#$%^&*"
            )
            .matches(/(?=.{8,})/, "Пароль должен быть не меньше 8 символов"),
        email: yup
            .string()
            .required("Электронная почта обязательна для заполнения")
            .email("Адрес почты введен не корректно")
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
        dispatch(signUp(data));
        navigate("/");
        scrollToUpPage();
    };

    return (
        <>
            <h2 className="text-center mb-4">Регистрация</h2>
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
                <TextField
                    label="Имя"
                    name="name"
                    value={data.name}
                    onChange={handleChange}
                    error={errors.name}
                />
                <RadioField
                    options={[
                        { name: "муж", value: "male" },
                        { name: "жен", value: "female" },
                        { name: "другой", value: "other" }
                    ]}
                    label="Выберите ваш пол:"
                    name="sex"
                    value={data.sex}
                    onChange={handleChange}
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

                <CheckBoxField
                    name="license"
                    value={data.license}
                    onChange={handleChange}
                    error={errors.license}
                >
                    Согласен(а) на обработку личных данных в соответствии с{" "}
                    <a type="button" className="text-primary">
                        пользовательским соглашением
                    </a>
                </CheckBoxField>
                <button
                    type="submit"
                    className="btn btn-success w-100 mb-4"
                    disabled={!isValid}
                >
                    Регистрация
                </button>
            </form>
            <p className="text-center">
                Есть аккаунт?{" "}
                <Link
                    className="text-primary"
                    role="button"
                    to={"/auth/signin"}
                >
                    Войти
                </Link>
            </p>
        </>
    );
};

export default RegisterForm;

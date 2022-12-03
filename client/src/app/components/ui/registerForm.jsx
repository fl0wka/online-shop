import React, { useState, useEffect } from "react";
import CheckBoxField from "../form/checkBoxField";
import RadioField from "../form/radioField";
import TextField from "../form/textField";
import * as yup from "yup";
import { Link } from "react-router-dom";

const RegisterForm = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
        fio: "",
        sex: "male",
        country: "",
        city: "",
        zip: "",
        license: false
    });
    const [errors, setErrors] = useState({});

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
        zip: yup
            .string()
            .required("Индекс обязателен для заполнения")
            .matches(/^\d+$/, "Индекс должен содержать только цифры")
            .matches(/(?=.{6,})/, "Индекс должен состоять из 6 цифр"),
        city: yup
            .string()
            .required("Город обязателен для заполнения")
            .matches(
                /^[A-zА-я]+(?:[\s.-][A-zА-я]+)*$/,
                "Название должно содержать только буквы"
            ),
        country: yup
            .string()
            .required("Страна обязательна для заполнения")
            .matches(
                /^[A-zА-я]+(?:[\s.-][A-zА-я]+)*$/,
                "Название должно содержать только буквы"
            ),
        fio: yup
            .string()
            .required("ФИО обязательны для заполнения")
            .matches(
                /^[A-zА-я]+(?:[\s.-][A-zА-я]+)*$/,
                "ФИО должны содержать только буквы"
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

    // Отключение или включение кнопки Submit при наличии ошибки заполнения поля
    const isValid = Object.keys(errors).length === 0;

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        console.log(data);
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
                    label="ФИО"
                    name="fio"
                    value={data.fio}
                    onChange={handleChange}
                    error={errors.fio}
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
                    label="Страна"
                    name="country"
                    value={data.country}
                    onChange={handleChange}
                    error={errors.country}
                />
                <TextField
                    label="Город"
                    name="city"
                    value={data.city}
                    onChange={handleChange}
                    error={errors.city}
                />
                <TextField
                    label="Индекс"
                    name="zip"
                    value={data.zip}
                    onChange={handleChange}
                    error={errors.zip}
                />

                <CheckBoxField
                    name="license"
                    value={data.license}
                    onChange={handleChange}
                    error={errors.license}
                >
                    Согласен(а) на обработку личных данных в соответствии с
                    <a type="button" className="text-primary">
                        пользовательским соглашением
                    </a>
                </CheckBoxField>
                <button
                    type="submit"
                    className="btn btn-primary w-100 mb-4"
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

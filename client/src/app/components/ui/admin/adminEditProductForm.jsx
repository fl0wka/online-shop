import React, { useEffect, useState } from "react";
import { getProductById, updateProduct } from "../../../store/products";
import TextAreaField from "../../common/form/textAreaField";
import SelectField from "../../common/form/selectField";
import { useDispatch, useSelector } from "react-redux";
import TextField from "../../common/form/textField";
import Loader from "../../common/loader";
import {
    getTypeProduct,
    getTypeProductLoadingStatus
} from "../../../store/typeProduct";
import PropTypes from "prop-types";
import * as yup from "yup";

const AdminEditProductForm = ({ isOpen, productId }) => {
    const [data, setData] = useState("");
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();
    const currentProduct = useSelector(getProductById(productId));
    const typeProduct = useSelector(getTypeProduct());
    const isTypeProductLoadingStatus = useSelector(
        getTypeProductLoadingStatus()
    );

    useEffect(() => {
        if (currentProduct) {
            setData(currentProduct);
        }
    }, [currentProduct]);

    const handleChange = (target) => {
        setData((prevState) => ({ ...prevState, [target.name]: target.value }));
    };

    const validatorScheme = yup.object().shape({
        typeProduct: yup.string().required("Выберите категорию"),
        image: yup.string().required("Введите URL картинки"),
        price: yup
            .string()
            .required("Введите цену")
            .matches(/^[0-9]*$/, "цена должна содержать только цифры"),
        content: yup.string().required("Укажите описание"),
        name: yup
            .string()
            .required("Укажите название продукта")
            .matches(
                /^[A-zА-я]+(?:[\s.-][A-zА-я]+)*$/,
                "Название должно содержать только буквы"
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
        dispatch(updateProduct(data));
        isOpen(false);
    };

    if (isTypeProductLoadingStatus && !data) return <Loader />;

    const TypeProductList = typeProduct.map((item) => ({
        label: item.name,
        value: item._id
    }));

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Название"
                name="name"
                value={data.name}
                onChange={handleChange}
                error={errors.name}
            />
            <TextAreaField
                label="Описание"
                name="content"
                value={data.content}
                onChange={handleChange}
                error={errors.content}
            />
            <SelectField
                label="Категория"
                name="typeProduct"
                value={data.typeProduct}
                onChange={handleChange}
                defaultOption="Выберите..."
                options={TypeProductList}
                error={errors.typeProduct}
            />
            <TextField
                label="Цена, руб."
                name="price"
                value={data.price}
                onChange={handleChange}
                error={errors.price}
            />
            <TextField
                label="URL фото"
                name="image"
                value={data.image}
                onChange={handleChange}
                error={errors.image}
            />
            <div className="text-center">
                <button
                    type="submit"
                    className="btn btn-success me-4 my-2"
                    disabled={!isValid}
                >
                    Сохранить
                </button>
                <button
                    type="button"
                    className="btn btn-danger my-2"
                    onClick={() => isOpen(false)}
                >
                    Отмена
                </button>
            </div>
        </form>
    );
};

AdminEditProductForm.propTypes = {
    productId: PropTypes.string,
    isOpen: PropTypes.func
};

export default AdminEditProductForm;

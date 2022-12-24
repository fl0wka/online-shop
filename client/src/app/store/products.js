import { createAction, createSlice } from "@reduxjs/toolkit";
import productsService from "../services/products.service";
import adminService from "../services/admin.service";
import { toast } from "react-toastify";

const productsSlice = createSlice({
    name: "products",
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        productsRequested: (state) => {
            state.isLoading = true;
        },
        productsReceived: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        productsRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        createdProductReceived: (state, action) => {
            state.entities.push(action.payload);
        },
        updatedProductReceived: (state, action) => {
            state.entities = state.entities.map((item) => {
                if (item._id === action.payload._id) {
                    return action.payload;
                } else {
                    return item;
                }
            });
        },
        removedProductReceived: (state, action) => {
            state.entities = state.entities.filter(
                (p) => p._id !== action.payload
            );
        }
    }
});

const { reducer: productsReducer, actions } = productsSlice;
const {
    productsRequested,
    productsReceived,
    productsRequestFailed,
    createdProductReceived,
    updatedProductReceived,
    removedProductReceived
} = actions;

const createdProductRequested = createAction(
    "products/createdProductRequested"
);
const createdProductRequestFailed = createAction(
    "products/createdProductRequestFailed"
);
const updatedProductRequested = createAction(
    "products/updatedProductRequested"
);
const updatedProductRequestFailed = createAction(
    "products/updatedProductRequestFailed"
);
const removedProductRequested = createAction(
    "products/removedProductRequested"
);
const removedProductRequestFailed = createAction(
    "products/removedProductRequestFailed"
);

export const loadProducts = () => async (dispatch) => {
    dispatch(productsRequested());
    try {
        const data = await productsService.get();
        dispatch(productsReceived(data));
    } catch (error) {
        dispatch(productsRequestFailed(error.message));
    }
};

export const createProduct = (payload) => async (dispatch) => {
    dispatch(createdProductRequested());
    try {
        const data = await adminService.createProduct(payload);

        if (data) {
            dispatch(createdProductReceived(data));
            toast.success("Успешно создано!", {
                position: "top-center",
                autoClose: 1000
            });
        } else {
            toast.error("Такое название уже есть!", {
                position: "top-center",
                autoClose: 1500
            });
        }
    } catch (error) {
        dispatch(createdProductRequestFailed(error.message));
        toast.danger(error.message, {
            position: "top-center",
            autoClose: 1000
        });
    }
};

export const updateProduct = (payload) => async (dispatch) => {
    dispatch(updatedProductRequested());
    try {
        const data = await adminService.updateProduct(payload);
        dispatch(updatedProductReceived(data));
        toast.success("Изменения сохранены!", {
            position: "top-center",
            autoClose: 1000
        });
    } catch (error) {
        dispatch(updatedProductRequestFailed(error.message));
    }
};

export const removeProduct = (productId) => async (dispatch) => {
    dispatch(removedProductRequested());
    try {
        const data = await adminService.removeProduct(productId);
        if (!data) {
            dispatch(removedProductReceived(productId));
            toast.success("Успешно удалено!", {
                position: "top-center",
                autoClose: 1000
            });
        }
    } catch (error) {
        dispatch(removedProductRequestFailed(error.message));
    }
};

export const getProducts = () => (state) => state.products.entities;

export const getProductById = (productId) => (state) => {
    return state.products.entities
        ? state.products.entities.find((item) => item._id === productId)
        : null;
};
export const getProductsLoadingStatus = () => (state) =>
    state.products.isLoading;

export default productsReducer;

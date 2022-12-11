import { createSlice } from "@reduxjs/toolkit";
import productsService from "../services/products.service";

const productsSlice = createSlice({
    name: "products",
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        productRequested: (state) => {
            state.isLoading = true;
        },
        productReceived: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        productRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        }
    }
});

const { reducer: productsReducer, actions } = productsSlice;
const { productRequested, productReceived, productRequestFailed } = actions;

export const loadProducts = () => async (dispatch) => {
    dispatch(productRequested());
    try {
        const data = await productsService.get();
        dispatch(productReceived(data));
    } catch (error) {
        dispatch(productRequestFailed(error.message));
    }
};

export const getProducts = () => (state) => state.products.entities;

export const getProductsById = (productId) => (state) => {
    return state.products.entities
        ? state.products.entities.find((item) => item._id === productId)
        : null;
};
export const getProductsLoadingStatus = () => (state) =>
    state.products.isLoading;

export default productsReducer;

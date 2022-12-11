import { createSlice } from "@reduxjs/toolkit";
import typeProductService from "../services/typeProduct.service";

const typeProductSlice = createSlice({
    name: "typeProduct",
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        typeProductRequested: (state) => {
            state.isLoading = true;
        },
        typeProductReceived: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        typeProductRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        }
    }
});

const { reducer: typeProductReducer, actions } = typeProductSlice;
const { typeProductRequested, typeProductReceived, typeProductRequestFailed } =
    actions;

export const loadTypeProduct = () => async (dispatch) => {
    dispatch(typeProductRequested());
    try {
        const data = await typeProductService.get();
        dispatch(typeProductReceived(data));
    } catch (error) {
        dispatch(typeProductRequestFailed(error.message));
    }
};

export const getTypeProduct = () => (state) => state.typeProduct.entities;
export const getTypeProductLoadingStatus = () => (state) =>
    state.typeProduct.isLoading;

export default typeProductReducer;

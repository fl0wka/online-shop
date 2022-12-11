import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productsReducer from "./products";
import typeProductReducer from "./typeProduct";
import currentUserReducer from "./currentUser";

const rootReducer = combineReducers({
    typeProduct: typeProductReducer,
    products: productsReducer,
    currentUser: currentUserReducer
});

export function createStore() {
    return configureStore({
        reducer: rootReducer
    });
}

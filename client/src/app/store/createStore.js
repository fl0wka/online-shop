import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userFavoriteReducer from "./userFavorite";
import typeProductReducer from "./typeProduct";
import currentUserReducer from "./currentUser";
import productsReducer from "./products";
import userCartReducer from "./userCart";
import usersReducer from "./users";

const rootReducer = combineReducers({
    userFavorite: userFavoriteReducer,
    typeProduct: typeProductReducer,
    currentUser: currentUserReducer,
    products: productsReducer,
    userCart: userCartReducer,
    users: usersReducer
});

export function createStore() {
    return configureStore({
        reducer: rootReducer
    });
}

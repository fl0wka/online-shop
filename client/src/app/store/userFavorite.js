import userFavoriteService from "../services/userFavorite.service";

const { createSlice, createAction } = require("@reduxjs/toolkit");

const userFavoriteSlice = createSlice({
    name: "userFavorite",
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        userFavoriteRequested: (state) => {
            state.isLoading = true;
        },
        userFavoriteReceived: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        userFavoriteRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        createdFavoriteReceived: (state, action) => {
            state.entities = action.payload;
        },
        updatedFavoriteReceived: (state, action) => {
            state.entities = action.payload;
        },
        removedFavoriteReceived: (state, action) => {
            state.entities = action.payload;
        },
        removedAllFavoriteProductsReceived: (state, action) => {
            state.entities = action.payload;
        },
        userFavoriteLoggedOut: (state) => {
            state.entities = null;
            state.isLoading = false;
            state.error = null;
        }
    }
});

const { reducer: userFavoriteReducer, actions } = userFavoriteSlice;
const {
    userFavoriteRequested,
    userFavoriteReceived,
    userFavoriteRequestFailed,
    createdFavoriteReceived,
    updatedFavoriteReceived,
    removedFavoriteReceived,
    removedAllFavoriteProductsReceived,
    userFavoriteLoggedOut
} = actions;

const createdFavoriteRequested = createAction(
    "userFavorite/createdFavoriteRequested"
);
const createdFavoriteRequestFailed = createAction(
    "userFavorite/createdFavoriteRequestFailed"
);
const updatedFavoriteRequested = createAction(
    "userFavorite/updatedFavoriteRequested"
);
const updatedFavoriteRequestFailed = createAction(
    "userFavorite/updatedFavoriteRequestFailed"
);
const removedFavoriteRequested = createAction(
    "userFavorite/removedFavoriteRequested"
);
const removedFavoriteRequestFailed = createAction(
    "userFavorite/removedFavoriteRequestFailed"
);
const removedAllFavoriteProductsRequested = createAction(
    "userFavorite/removedAllFavoriteProductsRequested"
);
const removedAllFavoriteProductsRequestedFailed = createAction(
    "userFavorite/removedFavoriteRequestFailed"
);

export const getUserFavorite = () => async (dispatch) => {
    dispatch(userFavoriteRequested());
    try {
        const data = await userFavoriteService.getUserFavorite();
        dispatch(userFavoriteReceived(data));
    } catch (error) {
        dispatch(userFavoriteRequestFailed(error.message));
    }
};

export const createUserFavorite = () => async (dispatch) => {
    dispatch(createdFavoriteRequested());
    try {
        const data = await userFavoriteService.create({
            products: []
        });
        dispatch(createdFavoriteReceived(data));
    } catch (error) {
        dispatch(createdFavoriteRequestFailed(error.message));
    }
};

export const updateUserFavorite = (payload, productId) => async (dispatch) => {
    dispatch(updatedFavoriteRequested());
    try {
        const updateFavoriteProducts = [...payload.products];
        const favoriteProduct = payload.products.find(
            (item) => item.prodId === productId
        );

        let newFavoriteProducts;
        if (!favoriteProduct) {
            updateFavoriteProducts.push({
                prodId: productId
            });
            newFavoriteProducts = updateFavoriteProducts;
        } else {
            newFavoriteProducts = updateFavoriteProducts.filter(
                (p) => p.prodId !== favoriteProduct.prodId
            );
        }

        const data = await userFavoriteService.update({
            ...payload,
            products: [...newFavoriteProducts]
        });
        dispatch(updatedFavoriteReceived(data));
    } catch (error) {
        dispatch(updatedFavoriteRequestFailed(error.message));
    }
};

export const removeFavoriteProduct =
    (payload, productId) => async (dispatch) => {
        dispatch(removedFavoriteRequested());
        try {
            const removeFavoriteProduct = payload.products.filter(
                (item) => item.prodId !== productId
            );

            const data = await userFavoriteService.update({
                ...payload,
                products: [...removeFavoriteProduct]
            });
            dispatch(removedFavoriteReceived(data));
        } catch (error) {
            dispatch(removedFavoriteRequestFailed(error.message));
        }
    };

export const removeAllFavoriteProducts = (payload) => async (dispatch) => {
    dispatch(removedAllFavoriteProductsRequested());
    try {
        const data = await userFavoriteService.update({
            ...payload,
            products: []
        });
        dispatch(removedAllFavoriteProductsReceived(data));
    } catch (error) {
        dispatch(removedAllFavoriteProductsRequestedFailed());
    }
};

export const logOutUserFavorite = () => (dispatch) => {
    dispatch(userFavoriteLoggedOut());
};

export const getUserFavoriteLoadingStatus = () => (state) =>
    state.userFavorite.isLoading;
export const getUserFavoriteData = () => (state) => state.userFavorite.entities;

export default userFavoriteReducer;

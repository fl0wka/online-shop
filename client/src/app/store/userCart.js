import userCartService from "../services/userCart.service";

const { createSlice, createAction } = require("@reduxjs/toolkit");

const userCartSlice = createSlice({
    name: "userCart",
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        userCartRequested: (state) => {
            state.isLoading = true;
        },
        userCartReceived: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        userCartRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        createdCartReceived: (state, action) => {
            state.entities = action.payload;
        },
        updatedCartReceived: (state, action) => {
            state.entities = action.payload;
        },
        removedCartProductReceived: (state, action) => {
            state.entities = action.payload;
        },
        removedAllCartProductsReceived: (state, action) => {
            state.entities = action.payload;
        },
        userCartLoggedOut: (state) => {
            state.entities = null;
            state.isLoading = false;
            state.error = null;
        }
    }
});

const { reducer: userCartReducer, actions } = userCartSlice;
const {
    userCartRequested,
    userCartReceived,
    userCartRequestFailed,
    createdCartReceived,
    updatedCartReceived,
    removedCartProductReceived,
    removedAllCartProductsReceived,
    userCartLoggedOut
} = actions;

const createdCartRequested = createAction("userCart/createdCartRequested");
const createdCartRequestFailed = createAction(
    "userCart/createdCartRequestFailed"
);
const updatedCartRequested = createAction("userCart/createdCartRequested");
const updatedCartRequestFailed = createAction(
    "userCart/updatedCartRequestFailed"
);
const removedCartProductRequested = createAction(
    "userCart/removedCartProductRequested"
);
const removedCartProductRequestedFailed = createAction(
    "userCart/removedCartProductRequestedFailed"
);
const removedAllCartProductsRequested = createAction(
    "userCart/removeAllCartProductsRequested"
);
const removedAllCartProductsRequestedFailed = createAction(
    "userCart/removeAllCartProductsRequestedFailed"
);

export const getUserCart = () => async (dispatch) => {
    dispatch(userCartRequested());
    try {
        const data = await userCartService.getUserCart();
        dispatch(userCartReceived(data));
    } catch (error) {
        dispatch(userCartRequestFailed(error.message));
    }
};

export const createUserCart = () => async (dispatch) => {
    dispatch(createdCartRequested());
    try {
        const data = await userCartService.create({
            products: []
        });
        dispatch(createdCartReceived(data));
    } catch (error) {
        dispatch(createdCartRequestFailed(error.message));
    }
};

export const updateUserCart = (payload, productId) => async (dispatch) => {
    dispatch(updatedCartRequested());
    try {
        const updateProducts = [...payload.products];
        const product = payload.products.find(
            (item) => item.prodId === productId
        );

        let newProducts;
        if (!product) {
            updateProducts.push({
                prodId: productId,
                count: 1
            });
            newProducts = updateProducts;
        } else {
            newProducts = updateProducts.filter(
                (p) => p.prodId !== product.prodId
            );
        }

        const data = await userCartService.update({
            ...payload,
            products: [...newProducts]
        });
        dispatch(updatedCartReceived(data));
    } catch (error) {
        dispatch(updatedCartRequestFailed(error.message));
    }
};

export const countProductCart = (payload) => async (dispatch) => {
    dispatch(userCartRequested());
    try {
        const data = await userCartService.update(payload);
        dispatch(userCartReceived(data));
    } catch (error) {
        dispatch(userCartRequestFailed());
    }
};

export const removeCartProduct = (payload, productId) => async (dispatch) => {
    dispatch(removedCartProductRequested());
    try {
        const removeCartProduct = payload.products.filter(
            (item) => item.prodId !== productId
        );

        const data = await userCartService.update({
            ...payload,
            products: [...removeCartProduct]
        });
        dispatch(removedCartProductReceived(data));
    } catch (error) {
        dispatch(removedCartProductRequestedFailed(error.message));
    }
};

export const removeAllCartProducts = (payload) => async (dispatch) => {
    dispatch(removedAllCartProductsRequested());
    try {
        const data = await userCartService.update({ ...payload, products: [] });
        dispatch(removedAllCartProductsReceived(data));
    } catch (error) {
        dispatch(removedAllCartProductsRequestedFailed());
    }
};

export const logOutUserCart = () => (dispatch) => {
    dispatch(userCartLoggedOut());
};

export const getUserCartLoadingStatus = () => (state) =>
    state.userCart.isLoading;
export const getUserCartData = () => (state) => state.userCart.entities;

export default userCartReducer;

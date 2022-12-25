import { createAction, createSlice } from "@reduxjs/toolkit";
import localStorageService from "../services/localStorage.service";
import generateAuthError from "../utils/generateAuthError";
import usersService from "../services/users.service";
import authService from "../services/auth.service";
import { toast } from "react-toastify";

const initialState = localStorageService.getAccessToken()
    ? {
          entities: null,
          isLoading: true,
          error: null,
          auth: { userId: localStorageService.getUserId() },
          isLoggedIn: true,
          dataLoaded: false
      }
    : {
          entities: null,
          isLoading: false,
          error: null,
          auth: null,
          isLoggedIn: false,
          dataLoaded: false
      };

const currentUsersSlice = createSlice({
    name: "currentUser",
    initialState,
    reducers: {
        currentUserRequested: (state) => {
            state.isLoading = true;
        },
        currentUserReceived: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
            state.dataLoaded = true;
        },
        currentUserRequestedFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        authRequested: (state) => {
            state.error = null;
        },
        authRequestedSuccess: (state, action) => {
            state.auth = action.payload;
            state.isLoggedIn = true;
        },
        authRequestedFailed: (state, action) => {
            state.error = action.payload;
        },
        currentUserLoggedOut: (state) => {
            state.entities = null;
            state.auth = null;
            state.isLoggedIn = false;
            state.dataLoaded = false;
        },
        currentUserUpdatedSuccess: (state, action) => {
            state.entities = action.payload;
        },
        currentUserUpdatedFailed: (state, action) => {
            state.error = action.payload;
        }
    }
});

const { reducer: currentUserReducer, actions } = currentUsersSlice;
const {
    currentUserRequested,
    currentUserReceived,
    currentUserRequestedFailed,
    currentUserUpdatedSuccess,
    currentUserUpdatedFailed,
    authRequested,
    authRequestedSuccess,
    authRequestedFailed,
    currentUserLoggedOut
} = actions;

const updateUserRequested = createAction("users/updateUserRequested");

export const signIn = (payload, navigate, from) => async (dispatch) => {
    dispatch(authRequested());
    try {
        const data = await authService.login(payload);
        localStorageService.setTokens(data);
        dispatch(authRequestedSuccess({ userId: data.userId }));
        navigate(from);
    } catch (error) {
        const { code, message } = error.response.data.error;
        if (code === 400) {
            const errorMessage = generateAuthError(message);
            dispatch(authRequestedFailed(errorMessage));
            toast.error(errorMessage, {
                position: "top-center",
                autoClose: 2000
            });
        } else {
            dispatch(authRequestedFailed(error.message));
            toast.error(error.message);
        }
    }
};

export const signUp = (payload, navigate, redirect) => async (dispatch) => {
    dispatch(authRequested());
    try {
        const data = await authService.register(payload);
        localStorageService.setTokens(data);
        dispatch(authRequestedSuccess({ userId: data.userId }));
        navigate(redirect);
    } catch (error) {
        const { code, message } = error.response.data.error;
        if (code === 400) {
            const errorMessage = generateAuthError(message);
            dispatch(authRequestedFailed(errorMessage));
            toast.error(errorMessage, {
                position: "top-center",
                autoClose: 2000
            });
        } else {
            dispatch(authRequestedFailed(error.message));
            toast.error(error.message);
        }
    }
};

export const logOut = () => (dispatch) => {
    localStorageService.removeAuthData();
    dispatch(currentUserLoggedOut());
};

export const updateUserData = (payload) => async (dispatch) => {
    dispatch(updateUserRequested());
    try {
        const data = await usersService.update(payload);
        dispatch(currentUserUpdatedSuccess(data));
        toast.success("Изменения сохранены!", {
            position: "top-center",
            autoClose: 1000
        });
    } catch (error) {
        dispatch(currentUserUpdatedFailed(error.message));
        toast.error(error.message);
    }
};

export const loadCurrentUserData = () => async (dispatch) => {
    dispatch(currentUserRequested());
    try {
        const data = await usersService.getUser();
        dispatch(currentUserReceived(data));
        return data;
    } catch (error) {
        dispatch(currentUserRequestedFailed(error.message));
        toast.error(error.message);
    }
};

export const getIsLoggedIn = () => (state) => state.currentUser.isLoggedIn;
export const getCurrentUserData = () => (state) => state.currentUser.entities;
export const getUserLoadingStatus = () => (state) =>
    state.currentUser.isLoading;

export default currentUserReducer;

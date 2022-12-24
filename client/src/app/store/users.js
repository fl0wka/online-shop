import { createSlice } from "@reduxjs/toolkit";
import usersService from "../services/users.service";

const usersSlice = createSlice({
    name: "users",
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        usersRequested: (state) => {
            state.isLoading = true;
        },
        usersReceived: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        usersRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        }
    }
});

const { reducer: usersReducer, actions } = usersSlice;
const { usersRequested, usersReceived, usersRequestFailed } = actions;

export const loadUsers = () => async (dispatch) => {
    dispatch(usersRequested());
    try {
        const data = await usersService.get();
        dispatch(usersReceived(data));
    } catch (error) {
        dispatch(usersRequestFailed(error.message));
    }
};

export const getUsers = () => (state) => state.users.entities;
export const getUsersLoadingStatus = () => (state) => state.users.isLoading;

export default usersReducer;

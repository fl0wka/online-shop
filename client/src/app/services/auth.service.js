import axios from "axios";
import config from "../config.json";
import localStorageService from "./localStorage.service";

const httpAuth = axios.create({
    baseURL: config.apiEndpoint + "auth/"
});

const authService = {
    register: async (payload) => {
        const { data } = await httpAuth.post("signUp", payload);
        return data;
    },
    login: async (payload) => {
        const { data } = await httpAuth.post("signIn", payload);
        return data;
    },
    refresh: async () => {
        const { data } = await httpAuth.post("token", {
            grant_type: "refresh_token",
            refresh_token: localStorageService.getRefreshToken()
        });
        return data;
    }
};

export default authService;

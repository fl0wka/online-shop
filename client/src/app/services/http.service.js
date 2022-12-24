import axios from "axios";
import { toast } from "react-toastify";
import configFile from "../config.json";
import authService from "./auth.service";
import localStorageService from "./localStorage.service";

axios.defaults.baseURL = configFile.apiEndpoint;

axios.interceptors.request.use(
    async function (config) {
        const expiresDate = localStorageService.getTokenExpiresDate();
        const refreshToken = localStorageService.getRefreshToken();
        const isExpired = refreshToken && expiresDate < Date.now();

        if (isExpired) {
            const data = await authService.refresh();
            localStorageService.setTokens(data);
        }
        const accessToken = localStorageService.getAccessToken();
        if (accessToken) {
            config.headers = {
                ...config.headers,
                Authorization: `Bearer ${accessToken}`
            };
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    (res) => {
        return res;
    },
    function (error) {
        const expectedErrors =
            error.response && error.response >= 400 && error.response < 500;

        if (!expectedErrors) {
            console.log("Unexpected Errors");
            toast.error("Что-то пошло не так. Попробуйте позже...");
        }
        return Promise.reject(error);
    }
);

const httpService = {
    get: axios.get,
    put: axios.put,
    post: axios.post,
    delete: axios.delete,
    patch: axios.patch
};

export default httpService;

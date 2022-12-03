import axios from "axios";
import configFile from "../config.json";

axios.defaults.baseURL = configFile.apiEndpoint;

axios.interceptors.request.use(
    function (config) {
        if (configFile.isFireBase) {
            const containSlash = /\/$/gi.test(config.url);
            config.url =
                (containSlash ? config.url.slice(0, -1) : config.url) + ".json";
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    (res) => {
        console.log(res.data);
        return res;
    },
    function (error) {
        const expectedErrors =
            error.response && error.response >= 400 && error.response < 500;

        if (!expectedErrors) {
            console.log("Unexpected Errors");
        }
        return Promise.reject(error);
    }
);

const httpService = {
    get: axios.get,
    put: axios.put,
    post: axios.put,
    delete: axios.delete,
    patch: axios.patch
};

export default httpService;

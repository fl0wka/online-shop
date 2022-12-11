import httpService from "./http.service";
import localStorageService from "./localStorage.service";

const usersEndpoint = "user/";

const usersService = {
    get: async () => {
        const { data } = await httpService.get(usersEndpoint);
        return data;
    },
    getUser: async () => {
        const { data } = await httpService.get(usersEndpoint + "currentuser");
        return data;
    },
    update: async (payload) => {
        const { data } = await httpService.patch(
            usersEndpoint + localStorageService.getUserId(),
            payload
        );
        return data;
    }
};

export default usersService;

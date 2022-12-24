import httpService from "./http.service";

const userFavoriteEndpoint = "favorite/";

const userFavoriteService = {
    get: async () => {
        const { data } = await httpService.get(userFavoriteEndpoint);
        return data;
    },
    create: async (payload) => {
        const { data } = await httpService.post(userFavoriteEndpoint, payload);
        return data;
    },
    getUserFavorite: async () => {
        const { data } = await httpService.get(
            userFavoriteEndpoint + "userFavorite"
        );
        return data;
    },
    update: async (payload) => {
        const { data } = await httpService.patch(
            userFavoriteEndpoint + payload._id,
            payload
        );
        return data;
    }
};

export default userFavoriteService;

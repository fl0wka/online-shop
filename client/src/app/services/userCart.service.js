import httpService from "./http.service";

const userCartEndpoint = "cart/";

const userCartService = {
    get: async () => {
        const { data } = await httpService.get(userCartEndpoint);
        return data;
    },
    create: async (payload) => {
        const { data } = await httpService.post(userCartEndpoint, payload);
        return data;
    },
    getUserCart: async () => {
        const { data } = await httpService.get(userCartEndpoint + "userCart");
        return data;
    },
    update: async (payload) => {
        const { data } = await httpService.patch(
            userCartEndpoint + payload._id,
            payload
        );
        return data;
    }
};

export default userCartService;

import httpService from "./http.service";

const productsEndpoint = "products/";

const productsService = {
    get: async () => {
        const { data } = await httpService.get(productsEndpoint);
        return data;
    },
    getById: async (productId) => {
        const { data } = await httpService.get(productsEndpoint + productId);
        return data;
    }
};

export default productsService;

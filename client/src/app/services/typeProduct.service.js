import httpService from "./http.service";

const typeProductEndpoint = "typeProduct";

const typeProductService = {
    get: async () => {
        const { data } = await httpService.get(typeProductEndpoint);
        return data;
    }
};

export default typeProductService;

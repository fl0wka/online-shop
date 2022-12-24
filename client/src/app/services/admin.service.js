import httpService from "./http.service";

const adminEndpoint = "admin/";

const adminService = {
    createProduct: async (payload) => {
        const { data } = await httpService.post(
            adminEndpoint + "product",
            payload
        );
        return data;
    },
    updateProduct: async (payload) => {
        const { data } = await httpService.patch(
            adminEndpoint + payload._id,
            payload
        );
        return data;
    },
    removeProduct: async (productId) => {
        const { data } = await httpService.delete(adminEndpoint + productId);
        return data;
    }
};

export default adminService;

export const isEmpty = (data) => {
    if (!Array.isArray(data)) {
        return Object.keys(data).length === 0;
    }
    return data.length === 0;
};

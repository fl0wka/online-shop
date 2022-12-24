export const changeFavoriteIcon = (isLoggedIn, favoriteProducts, productId) => {
    const icon = "bi bi-heart";
    const iconCheck = "bi bi-heart-fill";

    if (isLoggedIn && favoriteProducts) {
        if (favoriteProducts) {
            const isProductExists = favoriteProducts.products.find(
                (product) => {
                    return product.prodId === productId;
                }
            );
            return isProductExists ? iconCheck : icon;
        } else {
            return icon;
        }
    } else {
        return icon;
    }
};

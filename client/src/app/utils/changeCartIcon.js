export const changeCartIcon = (isLoggedIn, cartProducts, productId) => {
    const icon = "bi bi-cart";
    const iconCheck = "bi bi-cart-check-fill";

    if (isLoggedIn && cartProducts) {
        if (cartProducts) {
            const isProductExists = cartProducts.products.find((product) => {
                return product.prodId === productId;
            });
            return isProductExists ? iconCheck : icon;
        } else {
            return icon;
        }
    } else {
        return icon;
    }
};

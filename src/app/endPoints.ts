export default class endPoints {
    static readonly products = {
        get: `api/products/get`,
        query: (min: number, max: number) =>
            `api/products/query?min=${min}&max=${max}`,
    };

    static readonly cart = {
        get: "/api/cart/get",
        post: "/api/cart/add",
        delete: (id: string) => `/api/cart/delete${id}`,
        patch: (id: string) => ` "/api/cart/update/${id}`,
    };

    static readonly wishlist = {
        get: "api/wishlist/get",
        post: "api/wishlist/add",
        delete: (id: number) => `api/wishlist/delete${id}`,
    };
}

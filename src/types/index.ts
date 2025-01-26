export interface CartItemTypes {
    productId: number;
    title: string;
    price: number;
    description: string;
    category: string;
    imageUrl: string;
    stock: number;
    rating: {
        Averagerating: number;
        ratingCount: number;
    };
    _id?: string;
}

export interface CartData {
    cartItems: CartItemTypes[];
}

export type ProductsTypes = {
    productId: number;
    title: string;
    price: number;
    description: string;
    category: string;
    imageUrl: string;
    stock: number;
    rating: {
        Averagerating: number;
        ratingCount: number;
    };
};

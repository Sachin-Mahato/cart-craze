export interface CartItemTypes {
    id: number;
    image: string;
    price: number;
    quantity: number;
    title: string;
    description?: string;
    rating?: {
        rate?: number;
        count?: number;
    };
    _id?: number;
}

export interface CartData {
    cartItems: CartItemTypes[];
}

export type ProductsTypes = {
    id: number;
    title: string;
    price: number;
    description?: string;
    category?: string | null;
    image: string;
    rating?: {
        rate: number | null;
        count: number | null;
    };
    quantity?: number;
};

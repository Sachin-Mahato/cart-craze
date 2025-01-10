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
    __v?: number;
    _id?: number;
}

export interface CartData {
    items: CartItemTypes[];
}

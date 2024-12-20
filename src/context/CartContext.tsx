"use client";
import React, {
    createContext,
    ReactNode,
    useState,
    Dispatch,
    SetStateAction,
    useContext,
} from "react";

interface CartItemTypes {
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

interface CartData {
    items: CartItemTypes[];
}

interface CartContextType {
    cartData: CartData | null;
    setCartData: Dispatch<SetStateAction<CartData | null>>;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
    const [cartData, setCartData] = useState<CartData | null>(null);

    return (
        <CartContext.Provider
            value={{
                cartData,
                setCartData,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCartContext() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCartContext must be used within a CartProvider");
    }
    return context;
}

"use client";
import React, {
    createContext,
    ReactNode,
    useState,
    Dispatch,
    SetStateAction,
    useContext,
} from "react";

import { CartData } from "@/types";
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

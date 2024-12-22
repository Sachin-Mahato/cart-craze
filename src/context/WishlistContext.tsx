"use client";
import React, {
    createContext,
    ReactNode,
    useState,
    Dispatch,
    SetStateAction,
    useContext,
} from "react";

interface WishlistItemTypes {
    id: number;
    image: string;
    price: number;
    quantity: number;
    title: string;
    __v?: number;
    _id?: number;
}

interface WishlistData {
    wishlistItems: WishlistItemTypes[];
}

interface WishlistContextType {
    WishlistData: WishlistData | null;
    setWishlistData: Dispatch<SetStateAction<WishlistData | null>>;
}

const WishlistContext = createContext<WishlistContextType | null>(null);

export function WishlistProvider({ children }: { children: ReactNode }) {
    const [WishlistData, setWishlistData] = useState<WishlistData | null>(null);

    return (
        <WishlistContext.Provider
            value={{
                WishlistData,
                setWishlistData,
            }}
        >
            {children}
        </WishlistContext.Provider>
    );
}

export function useWishlistContext() {
    const context = useContext(WishlistContext);
    if (!context) {
        throw new Error("useCartContext must be used within a CartProvider");
    }
    return context;
}

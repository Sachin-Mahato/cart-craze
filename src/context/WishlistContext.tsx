"use client";
import React, {
    createContext,
    ReactNode,
    useContext,
    useReducer,
    useEffect,
} from "react";
import wishlistReducer from "../reducer/wishlistReducer";
import axios from "axios";
import endPoints from "@/app/endPoints";
import { toast } from "@/hooks/use-toast";

interface WishlistItemTypes {
    productId: number;
    imageUrl: string;
    price: number;
    title: string;
    isLiked?: boolean;
    __v?: number;
    _id?: string;
}

type State = {
    wishlist: WishlistItemTypes[];
};

const initialState: State = {
    wishlist: [],
};

interface WishlistContextType {
    WishlistData: WishlistItemTypes[] | null;
    addItemToWishlist: (
        url: string,
        value: WishlistItemTypes | null
    ) => Promise<unknown>;
    getWishlistItems: () => Promise<void>;
}

const WishlistContext = createContext<WishlistContextType | null>(null);

export function WishlistProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(wishlistReducer, initialState);

    async function addItemToWishlist(
        url: string,
        value: WishlistItemTypes | null
    ) {
        try {
            await axios.post(url, value);
            await getWishlistItems();
            toast({
                title: "Added to Wishlist",
                description: "Item successfully added to wishlist",
            });
        } catch (error) {
            console.log("error in getting wishlist data", error);
            toast({
                title: "Failed",
                description: "Unable to add item to wishlist",
                variant: "destructive",
            });
        }
    }

    async function getWishlistItems() {
        try {
            const response = await axios.get(endPoints.wishlist.get);
            const data = response.data.wishlistItems;
            if (data) {
                dispatch({ type: "SET_WISHLIST", payload: data });
            }
        } catch (error) {
            console.error("Error fetching wishlist data", error);
        }
    }

    useEffect(() => {
        getWishlistItems();
    }, []);

    return (
        <WishlistContext.Provider
            value={{
                WishlistData: state.wishlist,
                addItemToWishlist,
                getWishlistItems,
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

"use client";
import { useWishlistContext } from "@/context/WishlistContext";
import endPoints from "@/app/endPoints";
import { Heart } from "lucide-react";

interface WishlistItemTypes {
    productId: number;
    title: string;
    imageUrl: string;
    price: number;
    isLiked?: boolean;
    _id?: string;
}

export default function WishlistButton({ item }: { item: WishlistItemTypes }) {
    const { addItemToWishlist } = useWishlistContext();
    const { productId, imageUrl, title, price } = item;
    const wishlistItem = {
        productId,
        imageUrl,
        title,
        price,
    };
    function handleWishlistToggle(item: WishlistItemTypes) {
        addItemToWishlist(endPoints.wishlist.post, item);
    }

    return (
        <button
            className={`w-full flex justify-end p-2 transition-colors hover:text-red-500`}
            // className={`w-full flex justify-end p-2 transition-colors hover:text-red-500 ${
            // isItemInWishlist ? "text-red-500" : "text-gray-500"
            // }`}
            onClick={() => handleWishlistToggle(wishlistItem)}
        >
            <Heart />
        </button>
    );
}

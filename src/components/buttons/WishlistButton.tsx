"use client";
import { useState } from "react";
import { HeartIcon } from "../icons";
import axios from "axios";

interface wishlistItemTypes {
    id: number;
    title: string;
    image: string;
    price: number;
}

export default function WishlistButton({ item }: { item: wishlistItemTypes }) {
    const [isAdded, setIsAdded] = useState(false);
    const [loading, setLoading] = useState(false);
    const { id, image, title, price } = item;
    const wishlistItem: wishlistItemTypes = {
        id,
        title,
        image,
        price,
    };

    if (loading) {
        return null;
    }

    async function onItemSend() {
        setLoading(true);
        try {
            const response = await axios.post(
                "/api/wishlist/send",
                wishlistItem
            );
            setIsAdded((prev) => !prev);
            console.log(
                `Item ${isAdded ? "removed from" : "added to"} wishlist`
            );
            return response.data;
        } catch (error) {
            console.error(`Error updating wishlist: ${error}`);
        } finally {
            setLoading(false);
        }
    }

    return (
        <button
            className={`w-full flex justify-end p-2 transition-colors ${
                isAdded ? "text-red-500" : "text-gray-500 hover:text-red-500"
            }`}
            onClick={onItemSend}
        >
            <HeartIcon isFilled={isAdded} />
        </button>
    );
}

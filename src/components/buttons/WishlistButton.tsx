"use client";
import { useState } from "react";
import axios from "axios";
import { useWishlistContext } from "@/context/WishlistContext";
import { HeartIcon } from "../icons/index";
import endPoints from "@/app/endPoints";
import { toast } from "@/hooks/use-toast";
import useWishlist from "@/hooks/useWishlist";

interface WishlistItemTypes {
    productId: number;
    title: string;
    imageUrl: string;
    price: number;
    isLiked?: boolean;
    _id?: string;
}

export default function WishlistButton({ item }: { item: WishlistItemTypes }) {
    const [loading, setLoading] = useState(false);
    const { WishlistData, setWishlistData } = useWishlistContext();
    const wishlistItems = WishlistData?.wishlistItems ?? [];
    const { productId, imageUrl, title, price } = item;
    const { deleteItemFromWishlist } = useWishlist();

    // Check if current item exists in wishlist
    const isItemInWishlist = wishlistItems.some(
        (wishlistItem) => wishlistItem.productId === productId
    );

    async function handleWishlistToggle() {
        setLoading(true);
        // Optimistic update
        if (!WishlistData) return;
        const previousWishlistData = WishlistData;
        if (isItemInWishlist) {
            // Remove item optimistically
            setWishlistData((prev) => ({
                ...prev,
                wishlistItems:
                    prev?.wishlistItems.filter(
                        (item) => item.productId !== productId
                    ) ?? [],
            }));
        } else {
            // Add item optimistically
            setWishlistData((prev) => ({
                ...prev,
                wishlistItems: [
                    ...(prev?.wishlistItems ?? []),
                    { productId, title, imageUrl, price, isLiked: true },
                ],
            }));
        }

        try {
            if (isItemInWishlist) {
                const itemToDelete = wishlistItems.find(
                    (item) => item.productId === productId
                );
                if (itemToDelete?._id) {
                    await deleteItemFromWishlist(itemToDelete._id);
                }
            } else {
                const response = await axios.post(endPoints.wishlist.post, {
                    productId,
                    title,
                    imageUrl,
                    price,
                    isLiked: true,
                });
                setWishlistData(response.data);
            }

            toast({
                title: "Wishlist",
                description: isItemInWishlist
                    ? "Item removed from wishlist"
                    : "Item added to wishlist",
            });
        } catch (error) {
            // Revert optimistic update on error
            setWishlistData(previousWishlistData);
            console.error(`Error updating wishlist: ${error}`);
            toast({
                title: "Wishlist error",
                description: "Couldn't update wishlist",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <button
            className={`w-full flex justify-end p-2 transition-colors hover:text-red-500 ${
                isItemInWishlist ? "text-red-500" : "text-gray-500"
            }`}
            onClick={handleWishlistToggle}
        >
            <HeartIcon isLiked={isItemInWishlist} />
        </button>
    );
}

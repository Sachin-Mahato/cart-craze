"use client";
import { useWishlistContext } from "@/context/WishlistContext";
import axios from "axios";
import { toast } from "@/hooks/use-toast";
export default function useWishlist() {
    const { WishlistData, setWishlistData } = useWishlistContext();
    async function deleteItemFromWishlist(id: string) {
        const data = [...(WishlistData?.wishlistItems ?? [])];
        setWishlistData((prev) => ({
            ...prev!,
            wishlistItems: prev!.wishlistItems.filter(
                (items) => items._id !== id
            ),
        }));
        try {
            await axios.delete(`/api/wishlist/delete?id=${id}`);
            toast({
                title: "Remove item from wishlist",
                description: "Successfully remove item from wishlist",
            });
        } catch (error) {
            console.error(`error in deleting item: ${error}`);
            //  revert the UI if the DELETE request fails
            setWishlistData((prev) => ({
                ...prev!,
                wishlistItems: data,
            }));
            toast({
                title: "Error removing item from wishlist",
                description: "Failed to remove item from wishlist",
                variant: "destructive",
            });
        }
    }

    return {
        deleteItemFromWishlist,
    };
}

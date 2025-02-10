"use client";
import axios from "axios";
import { toast } from "@/hooks/use-toast";
import { useWishlistContext } from "@/context/WishlistContext";
export default function useWishlist() {
    const { getWishlistItems } = useWishlistContext();
    async function deleteItemFromWishlist(id: string) {
        try {
            await axios.delete(`/api/wishlist/delete?id=${id}`);
            await getWishlistItems();
            toast({
                title: "Remove item from wishlist",
                description: "Successfully remove item from wishlist",
            });
        } catch (error) {
            console.error(`error in deleting item: ${error}`);

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

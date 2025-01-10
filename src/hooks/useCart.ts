"use client";
import { useCartContext } from "@/context/CartContext";
import axios from "axios";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

export function useCart() {
    const { cartData, setCartData } = useCartContext();
    const items = cartData?.items || [];
    const [isDeleting, setIsDeleting] = useState(false);

    async function deleteItemFromCart(id: number) {
        const data = [...(cartData?.items ?? [])];
        setCartData((prev) => ({
            ...prev!,
            items: prev!.items.filter((item) => item._id !== id),
        }));

        setIsDeleting(false);
        try {
            await axios.delete(`/api/cart/delete?id=${id}`);
            toast({
                title: "Item Deleted",
                description:
                    "The item has been successfully removed from your cart.",
            });
        } catch (error) {
            console.error(`error in deleting item: ${error}`);
            //  revert the UI if the DELETE request fails
            setCartData((prev) => ({
                ...prev!,
                items: data,
            }));
            toast({
                title: "Error",
                description:
                    "There was an error removing the item from your cart. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsDeleting(false);
        }
    }

    async function increaseItemQuantity(id: number) {
        try {
            // Update cartData locally , UI
            setCartData((prev) => ({
                ...prev,
                items: prev!.items.map((value) =>
                    value._id === id
                        ? { ...value, quantity: value.quantity + 1 }
                        : value
                ),
            }));

            // Find the updated item for the PATCH request
            const item = cartData?.items.find((value) => value._id === id);

            if (!item) {
                console.error(`Item with ID ${id} not found`);
                return;
            }

            await axios.patch(`/api/cart/update/${id}`, {
                quantity: item.quantity + 1, // Update quantity here to match the frontend
            });

            toast({
                title: "Quantity Updated",
                description:
                    "The item quantity has been successfully increased.",
            });

            console.log("Quantity updated successfully!");
        } catch (error) {
            console.error(`Error in increasing quantity: ${error}`);
            toast({
                title: "Error",
                description:
                    "There was an error increasing the item quantity. Please try again.",
                variant: "destructive",
            });
        }
    }

    async function decreaseItemQuantity(id: number) {
        const item = cartData?.items.find((item) => item._id === id);

        if (!item) {
            console.error(`Item with ID ${id} not found`);
            return;
        }

        if (item.quantity <= 1) {
            await deleteItemFromCart(id);
            return;
        }

        try {
            // Update cartData locally , UI
            setCartData((prev) => ({
                ...prev,
                items: prev!.items.map((value) =>
                    value._id === id
                        ? { ...value, quantity: value.quantity - 1 }
                        : value
                ),
            }));

            await axios.patch(`/api/cart/update/${id}`, {
                quantity: item.quantity - 1,
            });

            toast({
                title: "Quantity Updated",
                description:
                    "The item quantity has been successfully decreased.",
            });

            console.log("Quantity updated successfully!");
        } catch (error) {
            console.error(`Error in decreasing quantity: ${error}`);
            toast({
                title: "Error",
                description:
                    "There was an error decreasing the item quantity. Please try again.",
                variant: "destructive",
            });
        }
    }

    return {
        items,
        isDeleting,
        deleteItemFromCart,
        increaseItemQuantity,
        decreaseItemQuantity,
        setCartData,
    };
}

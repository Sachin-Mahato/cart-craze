"use client";
import { useCartContext } from "@/context/CartContext";
import axios from "axios";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

export function useCart() {
    const { cartData, setCartData } = useCartContext();
    const items = cartData?.cartItems || [];
    const [isDeleting, setIsDeleting] = useState(false);

    async function deleteItemFromCart(id: string) {
        setIsDeleting(true);

        try {
            await axios.delete(`/api/cart/delete?id=${id}`);

            setCartData((prev) =>
                prev
                    ? {
                          ...prev,
                          cartItems: prev.cartItems.filter(
                              (item) => item._id !== id
                          ),
                      }
                    : null
            );

            toast({
                title: "Item Deleted",
                description:
                    "The item has been successfully removed from your cart.",
            });
        } catch (error) {
            console.error(`error in deleting item: ${error}`);
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

    async function increaseItemQuantity(id: string) {
        const item = cartData?.cartItems.find((item) => item._id === id);

        if (!item) {
            console.error(`Item with ID ${id} not found`);
            return;
        }

        try {
            setCartData((prev) => ({
                ...prev,
                cartItems: prev!.cartItems.map((value) =>
                    value._id === id
                        ? { ...value, stock: value.stock + 1 }
                        : value
                ),
            }));

            await axios.patch(`/api/cart/update/${id}`);

            toast({
                title: "Quantity Updated",
                description:
                    "The item quantity has been successfully increased.",
            });
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

    async function decreaseItemQuantity(id: string) {
        const item = cartData?.cartItems.find((item) => item._id === id);

        if (!item) {
            console.error(`Item with ID ${id} not found`);
            return;
        }

        try {
            if (item.stock - 1 < 1) {
                // Delete item if quantity becomes less than 1
                await deleteItemFromCart(id);
            } else {
                setCartData((prev) => ({
                    ...prev,
                    cartItems: prev!.cartItems.map((value) =>
                        value._id === id
                            ? { ...value, stock: value.stock - 1 }
                            : value
                    ),
                }));

                await axios.patch(`/api/cart/update/${id}`);

                toast({
                    title: "Quantity Updated",
                    description:
                        "The item quantity has been successfully decreased.",
                });
            }
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

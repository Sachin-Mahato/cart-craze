"use client";
import ItemSummary from "./ItemSummary";
import CartItem from "./CartItem";
import { useEffect } from "react";
import { useCart } from "@/hooks/cart/useCart";
import { toast } from "@/hooks/use-toast";
import EndPoints from "../endPoints";
import { getCartData } from "@/helpers/utils";

export default function CartItemsList() {
    const {
        items,
        setCartData,
        isDeleting,
        increaseItemQuantity,
        decreaseItemQuantity,
        deleteItemFromCart,
    } = useCart();

    useEffect(() => {
        async function fetchCartData(url: string) {
            try {
                const data = await getCartData(url);
                setCartData(data);
            } catch (error) {
                console.log(`Error fetching cart items: ${error}`);
                toast({
                    title: "Error",
                    description:
                        "There was an error loading your cart. Please try again.",
                    variant: "destructive",
                });
            }
        }
        fetchCartData(EndPoints.cart.get);
    }, [setCartData]);

    return (
        <>
            {items.length > 0 ? (
                <ul className="space-y-4">
                    {items.map((item) => (
                        <li
                            key={item.productId}
                            className="flex gap-4 justify-around items-center"
                        >
                            <ItemSummary
                                title={item.title}
                                imageUrl={item?.imageUrl}
                                id={item._id!}
                            />
                            <CartItem
                                _id={item._id!}
                                productId={item.productId}
                                price={item.price}
                                stock={item.stock}
                                isDeleting={isDeleting}
                                increaseItemQuantity={increaseItemQuantity}
                                decreaseItemQuantity={decreaseItemQuantity}
                                deleteItemFromCart={deleteItemFromCart}
                            />
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-500 text-lg text-center my-4">
                    Your cart is currently empty. Start shopping to find items
                    you love! 🌟
                </p>
            )}
        </>
    );
}

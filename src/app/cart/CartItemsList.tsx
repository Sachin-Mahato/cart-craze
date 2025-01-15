"use client";
import ItemSummary from "./ItemSummary";
import CartItem from "./CartItem";
import { useEffect } from "react";
import { useCart } from "@/hooks/useCart";
import axios from "axios";
import { toast } from "@/hooks/use-toast";
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
        axios
            .get("/api/cart/receive")
            .then((response) => setCartData(response.data))
            .catch((error) => {
                console.log(`error in cart RenderCartItems: ${error} `);
                toast({
                    title: "Error",
                    description:
                        "There was an error loading your cart. Please try again.",
                    variant: "destructive",
                });
            });
    }, [setCartData]);

    return items.length > 0 ? (
        <ul className="space-y-4">
            {items.map((item) => (
                <li
                    key={item.id || item._id}
                    className="flex gap-4 justify-around items-center"
                >
                    <ItemSummary
                        title={item.title}
                        imageUrl={item?.image}
                        id={item._id!}
                    />
                    <CartItem
                        _id={item._id!}
                        id={item.id}
                        price={item.price}
                        quantity={item.quantity}
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
            Your cart is currently empty. Start shopping to find items you love!
            🌟
        </p>
    );
}

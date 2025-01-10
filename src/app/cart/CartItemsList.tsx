"use client";
import ItemSummary from "./ItemSummary";
import { useCart } from "@/hooks/useCart";
import CartItem from "./CartItem";
import { useCartEffect } from "@/hooks/useCartEffect";

export default function CartItemsList() {
    const {
        items,
        increaseItemQuantity,
        decreaseItemQuantity,
        isDeleting,
        deleteItemFromCart,
        setCartData,
    } = useCart();

    useCartEffect(setCartData);

    return items ? (
        items.map((item) => (
            <section
                key={item.id}
                className="flex gap-4 justify-around items-center"
            >
                <ItemSummary
                    title={item.title}
                    imageUrl={item.image}
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
            </section>
        ))
    ) : (
        <p className="text-gray-500 text-lg text-center my-4">
            🛒 Your cart is currently empty. Start shopping to find items you
            love! 🌟
        </p>
    );
}

"use client";
import { Minus, Plus, Close } from "@/components/icons/index";
import ItemSummary from "./ItemSummary";
import { useEffect } from "react";
import { useCartContext } from "@/context/CartContext";
import axios from "axios";

export default function RenderCartItems() {
    const { cartData, setCartData } = useCartContext();
    const items = cartData?.items || [];

    async function deleteItemFromCart(id: number) {
        const data = [...(cartData?.items ?? [])];
        setCartData((prev) => ({
            ...prev!,
            items: prev!.items.filter((item) => item._id !== id),
        }));
        try {
            await axios.delete(`/api/cart/delete?id=${id}`);
        } catch (error) {
            console.error(`error in deleting item: ${error}`);
            //  revert the UI if the DELETE request fails
            setCartData((prev) => ({
                ...prev!,
                items: data,
            }));
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

            console.log("Quantity updated successfully!");
        } catch (error) {
            console.error(`Error in increasing quantity: ${error}`);
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

            console.log("Quantity updated successfully!");
        } catch (error) {
            console.error(`Error in decreasing quantity: ${error}`);
        }
    }

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get("/api/cart/receive");
                // console.log(response);
                setCartData(response.data);
            } catch (error) {
                console.log(`error in cart RenderCartItems: ${error} `);
            }
        })();
    }, [setCartData]);

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
                <section className="flex flex-col gap-2">
                    <div className="flex gap-2 justify-around items-center">
                        <div className="flex justify-around items-center w-full">
                            <div
                                className="cursor-pointer"
                                onClick={() => decreaseItemQuantity(item._id!)}
                            >
                                <Minus itemId={item.id} />
                            </div>

                            <div className="border-solid h-6 w-6 text-center border-gray-400 border-2">
                                <p className="font-semibold">{item.quantity}</p>
                            </div>
                            <div
                                onClick={() => increaseItemQuantity(item._id!)}
                            >
                                <Plus itemId={item.id} />
                            </div>
                        </div>
                        <div className="flex gap-2 justify-around items-center w-full">
                            <p className="text-[1.5rem]">${item.price}</p>
                            <button
                                type="button"
                                onClick={() => deleteItemFromCart(item._id!)}
                            >
                                <Close />
                            </button>
                        </div>
                    </div>
                </section>
            </section>
        ))
    ) : (
        <p className="text-gray-500 text-lg text-center my-4">
            🛒 Your cart is currently empty. Start shopping to find items you
            love! 🌟
        </p>
    );
}

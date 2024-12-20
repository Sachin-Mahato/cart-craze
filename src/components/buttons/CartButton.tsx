"use client";
import { ProductsTypes } from "@/types";
import axios from "axios";
interface cartItemTypes {
    id: number;
    title: string;
    image: string;
    quantity: number;
    price: number;
    description?: string;
    rating?: {
        rate?: number | null;
        count?: number | null;
    };
}

function CartButton({ item }: { item: ProductsTypes }) {
    const { id, title, image, quantity, price, description, rating } = item;
    const cartItem: cartItemTypes = {
        id,
        title,
        image,
        quantity: quantity ?? 1,
        price,
        description,
        rating,
    };
    async function onItemSend() {
        try {
            const response = await axios.post("/api/cart/send", cartItem);
            console.log(`item send successfully`);
            return response;
        } catch (error) {
            console.log(`error in sending cart item: ${error}`);
        }
    }

    return (
        <>
            <div className="w-full px-4 pb-4 mt-auto">
                <button
                    onClick={onItemSend}
                    type="button"
                    className="
            relative bg-black text-white capitalize w-full h-12 rounded-md font-medium cursor-pointer
            before:absolute before:bg-gray-300 before:bg-opacity-80 before:rounded-md before:bottom-[-0.1em] before:left-[0.1em] before:right-[0.1em] before:top-[0.5em] before:z-[-1]
            after:absolute after:bg-black after:rounded-md after:bottom-0 after:left-0 after:right-0 after:top-0 after:z-[-1]
            hover:scale-105 hover:before:translate-y-[0.1em] hover:after:bg-gray-900
            active:scale-100 active:transition-none
            transition-transform duration-300 ease-in-out
            before:transition-all before:duration-500 before:ease-[cubic-bezier(0,1,.3,1)]
            after:transition-all after:duration-500 after:ease-[cubic-bezier(0,1,.3,1)]"
                >
                    Add to cart
                </button>
            </div>
            ;
        </>
    );
}

export default CartButton;

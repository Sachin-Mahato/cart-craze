"use client";
import { ProductsTypes } from "@/types";
import { Button } from "@/components/ui/button";
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
            return response.data;
        } catch (error) {
            console.log(`error in sending cart item: ${error}`);
        }
    }

    return (
        <>
            <div className="w-full px-4 pb-4 mt-auto">
                <Button variant={"default"} onClick={onItemSend}>
                    Add to cart
                </Button>
            </div>
            ;
        </>
    );
}

export default CartButton;

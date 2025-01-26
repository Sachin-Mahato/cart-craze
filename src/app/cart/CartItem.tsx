"use client";
import { Minus, Plus, Close } from "@/components/icons/index";

interface CartItemProps {
    _id: string;
    productId: number;
    stock: number;
    price: number;
    isDeleting: boolean;
    increaseItemQuantity: (id: string) => void;
    decreaseItemQuantity: (id: string) => void;
    deleteItemFromCart: (id: string) => void;
}

import { FC } from "react";

const CartItem: FC<CartItemProps> = ({
    _id,
    productId,
    stock,
    price,
    isDeleting,
    increaseItemQuantity,
    decreaseItemQuantity,
    deleteItemFromCart,
}) => {
    return (
        <section className="flex flex-col gap-2">
            <div className="flex gap-2 justify-around items-center">
                <div className="flex justify-around items-center w-full">
                    <div
                        className="cursor-pointer"
                        onClick={() => decreaseItemQuantity(_id!)}
                    >
                        <Minus itemId={productId} />
                    </div>

                    <div className="border-solid h-6 w-6 text-center border-gray-400 border-2">
                        <p className="font-semibold">{stock}</p>
                    </div>
                    <div onClick={() => increaseItemQuantity(_id!)}>
                        <Plus itemId={productId} />
                    </div>
                </div>
                <div className="flex gap-2 justify-around items-center w-full">
                    <p className="text-[1.5rem]">${price}</p>
                    <button
                        disabled={isDeleting}
                        type="button"
                        onClick={() => deleteItemFromCart(_id!)}
                    >
                        {isDeleting ? "" : <Close />}
                    </button>
                </div>
            </div>
        </section>
    );
};

export default CartItem;

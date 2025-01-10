"use client";
import { Minus, Plus, Close } from "@/components/icons/index";

interface CartItemProps {
    _id: number;
    id: number;
    quantity: number;
    price: number;
    isDeleting: boolean;
    increaseItemQuantity: (id: number) => void;
    decreaseItemQuantity: (id: number) => void;
    deleteItemFromCart: (id: number) => void;
}

import { FC } from "react";

const CartItem: FC<CartItemProps> = ({
    _id,
    id,
    quantity,
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
                        <Minus itemId={id} />
                    </div>

                    <div className="border-solid h-6 w-6 text-center border-gray-400 border-2">
                        <p className="font-semibold">{quantity}</p>
                    </div>
                    <div onClick={() => increaseItemQuantity(_id!)}>
                        <Plus itemId={id} />
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

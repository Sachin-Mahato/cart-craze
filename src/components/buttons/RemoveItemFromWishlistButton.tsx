"use client";
import useWishlist from "@/hooks/useWishlist";
import { Trash } from "lucide-react";

export default function RemoveItemFromWishlistButton({ id }: { id: string }) {
    const { deleteItemFromWishlist } = useWishlist();
    return (
        <>
            <button
                type="button"
                className="cursor-pointer"
                onClick={() => deleteItemFromWishlist(id)}
            >
                <Trash />
            </button>
        </>
    );
}

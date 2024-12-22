"use client";
import Image from "next/image";
import { useWishlistContext } from "@/context/WishlistContext";
import axios from "axios";
import { useEffect } from "react";
import RemoveItemFromWishlistButton from "@/components/buttons/RemoveItemFromWishlistButton";

export default function RenderWishlist() {
    const { WishlistData, setWishlistData } = useWishlistContext();
    const wishlistItems = WishlistData?.wishlistItems || [];

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get("/api/wishlist/get");
                setWishlistData(response.data);
            } catch (error) {
                console.log(`error in renderWishlist:${error}`);
            }
        })();
    }, [setWishlistData]);

    console.log(wishlistItems);

    return (
        <section className="p-4 sm:p-6 bg-gray-100 min-h-screen">
            <div className="space-y-4">
                {wishlistItems.length > 0 ? (
                    wishlistItems.map((item) => (
                        <div
                            key={item.id}
                            className="flex flex-col sm:flex-row items-center bg-white shadow-md rounded-lg p-4 gap-4"
                        >
                            <Image
                                src={item.image}
                                alt={item.title}
                                className="w-24 h-24 sm:w-16 sm:h-16 rounded-lg object-cover"
                                width={96}
                                height={96}
                            />
                            <div className="flex-1 text-center sm:text-left">
                                <p className="text-lg font-semibold text-gray-900 truncate max-w-[300px] sm:max-w-[200px]">
                                    {item.title}
                                </p>
                                <p className="text-gray-600 truncate max-w-[300px] sm:max-w-[200px]">
                                    {item.title}
                                </p>
                                <p className="text-gray-600">
                                    Price:{" "}
                                    <span className="font-medium">
                                        ${item.price}
                                    </span>
                                </p>
                            </div>
                            <RemoveItemFromWishlistButton id={item._id!} />
                        </div>
                    ))
                ) : (
                    <p className="text-gray-600 text-center">
                        Your wishlist is empty.
                    </p>
                )}
            </div>
        </section>
    );
}

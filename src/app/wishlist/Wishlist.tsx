"use client";
import { useWishlistContext } from "@/context/WishlistContext";
import EmptyWishlist from "./EmptyWishlist";
import WishlistItem from "./WishlistItem";

export default function Wishlist() {
    const { WishlistData } = useWishlistContext();

    return (
        <section className="p-4 sm:p-6 bg-gray-100 min-h-screen">
            <div className="space-y-4">
                {WishlistData!.length > 0 ? (
                    WishlistData!.map((item) => (
                        <WishlistItem key={item.productId} item={item} />
                    ))
                ) : (
                    <EmptyWishlist />
                )}
            </div>
        </section>
    );
}

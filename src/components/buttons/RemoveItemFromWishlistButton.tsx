import axios from "axios";
import { Trash } from "@/components/icons/index";
import { useWishlistContext } from "@/context/WishlistContext";

export default function RemoveItemFromWishlistButton({ id }: { id: number }) {
    const { WishlistData, setWishlistData } = useWishlistContext();
    async function deleteItemFromWishlist(id: number) {
        const data = [...(WishlistData?.wishlistItems ?? [])];
        setWishlistData((prev) => ({
            ...prev!,
            wishlistItems: prev!.wishlistItems.filter(
                (items) => items._id !== id
            ),
        }));
        try {
            await axios.delete(`/api/wishlist/delete?id=${id}`);
        } catch (error) {
            console.error(`error in deleting item: ${error}`);
            //  revert the UI if the DELETE request fails
            setWishlistData((prev) => ({
                ...prev!,
                wishlistItems: data,
            }));
        }
    }
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

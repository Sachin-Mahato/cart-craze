// Separate component for individual wishlist item
import Image from "next/image";
import RemoveItemFromWishlistButton from "@/components/buttons/RemoveItemFromWishlistButton";

interface WishlistItemTypes {
    productId: number;
    imageUrl: string;
    price: number;
    title: string;
    isLiked?: boolean;
    __v?: number;
    _id?: string;
}

export default function WishlistItem({ item }: { item: WishlistItemTypes }) {
    const {imageUrl,title,price,_id} = item;
    return (
        <div className="flex flex-col sm:flex-row items-center bg-white shadow-md rounded-lg p-4 gap-4">
            <Image
                src={imageUrl}
                alt={title}
                className="w-24 h-24 sm:w-16 sm:h-16 rounded-lg object-cover"
                width={96}
                height={96}
            />
            <div className="flex-1 text-center sm:text-left">
                <p className="text-lg font-semibold text-gray-900 truncate max-w-[300px] sm:max-w-[200px]">
                    {title}
                </p>
                <p className="text-gray-600 truncate max-w-[300px] sm:max-w-[200px]">
                    {title}
                </p>
                <p className="text-gray-600">
                    Price: <span className="font-medium">${price}</span>
                </p>
            </div>
            <RemoveItemFromWishlistButton id={_id!} />
        </div>
    );
}

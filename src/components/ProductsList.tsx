import Image from "next/image.js";
// import { HeartIcon } from "@/components/icons/index";
import CartButton from "./buttons/CartButton";
import { ProductsTypes } from "@/types/index";
import { HeartIcon } from "./icons";
type ProductsListProps = {
  item: ProductsTypes;
};

export default function ProductCard({ item }: ProductsListProps) {
  return (
    <div className="flex flex-col justify-between w-[180px] h-[320px] bg-[#F6F6F6] shadow-lg rounded-lg overflow-hidden lg:w-[200px] lg:h-[360px] border border-gray-200">
      {/* Heart Icon Section */}
      <div className="w-full flex justify-end p-2">
        <HeartIcon itemId={item.id} />
      </div>

      {/* Product Image */}
      <div className="flex items-center justify-center h-28 w-full bg-gray-100">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.title}
            className="w-24 h-28 object-contain mix-blend-darken"
            width={300}
            height={300}
            priority
          />
        ) : (
          <p className="text-gray-500">No image available</p>
        )}
      </div>

      {/* Product Info */}
      <div className="flex flex-col items-center px-4 text-center space-y-2">
        <p className="font-medium text-sm text-gray-800 line-clamp-2">
          {item.title}
        </p>
        <p className="text-lg font-semibold text-gray-900">${item.price}</p>
      </div>

      {/* Cart Button */}
      <CartButton item={item} />
    </div>
  );
}

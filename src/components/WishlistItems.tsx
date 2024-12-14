/* eslint-disable no-var */
"use client";
import Link from "next/link";
import useGlobalContext from "@/context/useGlobalContext";
import RemoveItemFromWishlistButton from "./buttons/RemoveItemFromWishlistButton";
import WishlistItemDetails from "./WishlistItemDetails";
export default function WishlistItems() {
  var { wishlist } = useGlobalContext();
  return (
    <>
      {wishlist.length > 0 ? (
        wishlist.map((item, idx) => {
          return (
            <section
              key={idx}
              className=" flex flex-col gap-8 mt-8 lg:mx-40 lg:flex-row lg:justify-between lg:border-b-2 lg:border-t-2 lg:border-solid lg:border-[#e6e6e6]"
            >
              <WishlistItemDetails
                imageUrl={item.image}
                title={item.title}
                price={item.price}
              />
              <div className="mx-4 lg:flex lg:justify-center lg:items-center lg:gap-4  lg:mb-4">
                <Link href={"/cart"}>
                  <button
                    type="button"
                    className="bg-black text-white capitalize w-full rounded-md font-medium cursor-pointer lg:w-40 lg:h-10"
                  >
                    add to cart
                  </button>
                </Link>
                {/* <button
                  type="button"
                  onClick={() => removeItemFromWishlist(item.id)}
                  className="cursor-pointer"
                >
                  <Trash />
                </button> */}
                <RemoveItemFromWishlistButton itemId={item.id} />
              </div>
            </section>
          );
        })
      ) : (
        <p className="text-center text-lg font-semibold text-gray-700 mt-10 mb-4 p-4 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 shadow-lg">
          Your wishlist is empty. Start adding products you love! ❤️🛒
        </p>
      )}
    </>
  );
}

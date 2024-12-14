/* eslint-disable no-var */
"use client";
import useGlobalContext from "@/context/useGlobalContext";
import { Trash } from "@/components/icons/index";

export default function RemoveItemFromWishlistButton({
  itemId,
}: {
  itemId: number;
}) {
  var { removeItemFromWishlist } = useGlobalContext();
  return (
    <>
      <button
        type="button"
        onClick={() => removeItemFromWishlist(itemId)}
        className="cursor-pointer"
      >
        <Trash />
      </button>
    </>
  );
}

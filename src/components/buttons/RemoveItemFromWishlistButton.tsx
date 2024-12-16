import { Trash } from "@/components/icons/index";

export default function RemoveItemFromWishlistButton() {
  return (
    <>
      <button type="button" className="cursor-pointer">
        <Trash />
      </button>
    </>
  );
}

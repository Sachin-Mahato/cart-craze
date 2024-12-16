/* eslint-disable no-var */
import Link from "next/link";
import { CartIcon } from "../icons/index";

function CartLink() {
  return (
    <>
      {
        <Link href={"/cart"}>
          <div className="flex gap-4 items-center">
            <p>Cart</p>
            <CartIcon />
          </div>
        </Link>
      }
    </>
  );
}

export default CartLink;

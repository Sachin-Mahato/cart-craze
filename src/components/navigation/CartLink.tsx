import Link from "next/link";
import { ShoppingCart } from "lucide-react";

function CartLink() {
    return (
        <>
            {
                <Link href={"/cart"}>
                    <div className="flex gap-4 items-center">
                        <p>Cart</p>
                        <ShoppingCart />
                    </div>
                </Link>
            }
        </>
    );
}

export default CartLink;

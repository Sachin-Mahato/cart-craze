import Link from "next/link";

export default function WishlistLink() {
    return (
        <>
            <Link href={"/wishlist"}>
                <div>
                    <p>Wishlist</p>
                </div>
            </Link>
        </>
    );
}

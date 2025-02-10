import Link from "next/link";

export default function ProductsLinks() {
    return (
        <>
            <Link href={"/products"}>
                <div>
                    <p>Products</p>
                </div>
            </Link>
        </>
    );
}

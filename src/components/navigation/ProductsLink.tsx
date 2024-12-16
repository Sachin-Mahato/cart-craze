import Link from "next/link";

function ProductsLinks() {
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

export default ProductsLinks;

import { ProductsTypes } from "../types/index";
import ProductsList from "./ProductsList";

export const revalidate = 60;
export default async function Products({ URL }: { URL: string }) {
    const data = await fetch(URL, { next: { revalidate: revalidate } });
    const products = await data.json();
    return (
        <div className="font-[sans-serif] bg-white my-4 lg:mx-20">
            <section className="p-4 mx-auto lg:max-w-7xl sm:max-w-full">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-6">
                    {products.map((product: ProductsTypes, idx: number) => (
                        <div key={idx}>
                            <ProductsList item={product} />
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

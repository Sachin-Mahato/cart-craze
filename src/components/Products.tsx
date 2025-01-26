"use client";

import { useProductsContext } from "@/context/ProductsContext";
import ProductsList from "@/components/ProductsList";

export default function Products() {
    const { productsData } = useProductsContext();
    return (
        <div className="font-[sans-serif] bg-white my-4 lg:mx-20">
            <section className="p-4 mx-auto lg:max-w-7xl sm:max-w-full">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-6">
                    {productsData.map((product, idx: number) => (
                        <div key={idx}>
                            <ProductsList item={product} />
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

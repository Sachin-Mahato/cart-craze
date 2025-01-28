"use client";
import ProductsList from "@/components/ProductsList";
import { useProductsContext } from "@/context/ProductsContext";
import { ProductsTypes } from "@/types";

export default function Products() {
    const { productsData } = useProductsContext();
    const data = productsData;
    return (
        <div className="font-[sans-serif] bg-white my-4 lg:mx-20">
            <section className="p-4 mx-auto lg:max-w-7xl sm:max-w-full">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-6">
                    {data?.length > 0
                        ? data?.map((product: ProductsTypes, idx: number) => (
                              <div key={idx}>
                                  <ProductsList item={product} />
                              </div>
                          ))
                        : "No data found"}
                </div>
            </section>
        </div>
    );
}

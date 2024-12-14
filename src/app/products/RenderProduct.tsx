/* eslint-disable no-var */
"use client";
import useGlobalContext from "@/context/useGlobalContext";
import ProductsList from "@/components/ProductsList";
export default function RenderProduct() {
  var { products } = useGlobalContext();
  return (
    <section className="grid grid-cols-2 gap-4 place-items-center mt-6 lg:grid-cols-4">
      {products && products?.length > 0 ? (
        products.map((item, idx) => (
          <div key={idx}>
            <ProductsList item={item} />
          </div>
        ))
      ) : (
        <p>No products available</p> // Fallback message if no items
      )}
    </section>
  );
}

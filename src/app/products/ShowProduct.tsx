import Products from "@/components/Products";

export default async function ShowProducts() {
    const response = await fetch("http://localhost:3000/api/products/get");
    const data = await response.json();
    const productsData = data.productsData;
    return <Products data={productsData} />;
}

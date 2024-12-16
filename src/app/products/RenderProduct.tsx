import Products from "@/components/Products";
const URL = "https://fakestoreapi.com/products";
export default function RenderProduct() {
  return <Products URL={URL} />;
}

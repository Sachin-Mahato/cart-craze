import Products from "@/components/Products";
import Footer from "@/components/Footer/Footer";
import Category from "@/components/Category";

const URL = "https://fakestoreapi.com/products?limit=8";
export default function Home() {
  return (
    <>
      <Category />
      <div className="mx-20">
        <Products URL={URL} />
      </div>
      <Footer />
    </>
  );
}

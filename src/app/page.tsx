import Products from "@/components/Products";
import Footer from "@/components/Footer/Footer";
import Category from "@/components/Category";
import Navbar from "@/components/navigation/Navbar";

const URL = "https://fakestoreapi.com/products?limit=8";
export default function Home() {
    return (
        <>
            <Navbar />
            <Category />
            <div className="mx-20">
                <Products URL={URL} />
            </div>
            <Footer />
        </>
    );
}

import Footer from "@/components/Footer/Footer";
import Category from "@/components/Category";
import Navbar from "@/components/navigation/Navbar";

export default function Home() {
    return (
        <>
            <Navbar />
            <Category />
            <div className="mx-20"></div>
            <Footer />
        </>
    );
}

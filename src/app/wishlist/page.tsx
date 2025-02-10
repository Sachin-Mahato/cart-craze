// /* eslint-disable no-var */
import Footer from "@/components/Footer/Footer";
import RenderWishlist from "./Wishlist";

function Wishlist() {
    return (
        <>
            <section className="my-8 lg:mx-40">
                <h2 className="font-semibold text-3xl text-gray-900 mb-6 mt-4 tracking-wide">
                    Wishlist
                </h2>
                <RenderWishlist />
            </section>
            <Footer />
        </>
    );
}

export default Wishlist;

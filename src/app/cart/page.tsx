import Footer from "@/components/Footer/Footer";
import OderSummary from "@/app/cart/OderSummary";
import CartItemsList from "./CartItemsList";
function Cart() {
    return (
        <>
            <section className="flex flex-col gap-4 justify-around">
                <h2 className="capitalize font-semibold text-2xl ml-4 mb-6">
                    shopping cart
                </h2>
                <CartItemsList />
            </section>
            <OderSummary />:
            <Footer />
        </>
    );
}

export default Cart;

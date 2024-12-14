import Footer from "@/components/Footer/Footer";
import OderSummary from "@/components/OderSummary";
import RenderCartItems from "./RenderCartItems";
function Cart() {
  return (
    <>
      <section className="flex flex-col gap-4 justify-around">
        <h2 className="capitalize font-semibold text-2xl ml-4 mb-6">
          shopping cart
        </h2>
        <RenderCartItems />
      </section>
      <OderSummary />:
      <Footer />
    </>
  );
}

export default Cart;

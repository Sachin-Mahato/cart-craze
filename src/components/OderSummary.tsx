"use client";
// import { useCartContext } from "@/context/CartContext";
function OderSummary() {
    // const { cartData } = useCartContext();

    // const getTotal =
    //     cartData?.items.reduce((total, item) => {
    //         return total + item.quantity * item.price;
    //     }, 0) || 0; // Default to 0 if cartData or items is undefined

    // const taxRate = 0.05; // Example: 5% tax
    // const shippingRate = 0.05; // Example: 5% shipping cost

    // const tax = getTotal * taxRate;
    // const shippingCost = getTotal * shippingRate;
    // const total = getTotal + tax + shippingCost;

    return (
        <section className="mx-2">
            {/* <div className="my-10 flex flex-col  rounded-md border-solid border-[#EBEBEB] border-2 ">
                <h2 className="text-2xl font-semibold capitalize mt-14 mb-10 ml-2">
                    order summary
                </h2>
                <article className="flex flex-col gap-4 mx-2 ">
                    <div className="flex justify-between items-center">
                        <h3 className="capitalize font-semibold">subtotal</h3>
                        <p>${getTotal}</p>
                    </div>
                    <div className="flex justify-between items-center">
                        <p>Estimate Tax</p>
                        <p>${tax.toFixed(2)}</p>
                    </div>
                    <div className="flex justify-between items-center">
                        <p>Estimate shipping & handling</p>
                        <p>${shippingCost.toFixed(2)}</p>
                    </div>
                    <div className="flex justify-between items-center">
                        <p className="font-semibold">Total</p>
                        <div className="font-semibold">${total.toFixed(2)}</div>
                    </div>
                </article>
                <div className="w-full mt-12 mb-14 text-center">
                    <button
                        type="button"
                        className="bg-black text-white capitalize  rounded-md cursor-pointer py-4  w-[95%]"
                    >
                        checkout
                    </button>
                </div>
            </div> */}
        </section>
    );
}

export default OderSummary;

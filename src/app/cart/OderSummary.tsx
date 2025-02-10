"use client";
import { useCart } from "@/hooks/cart/useCart";
import SummaryRow from "./SummaryRow";
export default function OrderSummary() {
    const { items } = useCart();

    const getTotal =
        items.reduce((total, item) => total + item.stock * item.price, 0) || 0;

    const taxRate = 0.05;
    const shippingRate = 0.05;

    const tax = getTotal * taxRate;
    const shippingCost = getTotal * shippingRate;
    const total = getTotal + tax + shippingCost;

    return (
        <section className="mx-2">
            <div className="my-10 flex flex-col rounded-md border-solid border-[#EBEBEB] border-2">
                <h2 className="text-2xl font-semibold capitalize mt-14 mb-10 ml-2">
                    order summary
                </h2>
                <article className="flex flex-col gap-4 mx-2">
                    <SummaryRow label="Subtotal" amount={getTotal} isBold />
                    <SummaryRow label="Estimate Tax" amount={tax} />
                    <SummaryRow
                        label="Estimate shipping & handling"
                        amount={shippingCost}
                    />
                    <SummaryRow label="Total" amount={total} isBold />
                </article>
                <div className="w-full mt-12 mb-14 text-center">
                    <button
                        type="button"
                        className="bg-black text-white capitalize rounded-md cursor-pointer py-4 w-[95%]"
                        onClick={() =>
                            alert(
                                "This feature is currently in development and will be available soon"
                            )
                        }
                    >
                        checkout
                    </button>
                </div>
            </div>
        </section>
    );
}

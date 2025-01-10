import { Minus, Plus, Close } from "@/components/icons/index";
import ItemSummary from "./ItemSummary";
import { useCart } from "@/hooks/useCart";

export default function RenderCartItems() {
    const {
        items,
        increaseItemQuantity,
        decreaseItemQuantity,
        isDeleting,
        deleteItemFromCart,
    } = useCart();

    return items ? (
        items.map((item) => (
            <section
                key={item.id}
                className="flex gap-4 justify-around items-center"
            >
                <ItemSummary
                    title={item.title}
                    imageUrl={item.image}
                    id={item._id!}
                />
                <section className="flex flex-col gap-2">
                    <div className="flex gap-2 justify-around items-center">
                        <div className="flex justify-around items-center w-full">
                            <div
                                className="cursor-pointer"
                                onClick={() => decreaseItemQuantity(item._id!)}
                            >
                                <Minus itemId={item.id} />
                            </div>

                            <div className="border-solid h-6 w-6 text-center border-gray-400 border-2">
                                <p className="font-semibold">{item.quantity}</p>
                            </div>
                            <div
                                onClick={() => increaseItemQuantity(item._id!)}
                            >
                                <Plus itemId={item.id} />
                            </div>
                        </div>
                        <div className="flex gap-2 justify-around items-center w-full">
                            <p className="text-[1.5rem]">${item.price}</p>
                            <button
                                disabled={isDeleting}
                                type="button"
                                onClick={() => deleteItemFromCart(item._id!)}
                            >
                                {isDeleting ? "" : <Close />}
                            </button>
                        </div>
                    </div>
                </section>
            </section>
        ))
    ) : (
        <p className="text-gray-500 text-lg text-center my-4">
            🛒 Your cart is currently empty. Start shopping to find items you
            love! 🌟
        </p>
    );
}

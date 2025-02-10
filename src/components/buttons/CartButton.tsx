"use client";
import { ProductsTypes } from "@/types";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import endPoints from "@/app/endPoints";
import useCartButton from "@/hooks/cart/useCartButton";
export default function CartButton({ item }: { item: ProductsTypes }) {
    const { isProcessing, addItemToCart } = useCartButton();
    const { productId, title, imageUrl, price, stock, description, rating } =
        item;
    const cartItem = {
        productId,
        title,
        imageUrl,
        price,
        description,
        stock,
        rating,
    };

    return (
        <>
            <div className="w-full px-4 pb-4 mt-auto">
                <Button
                    variant={"default"}
                    disabled={isProcessing}
                    onClick={() => addItemToCart(endPoints.cart.post, cartItem)}
                    className="w-full"
                >
                    {isProcessing ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                            Please Wait...
                        </>
                    ) : (
                        "Add to Cart"
                    )}
                </Button>
            </div>
        </>
    );
}

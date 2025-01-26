/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { ProductsTypes } from "@/types";
import { Button } from "@/components/ui/button";
import axios from "axios";
import useSessionHook from "@/hooks/useSessionHook";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import endPoints from "@/app/endPoints";

function CartButton({ item }: { item: ProductsTypes }) {
    const { status, session } = useSessionHook();
    const [isProcessing, setIsProcessing] = useState(false);
    const router = useRouter();
    const { toast } = useToast();
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

    async function addItemToCart(url: string) {
        setIsProcessing(true);

        if (status === "unauthenticated" && !session) {
            handleUnauthorized();
            return;
        }

        try {
            const response = await axios.post(url, cartItem);

            handleSuccess();
            return response.data;
        } catch (error) {
            handleError(error);
        } finally {
            setIsProcessing(false);
        }
    }

    // Helper functions for improved readability
    function handleUnauthorized() {
        toast({
            title: "Unauthorized",
            description: "You need to sign in to add items to the cart.",
            variant: "destructive",
        });
        router.replace("/sign-up");
        setIsProcessing(false);
    }

    function handleSuccess() {
        toast({
            title: "Success",
            description: "Item has been added to your cart.",
        });
    }

    function handleError(error: any) {
        console.error(`Error in adding item to cart:`, error);

        toast({
            title: "Error",
            description:
                "There was an error adding the item to your cart. Please try again.",
            variant: "destructive",
        });
    }

    return (
        <>
            <div className="w-full px-4 pb-4 mt-auto">
                <Button
                    variant={"default"}
                    disabled={isProcessing}
                    onClick={() => addItemToCart(endPoints.cart.post)}
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

export default CartButton;

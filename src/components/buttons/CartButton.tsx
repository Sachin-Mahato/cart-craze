"use client";
import { ProductsTypes } from "@/types";
import { Button } from "@/components/ui/button";
import axios from "axios";
import useSessionHook from "@/hooks/useSessionHook";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Loader2 } from "lucide-react";

interface cartItemTypes {
    id: number;
    title: string;
    image: string;
    quantity: number;
    price: number;
    description?: string;
    rating?: {
        rate?: number | null;
        count?: number | null;
    };
}

function CartButton({ item }: { item: ProductsTypes }) {
    const { id, title, image, quantity, price, description, rating } = item;
    const { status, session } = useSessionHook();
    const [isProcessing, setIsProcessing] = useState(false);
    const router = useRouter();
    const { toast } = useToast();
    const cartItem: cartItemTypes = {
        id,
        title,
        image,
        quantity: quantity ?? 1,
        price,
        description,
        rating,
    };
    async function addItemToCart() {
        if (status === "unauthenticated" && !session) {
            setIsProcessing(true);
            toast({
                title: "Unauthorized",
                description: "You need to sign in to add items to the cart.",
                variant: "destructive",
            });
            router.replace("/sign-up");
            return;
        }
        try {
            const response = await axios.post("/api/cart/send", cartItem);
            console.log(`Item added to cart successfully`);
            toast({
                title: "Success",
                description: "Item has been added to your cart.",
            });
            return response.data;
        } catch (error) {
            console.log(`Error in adding item to cart: ${error}`);
            toast({
                title: "Error",
                description:
                    "There was an error adding the item to your cart. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsProcessing(false);
        }
    }

    return (
        <>
            <div className="w-full px-4 pb-4 mt-auto">
                <Button
                    variant={"default"}
                    disabled={isProcessing}
                    onClick={addItemToCart}
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

"use client";
import useSessionHook from "../useSessionHook";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

type cartItemTypes = {
    productId: number;
    title: string;
    imageUrl: string;
    price: number;
    description: string;
    stock: number;
    rating: {
        averageRating: number;
        ratingCount: number;
    };
};

export default function useCartButton() {
    const { status, session } = useSessionHook();
    const { toast } = useToast();
    const [isProcessing, setIsProcessing] = useState(false);
    const router = useRouter();

    async function addItemToCart(url: string, cartItem: cartItemTypes) {
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

    function handleError(error: unknown) {
        console.error(`Error in adding item to cart:`, error);

        toast({
            title: "Error",
            description:
                "There was an error adding the item to your cart. Please try again.",
            variant: "destructive",
        });
    }

    return {
        isProcessing,
        addItemToCart,
    };
}

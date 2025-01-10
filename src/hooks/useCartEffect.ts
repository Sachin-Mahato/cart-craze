"use client";
import { useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import axios from "axios";
import { Dispatch, SetStateAction } from "react";
import { CartData } from "@/types";

export function useCartEffect(
    setCartData: Dispatch<SetStateAction<CartData | null>>
) {
    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get("/api/cart/receive");
                setCartData(response.data);
            } catch (error) {
                console.log(`error in cart RenderCartItems: ${error} `);
                toast({
                    title: "Error",
                    description:
                        "There was an error loading your cart. Please try again.",
                    variant: "destructive",
                });
            }
        })();
    }, [setCartData]);
}

"use client";
import EndPoints from "@/app/endPoints";
import axios from "axios";
import { ReactNode, useEffect } from "react";
import { createContext, useContext, useState } from "react";

interface Product {
    productId: number;
    title: string;
    price: number;
    description: string;
    category: string;
    imageUrl: string;
    stock: number;
    rating: {
        Averagerating: number;
        ratingCount: number;
    };
}

interface ProductsContextType {
    productsData: Product[];
}

const ProductsContext = createContext<ProductsContextType | null>(null);

export function ProductsProvider({ children }: { children: ReactNode }) {
    const [productsData, setProductsData] = useState<Product[]>([]);

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(EndPoints.products.get);
                const data = await response.data.productsData;
                setProductsData(data);
            } catch (error) {
                console.log("err in products data", error);
            }
        })();
    }, []);
    return (
        <ProductsContext.Provider value={{ productsData }}>
            {children}
        </ProductsContext.Provider>
    );
}

export function useProductsContext() {
    const context = useContext(ProductsContext);
    if (!context) {
        throw new Error(
            "useProductsContext must be used within a ProductsProvider"
        );
    }
    return context;
}

"use client";
import EndPoints from "@/app/endPoints";
import axios from "axios";
import { ReactNode, useEffect, useReducer } from "react";
import { createContext, useContext } from "react";
import productReducer from "./productReducer";

interface Product {
    productId: number;
    title: string;
    price: number;
    description: string;
    category: string;
    imageUrl: string;
    stock: number;
    rating: {
        averageRating: number;
        ratingCount: number;
    };
}
type State = {
    products: Product[];
};
const initialState: State = {
    products: [],
};

interface ProductsContextType {
    productsData: Product[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    sortProducts: (sortType: string) => any;
}

const ProductsContext = createContext<ProductsContextType | null>(null);

export function ProductsProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(productReducer, initialState);

    function sortProducts(sortType: string) {
        dispatch({ type: "SORT_PRODUCTS", payload: sortType });
    }

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(EndPoints.products.get);
                const data = await response.data.productsData;
                dispatch({ type: "SET_PRODUCTS", payload: data });
            } catch (error) {
                console.log("err in products data", error);
            }
        })();
    }, []);

    return (
        <ProductsContext.Provider
            value={{ productsData: state.products, sortProducts }}
        >
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

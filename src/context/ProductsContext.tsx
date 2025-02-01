/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
    ReactNode,
    useEffect,
    useReducer,
    useState,
    useCallback,
    Dispatch,
    SetStateAction,
} from "react";
import { createContext, useContext } from "react";
import productReducer from "./productReducer";
import endPoints from "@/app/endPoints";
import queryDB from "@/helpers/queryDB";
import getData from "@/helpers/productData";

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

type PriceRange = {
    min: number;
    max?: number;
};

interface ProductsContextType {
    productsData: Product[];
    sortProducts: (sortType: string) => void;
    queryProducts: (val: string) => void;
    setQuery: Dispatch<SetStateAction<PriceRange | any>>;
    query: any;
}

const ProductsContext = createContext<ProductsContextType | null>(null);

export function ProductsProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(productReducer, initialState);
    const [query, setQuery] = useState<PriceRange>({ min: 0, max: 1000 });

    function sortProducts(sortType: string) {
        dispatch({ type: "SORT_PRODUCTS", payload: sortType });
    }

    const queryProducts = useCallback((val: string) => {
        if (val === "5-50") {
            return { min: 5, max: 50 };
        } else if (val === "51-100") {
            return {
                min: 51,
                max: 100,
            };
        } else if (val === "101-200") {
            return {
                min: 101,
                max: 200,
            };
        } else if (val === "201") {
            return {
                min: 201,
                max: 2000,
            };
        }
    }, []);

    useEffect(() => {
        (async () => {
            try {
                const data = await getData(endPoints.products.get);
                if (data) {
                    dispatch({ type: "SET_PRODUCTS", payload: data });
                }
            } catch (error) {
                console.error("Error in products data:", error);
            }
        })();
    }, []);

    useEffect(() => {
        (async () => {
            try {
                const { min, max } = query;
                const data = await queryDB(min, max!);
                console.log("query db data", data);
            } catch (error) {
                console.log("Error in querying DB", error);
            }
        })();
    }, [query, queryProducts]);

    return (
        <ProductsContext.Provider
            value={{
                productsData: state.products,
                sortProducts,
                queryProducts,
                setQuery,
                query,
            }}
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

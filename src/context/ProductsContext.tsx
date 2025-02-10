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
import productReducer from "../reducer/productReducer";
import queryDB from "@/helpers/queryDB";

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
    max: number;
};

interface ProductsContextType {
    productsData: Product[];
    sortProducts: (sortType: string) => void;
    queryProducts: (val: string) => { min: number; max: number };
    setQuery: Dispatch<SetStateAction<PriceRange | any>>;
    query: PriceRange;
    isLoading: boolean;
}

const ProductsContext = createContext<ProductsContextType | null>(null);

export function ProductsProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(productReducer, initialState);
    const [query, setQuery] = useState<PriceRange>({ min: 0, max: 10000 });
    const [isLoading, isSetLoading] = useState(false);

    function sortProducts(sortType: string) {
        dispatch({ type: "SORT_PRODUCTS", payload: sortType });
    }

    const queryProducts = useCallback((val: string) => {
        switch (val) {
            case "5-50":
                return { min: 5, max: 50 };
            case "51-100":
                return { min: 51, max: 100 };
            case "101-200":
                return { min: 101, max: 200 };
            case "201-1000":
                return { min: 201, max: 2000 };
            case "products":
                return { min: 1, max: 20000 };
            default:
                return { min: 1, max: 100000 };
        }
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            isSetLoading(true);
            try {
                const { min, max } = query;
                const response = await queryDB(min, max);
                const data = response?.products;
                if (data) {
                    dispatch({ type: "SET_PRODUCTS", payload: data });
                }
            } catch (error) {
                console.error("Error in products data:", error);
            } finally {
                isSetLoading(false);
            }
        };

        fetchData();
    }, [query]);

    return (
        <ProductsContext.Provider
            value={{
                productsData: state.products,
                sortProducts,
                queryProducts,
                setQuery,
                query,
                isLoading,
                // handleProductsRange,
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

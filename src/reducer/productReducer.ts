import { ProductsTypes } from "@/types";
import { Action } from "@radix-ui/react-toast";
interface State {
    products: ProductsTypes[];
}

type Action =
    | { type: "SET_PRODUCTS"; payload: ProductsTypes[] }
    | { type: "SORT_PRODUCTS"; payload: string }
    | { type: "FILTER_PRICE"; payload: string }
    | { type: "QUERY_PRODUCTS"; payload: string };

export default function productReducer(state: State, action: Action): State {
    if (action.type === "SET_PRODUCTS") {
        return { ...state, products: action.payload };
    }

    if (action.type === "SORT_PRODUCTS") {
        const sortedProducts = [...state.products];
        const sortItem = action.payload.toLocaleLowerCase().trim();

        if (sortItem === "popularity") {
            sortedProducts.sort(
                (x, y) => y.rating?.averageRating - x.rating.averageRating
            );
        } else if (sortItem === "relevance") {
            sortedProducts.sort(
                (x, y) => x.rating?.averageRating - y.rating.averageRating
            );
        } else if (sortItem === "high-to-low") {
            sortedProducts.sort((x, y) => y.price - x.price);
        } else if (sortItem === "low-to-high") {
            sortedProducts.sort((x, y) => x.price - y.price);
        } else {
            console.warn("Invalid sort type provided", action.payload);
        }

        return {
            // update the ui
            ...state,
            products: sortedProducts,
        };
    }

    return state;
}

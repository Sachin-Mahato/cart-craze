/* eslint-disable @typescript-eslint/no-explicit-any */
// Product and Wishlist Types
export type ProductsTypes = {
    id: number;
    title: string;
    price: number;
    description?: string;
    category?: string | null;
    image: string;
    rating?: {
        rate: number | null;
        count: number | null;
    };
    quantity?: number; // Added quantity property
};

// App Context Types
export type AppContextTypes = {
    // States
    loading: boolean;
    products: ProductsTypes[] | null;
    error: string | null;
    wishlist: ProductsTypes[];
    filterItemsByPrice: ProductsTypes[];
    filterCategory: ProductsTypes[];
    isMenuOpen: boolean;
    selectValue: string;
    range: number;

    // Functions
    // toggleClickHandler: () => void;
    // wishlistHandler: (id: number) => void;
    // sortByPopularity: (value: string) => void;
    // selectClickHandler: (selectRef: React.RefObject<HTMLSelectElement>) => void;
    // removeItemFromWishlist: (id: number) => void;
    // sliceByPrice: (evt: React.ChangeEvent<HTMLInputElement>) => void;
    // selectCategory: (evt: React.MouseEvent<HTMLDivElement> | any) => void;

    // Refs
    selectRef: any;
    wishlistRef: any;
    priceRef: any;
};

// Cart Context

// Initial State Types
export type InitialStateTypes = {
    loading: boolean;
    products: ProductsTypes[];
    error: string | null;
    wishlist: ProductsTypes[];
    filterItemsByPrice: ProductsTypes[];
    filterCategory: ProductsTypes[];
};
// Action Types

export type WishlistTypes = {
    id: number;
    title: string;
    price: number;
    image: string;
};

export type ActionTypes =
    | {
          type: "FETCH_PRODUCTS_START";
          payload?: { loading: boolean; error: string | null };
      }
    | {
          type: "FETCH_PRODUCTS_SUCCESS";
          payload: {
              loading: boolean;
              error: string | null;
              products: ProductsTypes[];
              filterItemsByPrice: ProductsTypes[];
              filterCategory: ProductsTypes[];
          };
      }
    | {
          type: "FETCH_PRODUCTS_ERROR";
          payload: { loading: boolean; error: string };
      }
    | { type: "WISHLIST"; payload: WishlistTypes[] | number }
    | { type: "REMOVE_ITEM_WISHLIST"; payload: number }
    | { type: "POPULARITY_SORT"; payload: string }
    | { type: "SLICE_ITEMS"; payload: number }
    | { type: "SELECT_CATEGORY"; payload: string };

// State Types
export type StateTypes = {
    loading: boolean;
    products: ProductsTypes[]; // Updated to ProductsTypes[] instead of []
    error: string | null;
    wishlist: ProductsTypes[]; // Updated to use ProductsTypes for consistency
    filterItemsByPrice: ProductsTypes[];
    filterCategory: ProductsTypes[];
};

export type Reducer = (state: StateTypes, action: ActionTypes) => StateTypes;

interface WishlistItemTypes {
    productId: number;
    imageUrl: string;
    price: number;
    title: string;
    isLiked?: boolean;
    __v?: number;
    _id?: string;
}
interface State {
    wishlist: WishlistItemTypes[];
}
type Action = { type: "SET_WISHLIST"; payload: WishlistItemTypes[] };

export default function wishlistReducer(state: State, action: Action): State {
    if (action.type === "SET_WISHLIST") {
        return {
            ...state,
            wishlist: action.payload,
        };
    }

    return state;
}

import mongoose, { Schema, Document } from "mongoose";
interface Rating {
    averageRating?: number | null;
    ratingCount?: number | null;
}
interface CartItem {
    productId: number;
    title: string;
    imageUrl: string;
    stock: number;
    price: number;
    description?: string;
    rating?: Rating;
}

interface Cart extends Document {
    items: CartItem[];
    owner: mongoose.Schema.Types.ObjectId;
}
const cartSchema = new Schema<Cart>(
    {
        items: [
            {
                productId: { type: Number, required: true },
                imageUrl: { type: String, required: true },
                title: { type: String, required: true },
                stock: { type: Number, required: true, default: 1 },
                price: { type: Number, required: true },
                description: { type: String },
                rating: {
                    averageRating: { type: Number },
                    ratingCount: { type: Number },
                },
            },
        ],
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true }
);

const CartModel =
    (mongoose.models.Cart as mongoose.Model<Cart>) ||
    mongoose.model<Cart>("Cart", cartSchema);

export default CartModel;

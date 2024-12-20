import mongoose, { Schema } from "mongoose";

interface Cart {
    id: number;
    title: string;
    image: string;
    quantity: number;
    price: number;
    description?: string;
    rating?: {
        rate?: number;
        count?: number;
    };
}

const cartSchema = new Schema<Cart>({
    id: { type: Number, required: true },
    title: { type: String, required: true },
    image: { type: String, required: true },
    quantity: { type: Number, required: true, default: 1 },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    rating: {
        rate: { type: Number, required: true },
        count: { type: Number, required: true },
    },
});

const CartModel =
    (mongoose.models.Cart as mongoose.Model<Cart>) ||
    mongoose.model<Cart>("Cart", cartSchema);

export default CartModel;

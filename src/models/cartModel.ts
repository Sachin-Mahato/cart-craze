import mongoose, { Schema, Document } from "mongoose";

interface Cart extends Document {
    items: {
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
    }[];
    owner: mongoose.Schema.Types.ObjectId;
}
const cartSchema = new Schema<Cart>(
    {
        items: [
            {
                id: { type: Number, required: true },
                title: { type: String, required: true },
                image: { type: String, required: true },
                quantity: { type: Number, required: true, default: 1 },
                price: { type: Number, required: true },
                description: { type: String },
                rating: {
                    rate: { type: Number },
                    count: { type: Number },
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

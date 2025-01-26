import mongoose, { Schema } from "mongoose";

interface Wishlist extends Document {
    wishlistItems: {
        productId: number;
        title: string;
        imageUrl: string;
        price: number;
        isLiked: boolean;
    }[];
    owner: mongoose.Schema.Types.ObjectId;
}

const wishlistSchema = new Schema<Wishlist>(
    {
        wishlistItems: [
            {
                productId: { type: Number, required: true },
                title: { type: String, required: true },
                imageUrl: { type: String, required: true },
                price: { type: Number, required: true },
                isLiked: { type: Boolean, require: true, default: false },
            },
        ],
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const WishlistModel =
    (mongoose.models.Wishlist as mongoose.Model<Wishlist>) ||
    mongoose.model<Wishlist>("Wishlist", wishlistSchema);

export default WishlistModel;

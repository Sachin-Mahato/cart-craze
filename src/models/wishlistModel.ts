import mongoose, { Schema } from "mongoose";

interface Wishlist extends Document {
    wishlistItems: {
        id: number;
        title: string;
        image: string;
        price: number;
    }[];
    owner: mongoose.Schema.Types.ObjectId;
}

const wishlistSchema = new Schema<Wishlist>(
    {
        wishlistItems: [
            {
                id: { type: Number, required: true },
                title: { type: String, required: true },
                image: { type: String, required: true },
                price: { type: Number, required: true },
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

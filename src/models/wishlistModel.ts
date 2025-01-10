import mongoose, { Schema } from "mongoose";

interface Wishlist {
    id: number;
    title: string;
    image: string;
    price: number;
    owner: mongoose.Schema.Types.ObjectId;
}

const wishlistSchema = new Schema<Wishlist>({
    id: { type: Number, required: true },
    title: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
});

const WishlistModel =
    (mongoose.models.Wishlist as mongoose.Model<Wishlist>) ||
    mongoose.model<Wishlist>("Wishlist", wishlistSchema);

export default WishlistModel;

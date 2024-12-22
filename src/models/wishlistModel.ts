import mongoose, { Schema } from "mongoose";

interface Wishlist {
    id: number;
    title: string;
    image: string;
    price: number;
}

const wishlistSchema = new Schema<Wishlist>({
    id: { type: Number, required: true },
    title: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
});

const WishlistModel =
    (mongoose.models.Wishlist as mongoose.Model<Wishlist>) ||
    mongoose.model<Wishlist>("Wishlist", wishlistSchema);

export default WishlistModel;

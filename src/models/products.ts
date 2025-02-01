import mongoose, { Schema, Document } from "mongoose";

interface Rating {
    averageRating?: number | null;
    ratingCount?: number | null;
}

export type Product = {
    productId: number;
    title: string;
    imageUrl: string;
    stock: number;
    price: number;
    description?: string;
    category: string;
    rating?: Rating;
};

interface ProductCollection extends Document {
    products: Product[];
}

const productSchema = new Schema<Product>({
    productId: { type: Number, required: true },
    title: { type: String, required: true },
    imageUrl: { type: String, required: true },
    stock: { type: Number, required: true, default: 1 },
    price: { type: Number, required: true },
    description: { type: String, default: null },
    category: { type: String, required: true },
    rating: {
        averageRating: { type: Number, default: null },
        ratingCount: { type: Number, default: null },
    },
});

const productCollectionSchema = new Schema<ProductCollection>({
    products: { type: [productSchema], required: true },
});

const productCollectionModel =
    (mongoose.models.ProductCollection as mongoose.Model<ProductCollection>) ||
    mongoose.model<ProductCollection>(
        "ProductCollection",
        productCollectionSchema
    );

export default productCollectionModel;

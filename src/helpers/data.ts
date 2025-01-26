/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import productCollectionModel from "@/models/products";

export default async function data() {
    const URL = "https://fakestoreapi.com/products";

    try {
        // Check if data already exists
        const existingCollection = await productCollectionModel.findOne();
        if (existingCollection) {
            return existingCollection.products;
        }

        // Fetch data from external API
        const response = await axios.get(URL);
        const fetchedData = response.data;

        // Transform data to match the schema
        const formattedData = fetchedData.map((product: any) => ({
            productId: product.id,
            title: product.title,
            imageUrl: product.image,
            price: product.price,
            description: product.description,
            category: product.category,
            rating: {
                averageRating: product.rating?.rate || null,
                ratingCount: product.rating?.count || null,
            },
        }));

        // Save the formatted data to the database
        const savedCollection = await productCollectionModel.create({
            products: formattedData,
        });

        return savedCollection.products;
    } catch (error) {
        console.error("Error in fetching or saving data:", error);
        throw new Error("Failed to fetch or save product data");
    }
}

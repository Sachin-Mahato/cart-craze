import { dbConnect } from "@/dbConfig/dbConnect";
import productCollectionModel from "@/models/products";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const min = parseFloat(searchParams.get("min") || "0");
    const max = parseFloat(searchParams.get("max") || "100000");

    if (isNaN(min) || isNaN(max)) {
        return NextResponse.json(
            { message: "Invalid parameter", success: false },
            { status: 400 }
        );
    }

    try {
        await dbConnect();

        // Fetch products directly without extra nesting
        const products = await productCollectionModel
            .aggregate([
                { $unwind: "$products" }, // Split nested products into separate docs
                { $match: { "products.price": { $gte: min, $lte: max } } }, // Filter by price
                { $replaceRoot: { newRoot: "$products" } }, // Flatten to return only product objects
            ])
            .exec();

        if (!products.length) {
            return NextResponse.json(
                { message: "No products found", success: false },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: "Success", success: true, products },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error in products query:", error);

        return NextResponse.json(
            { message: "Internal server error", success: false },
            { status: 500 }
        );
    }
}

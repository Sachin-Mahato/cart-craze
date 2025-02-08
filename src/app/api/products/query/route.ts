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

        const products = await productCollectionModel
            .aggregate([
                { $unwind: "$products" }, // Unwind first
                {
                    $match: { "products.price": { $gte: min, $lte: max } }, // Dynamic filtering
                },
                {
                    $group: { _id: "$_id", products: { $push: "$products" } },
                },
            ])
            .exec();

        if (!products) {
            return NextResponse.json(
                { message: "Failed to filter products", success: false },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { message: "success", success: true, products },
            { status: 200 }
        );
    } catch (error) {
        console.error(
            "Error in products /query: ",
            error instanceof Error ? error.message : error
        );

        return NextResponse.json(
            { message: "Internal server error", success: false },
            { status: 500 }
        );
    }
}

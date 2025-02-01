import { dbConnect } from "@/dbConfig/dbConnect";
import productCollectionModel from "@/models/products";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;

    const min = parseFloat(searchParams.get("min") || "0");
    const max = parseFloat(searchParams.get("max") || "Infinity");

    if (isNaN(min) || isNaN(max)) {
        return NextResponse.json(
            {
                message: "Invalid parameter",
                success: false,
            },
            {
                status: 400,
            }
        );
    }

    try {
        await dbConnect();

        const data = await productCollectionModel
            .aggregate([
                {
                    $match: {
                        "products.price": { $gte: 5, $lte: 50 },
                    },
                },
                {
                    $unwind: "$products",
                },
                {
                    $match: {
                        "products.price": { $gte: 5, $lte: 50 },
                    },
                },
                {
                    $group: {
                        _id: "$_id",
                        products: { $push: "$products" },
                    },
                },
            ])
            .exec();

        return NextResponse.json(
            {
                message: "success",
                success: true,
                data,
            },
            {
                status: 200,
            }
        );
    } catch (error) {
        console.error(
            "Error in products /query: ",
            error instanceof Error ? error.message : error
        );

        return NextResponse.json(
            {
                message: "Internal server error",
                success: false,
            },
            {
                status: 500,
            }
        );
    }
}

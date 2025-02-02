import { NextRequest } from "next/server";
import productCollectionModel from "@/models/products";
import { dbConnect } from "@/dbConfig/dbConnect";

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const category = searchParams.get("category");

    if (!category) {
        return Response.json(
            {
                message:
                    "Please provide valid category or category doesn't exits",
                success: false,
            },
            {
                status: 401,
            }
        );
    }

    try {
        await dbConnect();

        await productCollectionModel.aggregate([
            { $unwind: "$products" },
            { $match: { "products.category": category } },
            {
                $group: {
                    _id: "$_id",
                    products: { $push: "$products" },
                },
            },
        ]);

        return Response.json(
            {
                message: "Successful query category",
                success: true,
            },
            {
                status: 200,
            }
        );
    } catch (error) {
        console.log("Error in querying Category", error);
        return Response.json(
            {
                message: "Unable get category data",
                success: false,
            },
            {
                status: 500,
            }
        );
    }
}

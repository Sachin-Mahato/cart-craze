import { dbConnect } from "@/dbConfig/dbConnect";
import { NextResponse } from "next/server";
import Cart from "@/models/cartModel";
export async function GET() {
    try {
        await dbConnect();

        const allCartItems = await Cart.aggregate([{ $match: { items } }]);
    } catch (error) {
        console.error(
            `Error in GET /cart: ${error instanceof Error ? error.message : error}`
        );
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

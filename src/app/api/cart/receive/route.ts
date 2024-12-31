import { NextResponse } from "next/server";
import { dbConnect } from "@/dbConfig/dbConnect";
import Cart from "@/models/cartModel";

export async function GET() {
    await dbConnect();
    try {
        const items = await Cart.find();

        return NextResponse.json({
            message: "successfully get the data",
            success: true,
            items,
        });
    } catch (error) {
        if (error instanceof Error) {
            console.error(`Error in GET /cart: ${error.message}`);
        } else {
            console.error(`Error in GET /cart: ${error}`);
        }
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

import { NextResponse } from "next/server";
import { dbConfig } from "@/dbConfig/dbConfig";
import Cart from "@/models/cartModel";

export async function GET() {
    await dbConfig();
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

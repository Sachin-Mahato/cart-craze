import { dbConnect } from "@/dbConfig/dbConnect";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import Cart from "@/models/cartModel";

export async function GET() {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        console.error(
            "Error in GET /cart: Unauthorized user - No valid session or user found."
        );
        return NextResponse.json(
            {
                error: "Unauthorized user",
                details: "Please log in to access cart items.",
            },
            { status: 401 }
        );
    }

    try {
        await dbConnect();

        const user = await Cart.findOne({ owner: session.user._id });

        if (!user) {
            console.error(
                `Error in GET /cart: Cart not found for user with ID: ${session.user._id}`
            );
            return NextResponse.json(
                {
                    message: "Cart not found",
                    success: false,
                },
                { status: 404 }
            );
        }

        const cartItems = user?.items;

        return NextResponse.json(
            {
                success: true,
                message: "Cart items retrieved successfully.",
                cartItems,
            },
            {
                status: 200,
            }
        );
    } catch (error) {
        console.error(
            `Error in GET /cart: ${error instanceof Error ? error.message : "Unknown error"}`,
            error instanceof Error ? error.stack : ""
        );
        return NextResponse.json(
            {
                error: "Internal Server Error",
                details:
                    "Something went wrong while fetching cart items. Please try again later.",
            },
            { status: 500 }
        );
    }
}

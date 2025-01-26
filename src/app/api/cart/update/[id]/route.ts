import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/dbConfig/dbConnect";
import Cart from "@/models/cartModel";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import mongoose from "mongoose";

export async function PATCH(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await getServerSession(authOptions);
    const { id } = await params;

    // Authentication check
    if (!session?.user?._id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Validate ID
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        console.error("Error: Invalid or missing ID parameter:", id);
        return NextResponse.json(
            { success: false, message: "Invalid ID format" },
            { status: 400 }
        );
    }

    try {
        await dbConnect();

        // Find cart and update in one operation
        const result = await Cart.findOneAndUpdate(
            {
                owner: session.user._id,
                "items._id": id,
            },
            {
                $inc: {
                    "items.$.stock": 1,
                },
            },
            { new: true } // Return updated document
        );

        if (!result) {
            console.error("Cart or item not found:", {
                owner: session.user._id,
                itemId: id,
            });
            return NextResponse.json(
                { success: false, message: "Cart or item not found" },
                { status: 404 }
            );
        }

        // Return updated cart data
        return NextResponse.json({
            success: true,
            message: "Item updated successfully",
            data: result,
        });
    } catch (error) {
        console.error("Error updating cart:", error);
        return NextResponse.json(
            {
                success: false,
                message: "Internal Server Error",
                error: error instanceof Error ? error.message : "Unknown error",
            },
            { status: 500 }
        );
    }
}

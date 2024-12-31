/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/dbConfig/dbConnect";
import Cart from "@/models/cartModel";

export async function PATCH(req: NextRequest, context: any) {
    await dbConnect();
    const { params } = await context; // Extract params from context
    const { id } = await params; // Extract ID inside the function body

    console.log("PATCH request received for ID:", id);

    try {
        const body = await req.json(); // Parse the request body
        console.log("Request body:", body);

        const { quantity } = body; // Destructure quantity from the body

        if (quantity == null) {
            // Validate quantity presence
            return NextResponse.json(
                {
                    success: false,
                    message: "Quantity is required to update the item",
                },
                { status: 400 }
            );
        }

        // Find the item by ID
        const existingItem = await Cart.findById(id);
        if (!existingItem) {
            return NextResponse.json(
                { success: false, message: `Item with ID ${id} not found` },
                { status: 404 }
            );
        }

        // Update the item's quantity
        const updateResult = await Cart.updateOne(
            { _id: id },
            { $set: { quantity } }
        );

        if (updateResult.modifiedCount > 0) {
            return NextResponse.json({
                success: true,
                message: `Item with ID ${id} updated successfully`,
                updatedValues: { quantity },
            });
        } else {
            return NextResponse.json(
                { success: false, message: "No changes were made to the item" },
                { status: 304 }
            );
        }
    } catch (error) {
        // console.error("Error processing PATCH request:", error);
        if (error instanceof Error) {
            console.error(`Error in PATCH /cart: ${error.message}`);
        } else {
            console.error(`Error in PATCH /cart: ${error}`);
        }
        return NextResponse.json(
            {
                success: false,
                message: "An error occurred during the update process",
            },
            { status: 500 }
        );
    }
}

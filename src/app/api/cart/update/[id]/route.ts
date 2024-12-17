/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import dbConfig from "@/dbConfig/dbConfig";
import Cart from "@/models/cartModel";

dbConfig();

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;

  // Log the incoming request for debugging
  console.log("PATCH request received for ID:", id);

  let body;
  try {
    // Parse the body of the request
    body = await req.json();
    console.log("Request body:", body);

    const { quantity } = body; // Destructure quantity from body

    if (!quantity) {
      console.log("Missing quantity in request body");
      return NextResponse.json(
        {
          success: false,
          message: "Quantity is required to update the item",
        },
        { status: 400 }
      );
    }

    // Find the item by ID and update it
    const existingItem = await Cart.findById(id);

    if (!existingItem) {
      console.log(`Item with ID ${id} not found`);
      return NextResponse.json(
        {
          success: false,
          message: `Item with ID ${id} not found`,
        },
        { status: 404 }
      );
    }

    const updateItem = await Cart.updateOne(
      { _id: id }, // Filter by the ID
      { $set: { quantity } } // Update the quantity
    );

    // Log the update result
    console.log("Item updated:", updateItem);

    if (updateItem.modifiedCount > 0) {
      return NextResponse.json({
        success: true,
        message: `Item with ID ${id} updated successfully`,
        updatedValues: { quantity },
      });
    } else {
      console.log("No changes made to the item");
      return NextResponse.json(
        {
          success: false,
          message: `Item with ID ${id} already has the same quantity`,
        },
        { status: 304 }
      );
    }
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while processing the request",
      },
      { status: 500 }
    );
  }
}

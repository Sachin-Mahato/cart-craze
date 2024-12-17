import { NextRequest, NextResponse } from "next/server";
import { dbConfig } from "@/dbConfig/dbConfig";
import Cart from "@/models/cartModel";

dbConfig();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    console.log("reqBody", reqBody);
    const { id, title, image, quantity, price } = reqBody;
    const item = await Cart.findOne({ id });

    if (item) {
      return NextResponse.json(
        { error: "cart item already exists" },
        { status: 400 }
      );
    }
    const newItem = new Cart({
      id,
      title,
      image,
      quantity,
      price,
    });
    const savedItem = await newItem.save();

    return NextResponse.json({
      message: "add item to the cart successfully",
      success: true,
      savedItem,
    }); // Returning a valid response
  } catch (error) {
    console.log(`error in send: ${error}`);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    ); // Return error response
  }
}

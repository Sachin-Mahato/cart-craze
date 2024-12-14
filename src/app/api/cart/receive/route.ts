import { NextResponse } from "next/server";
import dbConfig from "@/dbConfig/dbConfig";
import Cart from "@/models/cartModel";

dbConfig();

export async function GET() {
  try {
    const items = await Cart.find();

    return NextResponse.json({
      message: "successfully get the data",
      success: true,
      items,
    });
  } catch (error) {
    console.log(`error in get: ${error}`);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    ); // Return error response
  }
}

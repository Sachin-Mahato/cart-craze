import { NextRequest, NextResponse } from "next/server";
import dbConfig from "@/dbConfig/dbConfig";
import Cart from "@/models/cartModel";

dbConfig();

export async function PATCH(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { quantity, _id } = reqBody;
    const cartItem = await Cart.findOne({ _id });

    if (cartItem) {
      await Cart.updateOne({ quantity }, { quantity });
    }
    return NextResponse.json({
      message: "update the cart quantify",
      success: true,
    });
  } catch (error) {
    console.error(`error in cart path req: ${error}`);
  }
}

import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/dbConfig/dbConnect";
import Cart from "@/models/cartModel";
import mongoose from "mongoose";

export async function DELETE(req: NextRequest) {
    await dbConnect();
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json(
                { message: "ID not found" },
                { status: 400 }
            );
        }

        const deleteItem = await Cart.deleteOne({
            _id: new mongoose.Types.ObjectId(id),
        });
        console.log("Delete Result:", deleteItem);

        if (deleteItem.deletedCount === 0) {
            return NextResponse.json(
                { message: "Item not found or already deleted" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            message: "delete successfully",
            success: true,
        });
    } catch (error) {
        // console.log(`error in delete: ${error}`);
        if (error instanceof Error) {
            console.error(`Error in DELETE /cart: ${error.message}`);
        } else {
            console.error(`Error in DELETE: ${error}`);
        }
        return NextResponse.json(
            { message: "Internal Server Error", success: false },
            { status: 500 }
        );
    }
}

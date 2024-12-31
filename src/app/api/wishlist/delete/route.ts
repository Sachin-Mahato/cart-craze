import { dbConnect } from "@/dbConfig/dbConnect";
import Wishlist from "@/models/wishlistModel";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
        return NextResponse.json({ message: "ID not found" }, { status: 400 });
    }

    try {
        const deleteItem = await Wishlist.deleteOne({
            _id: new mongoose.Types.ObjectId(id),
        });

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
            console.error(`Error in DELETE /wishlist: ${error.message}`);
        } else {
            console.error(`Error in DELETE /wishlist: ${error}`);
        }
        return NextResponse.json(
            { message: "Internal Server Error", success: false },
            { status: 500 }
        );
    }
}

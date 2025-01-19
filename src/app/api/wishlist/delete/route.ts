import { dbConnect } from "@/dbConfig/dbConnect";
import Wishlist from "@/models/wishlistModel";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";

export async function DELETE(req: NextRequest) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
        return NextResponse.json({ message: "ID not found" }, { status: 400 });
    }

    try {
        await dbConnect();
        const deleteItem = await Wishlist.updateOne(
            {
                owner: session.user._id,
            },
            {
                $pull: {
                    wishlistItems: {
                        _id: id,
                    },
                },
            }
        );

        if (deleteItem.modifiedCount === 0) {
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

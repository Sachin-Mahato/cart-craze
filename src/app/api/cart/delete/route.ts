import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/dbConfig/dbConnect";
import Cart from "@/models/cartModel";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";

export async function DELETE(req: NextRequest) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const id = new URL(req.url).searchParams.get("id");

    if (!id) {
        return NextResponse.json({ message: "ID not found" }, { status: 400 });
    }

    try {
        await dbConnect();
        const deletedItem = await Cart.updateOne(
            {
                owner: session.user._id,
            },
            {
                $pull: {
                    items: {
                        _id: id,
                    },
                },
            }
        );

        if (deletedItem.modifiedCount === 0) {
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
        console.error(
            `Error in DELETE /cart: ${error instanceof Error ? error.message : error}`
        );
        return NextResponse.json(
            { message: "Internal Server Error", success: false },
            { status: 500 }
        );
    }
}

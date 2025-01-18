import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/dbConfig/dbConnect";
import Cart from "@/models/cartModel";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

export async function PATCH(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await getServerSession(authOptions);
    const { id } = await params;

    if (!session || !session.user) {
        return NextResponse.json(
            {
                error: "Unauthorized",
            },
            {
                status: 401,
            }
        );
    }

    if (!id) {
        console.error("Error: Invalid or missing ID parameter.");

        return NextResponse.json(
            {
                success: false,
                message: "Invalid or missing ID parameter.",
                details:
                    "The provided ID is either missing or malformed. Please provide a valid ID to proceed.",
            },
            {
                status: 400,
            }
        );
    }

    try {
        dbConnect();

        await Cart.updateOne(
            {
                _id: id,
            },
            {
                $inc: {
                    "items.$.quantity": 1,
                },
            }
        );
        return NextResponse.json(
            {
                success: true,
                message: "Item updated successfully",
            },
            {
                status: 200,
            }
        );
    } catch (error) {
        console.error(`error in update: ${error}`);

        return NextResponse.json(
            {
                message: "Internal Server Error",
            },
            {
                status: 500,
            }
        );
    }
}

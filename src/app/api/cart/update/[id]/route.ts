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

    const { id } = await params;

    if (!id) {
        return NextResponse.json(
            {
                success: false,
                message: `ID doesn't match, please provide valid id`,
            },
            { status: 400 }
        );
    }

    try {
        await dbConnect();
        const body = await req.json();
        const { quantity } = body;

        if (!quantity) {
            return NextResponse.json(
                {
                    success: false,
                    message: `Quantity doesn't match, please provide valid quantity`,
                },
                { status: 405 }
            );
        }

        const updateCartItem = await Cart.updateOne(
            {
                owner: session.user._id,
            },
            {
                $set: {
                    items: {
                        _id: id,
                    },
                },
            }
        );

        if (updateCartItem.modifiedCount > 0) {
            return NextResponse.json(
                {
                    success: true,
                    message: "Quantity updated successfully",
                    updateQuantity: { quantity },
                },
                { status: 200 }
            );
        } else {
            return NextResponse.json(
                {
                    success: false,
                    message: "Item not found or already deleted",
                },
                {
                    status: 404,
                }
            );
        }
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

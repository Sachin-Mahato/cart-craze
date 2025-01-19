import { dbConnect } from "@/dbConfig/dbConnect";
import Wishlist from "@/models/wishlistModel";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";

export async function GET() {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        console.error(
            "Error in GET /cart: Unauthorized user - No valid session or user found."
        );
        return Response.json(
            {
                error: "Unauthorized user",
                details: "Please log in to access cart items.",
            },
            { status: 401 }
        );
    }
    try {
        await dbConnect();
        const user = await Wishlist.findOne({ owner: session.user._id });

        if (!user) {
            console.error(
                `Error in GET /wishlist: Wishlist not found for user with ID: ${session.user._id}`
            );
            return Response.json(
                {
                    message: "Cart not found",
                    success: false,
                },
                {
                    status: 404,
                }
            );
        }

        const wishlistItems = user?.wishlistItems;

        return Response.json(
            {
                message: "successfully get the data for wishlist",
                success: true,
                wishlistItems,
            },
            {
                status: 200,
            }
        );
    } catch (error) {
        if (error instanceof Error) {
            console.error(`Error in GET /wishlist: ${error.message}`);
        } else {
            console.error(`Error in GET /wishlist: ${error}`);
        }
        return Response.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

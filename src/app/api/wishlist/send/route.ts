import { dbConnect } from "@/dbConfig/dbConnect";
import Wishlist from "@/models/wishlistModel";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";

export async function POST(request: Request) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        return Response.json(
            {
                error: "Unauthorized user",
            },
            {
                status: 401,
            }
        );
    }

    try {
        await dbConnect();
        const reqBody = await request.json();
        const { id, title, image, price } = reqBody;

        // check if wishlist exist for the user

        let userWishlist = await Wishlist.findOne({ owner: session.user._id });

        if (userWishlist) {
            const itemExists = userWishlist.wishlistItems.some(
                (item) => item.id === id
            );

            if (itemExists) {
                return Response.json(
                    {
                        error: "Wishlist item already exists",
                    },
                    {
                        status: 400,
                    }
                );
            }

            userWishlist.wishlistItems.push({
                id,
                title,
                image,
                price,
            });
        } else {
            userWishlist = new Wishlist({
                owner: session.user._id,
                wishlistItems: [
                    {
                        id,
                        title,
                        image,
                        price,
                    },
                ],
            });
        }

        await userWishlist.save();

        return Response.json({
            message: "add item to the wishlist successfully",
            success: true,
            userWishlist,
        });
    } catch (error) {
        if (error instanceof Error) {
            console.error(`Error in POST /wishlist: ${error.message}`);
        } else {
            console.error(`Error in POST /wishlist: ${error}`);
        }
        return Response.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

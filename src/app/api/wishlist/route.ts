import { dbConfig } from "@/dbConfig/dbConfig";
import Wishlist from "@/models/wishlistModel";

export async function POST(request: Request) {
    await dbConfig();
    try {
        const reqBody = await request.json();
        //        console.log("reqBody", reqBody);
        const { id, title, image, price } = reqBody;
        const item = await Wishlist.findOne({ id });

        if (item) {
            return Response.json(
                { error: "cart item already exists" },
                { status: 400 }
            );
        }
        const newItem = new Wishlist({
            id,
            title,
            image,
            price,
        });
        const savedItem = await newItem.save();

        return Response.json({
            message: "add item to the wishlist successfully",
            success: true,
            savedItem,
        }); // Returning a valid response
    } catch (error) {
        // console.log(`error in send: ${error}`);
        if (error instanceof Error) {
            console.error(`Error in POST /wishlist: ${error.message}`);
        } else {
            console.error(`Error in POST /wishlist: ${error}`);
        }
        return Response.json(
            { error: "Internal Server Error" },
            { status: 500 }
        ); // Return error response
    }
}

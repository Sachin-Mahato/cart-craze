import { dbConfig } from "@/dbConfig/dbConfig";
import Wishlist from "@/models/wishlistModel";

export async function GET() {
    await dbConfig();
    try {
        const wishlistItems = await Wishlist.find();

        return Response.json({
            message: "successfully get the data for wishlist",
            success: true,
            wishlistItems,
        });
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

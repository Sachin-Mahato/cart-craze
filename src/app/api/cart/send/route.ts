import { dbConfig } from "@/dbConfig/dbConfig";
import Cart from "@/models/cartModel";

export async function POST(request: Request) {
    await dbConfig();
    try {
        const reqBody = await request.json();
        //        console.log("reqBody", reqBody);
        const { id, title, image, quantity, price, description, rating } =
            reqBody;
        const item = await Cart.findOne({ id });

        if (item) {
            return Response.json(
                { error: "cart item already exists" },
                { status: 400 }
            );
        }
        const newItem = new Cart({
            id,
            title,
            image,
            quantity,
            price,
            description,
            rating,
        });
        const savedItem = await newItem.save();

        return Response.json({
            message: "add item to the cart successfully",
            success: true,
            savedItem,
        }); // Returning a valid response
    } catch (error) {
        // console.log(`error in send: ${error}`);
        if (error instanceof Error) {
            console.error(`Error in POST /cart: ${error.message}`);
        } else {
            console.error(`Error in POST /cart: ${error}`);
        }
        return Response.json(
            { error: "Internal Server Error" },
            { status: 500 }
        ); // Return error response
    }
}

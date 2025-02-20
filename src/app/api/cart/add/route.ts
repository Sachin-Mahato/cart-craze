import { dbConnect } from "@/dbConfig/dbConnect";
import Cart from "@/models/cartModel";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";

export async function POST(request: Request) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        await dbConnect();
        const reqBody = await request.json();
        const {
            productId,
            title,
            imageUrl,
            stock,
            price,
            description,
            rating,
        } = reqBody;

        // Check if a cart exists for the user
        let userCart = await Cart.findOne({ owner: session.user._id });

        if (userCart) {
            // Check if the item already exists in the cart
            const itemExists = userCart.items.some(
                (item) => item.productId === productId
            );
            if (itemExists) {
                return Response.json(
                    { error: "Cart item already exists" },
                    { status: 400 }
                );
            }
            // Add the new item to the cart
            userCart.items.push({
                productId,
                title,
                imageUrl,
                stock,
                price,
                description,
                rating,
            });
        } else {
            // Create a new cart for the user
            userCart = new Cart({
                owner: session.user._id,
                items: [
                    {
                        productId,
                        title,
                        imageUrl,
                        stock,
                        price,
                        description,
                        rating,
                    },
                ],
            });
        }

        await userCart.save();

        return Response.json({
            message: "Item added to the cart successfully",
            success: true,
            userCart,
        });
    } catch (error) {
        console.error(`Error in POST /cart: ${error}`);
        return Response.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

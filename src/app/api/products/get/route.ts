import { dbConnect } from "@/dbConfig/dbConnect";
import data from "@/helpers/data";

export async function GET() {
    try {
        await dbConnect();
        const productsData = await data();
        if (!productsData) {
            return Response.json(
                {
                    success: false,
                    message: "error getting data from mongodb",
                },
                {
                    status: 501,
                }
            );
        }
        return Response.json(
            {
                success: true,
                message: "Successfully fetch products data",
                productsData,
            },
            {
                status: 200,
            }
        );
    } catch (error) {
        console.log("error in fetching products data", error);
        return Response.json(
            {
                success: false,
                message: "Not able to fetch the products data",
            },
            {
                status: 500,
            }
        );
    }
}

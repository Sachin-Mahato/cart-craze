import { dbConnect } from "@/dbConfig/dbConnect";
import UserModel from "@/models/userModel";
import { z } from "zod";
import { userNameValidation } from "@/schemas/signUpSchema";

const UsernameQuerySchema = z.object({
    username: userNameValidation,
});

export async function GET(request: Request) {
    await dbConnect();

    try {
        const { searchParams } = new URL(request.url);
        const queryParam = {
            username: searchParams.get("username"),
        };
        // validate with zod
        const result = UsernameQuerySchema.safeParse(queryParam);
        if (!result.success) {
            // extract user errors
            const usernameErrors =
                result.error.format().username?._errors || [];

            return Response.json(
                {
                    success: false,
                    message:
                        usernameErrors.length > 0
                            ? usernameErrors.join(", ")
                            : "Invalid query params",
                },
                { status: 400 }
            );
        }
        // TODO: print the values
        const { username } = result.data;

        const existingVerifiedUser = await UserModel.findOne({
            username,
            isVerified: true,
        });

        if (existingVerifiedUser) {
            return Response.json(
                {
                    success: false,
                    message: "Username is already taken",
                },
                { status: 200 }
            );
        }

        return Response.json(
            {
                success: true,
                message: "Username is available",
            },
            { status: 200 }
        );
    } catch (error) {
        console.error(`error checking username: ${error}`);
        return Response.json(
            {
                success: false,
                message: "Error checking username",
            },
            { status: 500 }
        );
    }
}

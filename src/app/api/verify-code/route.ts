import { dbConnect } from "@/dbConfig/dbConnect";
import UserModel from "@/models/userModel";

export async function POST(request: Request) {
    await dbConnect();
    try {
        const { username, code } = await request.json();
        // safely
        const decodedUsername = decodeURIComponent(username);
        const user = await UserModel.findOne({ username: decodedUsername });

        if (!user) {
            return Response.json(
                {
                    success: false,
                    message: "user not found",
                },
                { status: 500 }
            );
        }

        const isCodeValid = user.verifyCode === code;
        const isCodeExpired = new Date(user.verifyCodeExpiry) > new Date();

        if (isCodeValid && isCodeExpired) {
            user.isVerified = true;
            await user.save();
            return Response.json(
                {
                    success: true,
                    message: "Account verified successfully",
                },
                { status: 200 }
            );
        } else if (!isCodeExpired) {
            return Response.json(
                {
                    success: false,
                    message: "verification code has expired please signup",
                },
                { status: 400 }
            );
        } else {
            return Response.json(
                {
                    success: false,
                    message: "Incorrect Verification code",
                },
                { status: 400 }
            );
        }
    } catch (error) {
        console.error(`error in verify code: ${error}`);
        return Response.json(
            {
                success: false,
                message: "error in verify code",
            },
            { status: 500 }
        );
    }
}

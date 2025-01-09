import { resend } from "./resend";
import verificationEmail from "../../email/VerificationEmail";
import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(
    email: string,
    username: string,
    verificationCode: string
): Promise<ApiResponse> {
    try {
        const { error } = await resend.emails.send({
            from: "Sachin <no-reply@sachinmahato.in>",
            to: [email],
            subject: "OTP Verification",
            react: verificationEmail({ username, verificationCode }),
        });
        if (error) {
            return {
                success: false,
                message: `Error in sending verification email: ${error.name} and ${error.message}`,
            };
        }
        return {
            success: true,
            message: "Verification email sent successfully",
        };
    } catch (emailError) {
        console.error("Error sending verification email", emailError);
        return {
            success: false,
            message: "Failed to send verification email",
        };
    }
}

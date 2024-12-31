import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export { default } from "next-auth/middleware";

export async function middleware(request: NextRequest) {
    const token = await getToken({ req: request });
    const url = request.nextUrl;

    // Allow access to sign-in, sign-up, and verify if the user is not authenticated
    if (
        !token &&
        (url.pathname.startsWith("/sign-in") ||
            url.pathname.startsWith("/sign-up") ||
            url.pathname.startsWith("/verify"))
    ) {
        return NextResponse.next(); // Allow the request to continue
    }

    // Redirect authenticated users from auth pages to dashboard
    if (
        token &&
        (url.pathname.startsWith("/sign-in") ||
            url.pathname.startsWith("/sign-up") ||
            url.pathname.startsWith("/verify"))
    ) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    // Redirect unauthenticated users accessing restricted pages to /home
    if (!token && url.pathname.startsWith("/dashboard")) {
        return NextResponse.redirect(new URL("/home", request.url));
    }

    // Allow all other requests
    return NextResponse.next();
}

// Matching paths
export const config = {
    matcher: [
        "/sign-in",
        "/sign-up",
        "/",
        "/dashboard/:path*",
        "/verify/:path*",
    ],
};

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "fakestoreapi.com",
            },
            {
                protocol: "https",
                hostname: "images.pexels.com", // Pexels uses a subdomain for its image hosting
            },
        ],
    },
    reactStrictMode: true,
};

export default nextConfig;

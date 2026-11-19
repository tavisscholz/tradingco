import type { NextConfig } from "next";
const nextConfig: NextConfig = {reactStrictMode: true, agentRules: false, images: {remotePatterns: [{protocol: "https", hostname: "cdn.shopify.com"}]}};
export default nextConfig;

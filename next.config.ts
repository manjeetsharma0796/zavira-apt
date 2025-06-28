import { createCivicAuthPlugin } from "@civic/auth/nextjs"
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

const withCivicAuth = createCivicAuthPlugin({
  clientId: "b8c83e9a-8251-41ce-a158-ed8b60af3faf"
});

export default withCivicAuth(nextConfig)
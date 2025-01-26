import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  redirects: async () => {
    return [
      {
        source: "/",
        destination: "/movies",
        permanent: true
      }
    ]
  }
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: "https",
            hostname: "**",
            port: "",
            pathname: "/**",
          },
          {
            protocol: "http",
            hostname: "localhost:3000",
            port: "",
            pathname: "/**",
          },
        ],
      },
};

export default nextConfig;

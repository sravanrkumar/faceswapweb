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
          {
            protocol: "https",
            hostname: "faceswapweb.onrender.com",
            port: "",
            pathname: "/**",
          },
          {
            protocol: "http",
            hostname: "faceswapmagic.com",
            port: "",
            pathname: "/**",
          },
          {
            protocol: "https",
            hostname: "faceswapmagic.com",
            port: "",
            pathname: "/**",
          },
        ],
      },
};

export default nextConfig;

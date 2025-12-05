import type { NextConfig } from "next";

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol:"https",
        hostname: "openweathermap.org",
        port: "",
        pathname: "/img/wn/**",
      }
    ],
  },
}

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;

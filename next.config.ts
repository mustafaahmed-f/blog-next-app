import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // webpack(config) {
  //   config.module.rules.push({
  //     test: /\.css$/,
  //     include: /node_modules\/quill/,
  //     use: ["style-loader", "css-loader"],
  //   });
  //   return config;
  // },
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "img.icons8.com",
      },
      {
        protocol: "https",
        hostname: "loremflickr.com",
      },
      {
        protocol: "https",
        hostname: "ui-avatars.com",
      },
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
      },
      {
        protocol: "https",
        hostname: "img.clerk.com",
      },
    ],
  },
};

export default nextConfig;

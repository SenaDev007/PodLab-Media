import type { NextConfig } from "next";

// Sur Vercel : build Next.js standard (output managé par la plateforme).
// En local / conteneur : sortie standalone (démarrage autonome).
const isVercel = !!process.env.VERCEL;

const nextConfig: NextConfig = {
  output: isVercel ? undefined : "standalone",
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ytimg.com",
      },
    ],
  },
};

export default nextConfig;

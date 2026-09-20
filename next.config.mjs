/** @type {import('next').NextConfig} */
const nextConfig = {
  optimizeFonts: false, // fonts load via <link> in app/layout.jsx; avoids build-time fetches failing in locked-down CI
  images: {
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
};

export default nextConfig;

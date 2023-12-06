/** @type {import('next').NextConfig} */
const debug = process.env.NODE_ENV !== "production";
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  //Add basePath
  //basePath: "/github-pages",
  assetPrefix: !debug
    ? "https://supunrathnayake007.github.io/social_media_clone/"
    : "",
};

module.exports = nextConfig;

// // module.exports = {
// //   productionBrowserSourceMaps: true,
// // };

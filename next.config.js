// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   output: "export",
//   //Add basePath
//   //basePath: "/github-pages",
//   basePath: "/social_media_clone",
// };

// module.exports = nextConfig;

// // module.exports = {
// //   productionBrowserSourceMaps: true,
// // };

const debug = process.env.NODE_ENV !== "production";

module.exports = {
  exportPathMap: function () {
    // /Next-React-Components
    return {
      "/": { page: "/" },
      "/ap-grid-layout": { page: "/ap-grid-layout" },
      "/ap-highlight": { page: "/ap-highlight" },
    };
  },
  assetPrefix: !debug
    ? "https://anotherplanet-io.github.io/Next-React-Components/"
    : "",
};

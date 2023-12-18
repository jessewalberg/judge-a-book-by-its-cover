/** @type {import('next').NextConfig} */
const { withPlausibleProxy } = require("next-plausible");
const nextConfig = {
  images: {
    domains: ["books.google.com"],
  },
};

module.exports = withPlausibleProxy()(nextConfig);

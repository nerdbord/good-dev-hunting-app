/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = {
  ...nextConfig,
  env: {
    GIHUB_ID: process.env.GIHUB_ID,
    GIHUB_SECRET: process.env.GIHUB_SECRET,
  },
}

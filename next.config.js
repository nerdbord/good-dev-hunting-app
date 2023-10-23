/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    additionalData: `@import "src/styles/mixins.scss"; @import "src/styles/tokens.scss";`,
  },
}

module.exports = {
  ...nextConfig,
  env: {
    GITHUB_ID: process.env.GITHUB_ID,
    GITHUB_SECRET: process.env.GITHUB_SECRET,
  },
  images: {
    domains: ['avatars.githubusercontent.com', 'olwpo5gvoe9f3vxl.public.blob.vercel-storage.com', 'github.com'],
  },
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    additionalData: `@import "src/styles/mixins.scss"; @import "src/styles/tokens.scss";`,
  },
}

module.exports = {
  ...nextConfig,
  env: {
    GH_CLIENT_ID: process.env.GH_CLIENT_ID,
    GH_CLIENT_SECRET: process.env.GH_CLIENT_SECRET,
  },
  images: {
    domains: [
      'avatars.githubusercontent.com',
      'olwpo5gvoe9f3vxl.public.blob.vercel-storage.com',
      'github.com',
    ],
  },
}

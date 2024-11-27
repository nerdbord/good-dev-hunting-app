/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    additionalData: `@import "src/styles/mixins"; @import "src/styles/tokens";`,
  },
};
export default nextConfig;

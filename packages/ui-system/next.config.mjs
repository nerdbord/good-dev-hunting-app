/** @type {import('next').NextConfig} */
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const stylesPath = path.resolve(__dirname, "src", "styles");

const nextConfig = {
  sassOptions: {
    additionalData: `@use "src/styles/mixins" as *; @use "src/styles/tokens" as *;`,
    includePaths: [stylesPath],
    verbose: true,
  },
};
export default nextConfig;

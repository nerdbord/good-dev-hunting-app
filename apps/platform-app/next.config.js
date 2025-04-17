const { withSentryConfig } = require('@sentry/nextjs')
const createNextIntlPlugin = require('next-intl/plugin')

// Creating an instance of next-intl plugin
const withNextIntl = createNextIntlPlugin()

// Main Next.js project configuration
const nextConfig = {
  sassOptions: {
    additionalData: `@use "src/styles/mixins" as *; @use "src/styles/tokens" as *;`,
  },
  env: {
    GITHUB_ID: process.env.GITHUB_ID,
    GITHUB_SECRET: process.env.GITHUB_SECRET,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.licdn.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'olwpo5gvoe9f3vxl.public.blob.vercel-storage.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'github.com',
        port: '',
      },
    ],
  },
  //reactStrictMode: true, // Enable React strict mode
  //poweredByHeader: false, // Disable X-Powered-By header
}

// Integracja z Sentry, z opcjami specyficznymi dla Sentry
if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
  module.exports = withSentryConfig(
    withNextIntl(nextConfig), // Using withNextIntl to add next-intl configuration
    {
      silent: true, // Silences logs during build
      org: 'nerdbord-tm', // Organization in Sentry
      project: 'good-dev-hunting', // Project in Sentry
    },
    {
      widenClientFileUpload: true, // Increases the scope of source file uploads
      transpileClientSDK: true, // Transpiles Sentry SDK for IE11 compatibility
      tunnelRoute: '/monitoring', // Enables ad-blockers bypass
      hideSourceMaps: true, // Hides source maps in client bundles
      disableLogger: true, // Disables Sentry logging
      automaticVercelMonitors: true, // Automatically adds Vercel monitors
    },
  )
} else {
  // module.exports = withNextIntl(nextConfig) // Configuration with next-intl only, if Sentry is not configured
  module.exports = withNextIntl(nextConfig) // Configuration with next-intl only, if Sentry is not configured
}

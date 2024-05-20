const { withSentryConfig } = require('@sentry/nextjs')
const createNextIntlPlugin = require('next-intl/plugin')

// Tworzymy instancję pluginu next-intl
const withNextIntl = createNextIntlPlugin()

// Główna konfiguracja projektu Next.js
const nextConfig = {
  sassOptions: {
    additionalData: `@import "src/styles/mixins.scss"; @import "src/styles/tokens.scss";`,
  },
  env: {
    GITHUB_ID: process.env.GITHUB_ID,
    GITHUB_SECRET: process.env.GITHUB_SECRET,
  },
  images: {
    domains: [
      'avatars.githubusercontent.com',
      'olwpo5gvoe9f3vxl.public.blob.vercel-storage.com',
      'github.com',
      'i.imgur.com',
    ],
  },
  //reactStrictMode: true, // Włącz tryb ścisły dla React
  //poweredByHeader: false, // Wyłącz nagłówek X-Powered-By
}

// Integracja z Sentry, z opcjami specyficznymi dla Sentry
if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
  module.exports = withSentryConfig(
    withNextIntl(nextConfig), // Używamy withNextIntl, aby dodać konfigurację next-intl
    {
      silent: true, // Wycisza logi podczas budowania
      org: 'nerdbord-tm', // Organizacja w Sentry
      project: 'good-dev-hunting', // Projekt w Sentry
    },
    {
      widenClientFileUpload: true, // Zwiększa zakres uploadu plików źródłowych
      transpileClientSDK: true, // Transpiluje SDK Sentry do kompatybilności z IE11
      tunnelRoute: '/monitoring', // Umożliwia omijanie ad-blockerów
      hideSourceMaps: true, // Ukrywa mapy źródłowe w pakietach klienta
      disableLogger: true, // Wyłącza logowanie Sentry
      automaticVercelMonitors: true, // Automatycznie dodaje monitory Vercel
    },
  )
} else {
  // module.exports = withNextIntl(nextConfig) // Konfiguracja tylko z next-intl, jeśli Sentry nie jest konfigurowane
  module.exports = withNextIntl(nextConfig) // Konfiguracja tylko z next-intl, jeśli Sentry nie jest konfigurowane
}

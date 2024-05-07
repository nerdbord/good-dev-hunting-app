import createMiddleware from 'next-intl/middleware'

// Stwórz middleware używając biblioteki next-intl/middleware
export default createMiddleware({
  // Lista wszystkich obsługiwanych lokalizacji
  locales: ['en', 'de', 'pl'],

  // Domyślna lokalizacja, używana gdy nie można dopasować żadnej innej
  defaultLocale: 'en',

  // Opcjonalne dodawanie prefiksu lokalizacji tylko gdy jest to niezbędne
  // Domyślna lokalizacja ('en') nie będzie wymagała prefiksu
  localePrefix: 'as-needed',
})

export const config = {
  matcher: [
    '/',
    '/(de|en|pl)/:path*',
    '/profiles',
    '/(de|en|pl)/profiles',
    '/my-profile',
    '/(de|en|pl)/my-profile',
    '/p/:profileSlug*', // Dynamiczne ścieżki profilów
    '/(de|en|pl)/p/:profileSlug*',
    '/moderation', // Dodanie ścieżki /moderation
    '/(de|en|pl)/moderation', // Dodanie lokalizowanych ścieżek /moderation
    '/moderation/profile/:profileId*', // Dynamiczne ścieżki do konkretnego profilu
    '/(de|en|pl)/moderation/profile/:profileId*', // Lokalizowane dynamiczne ścieżki do konkretnego profilu
  ],
}

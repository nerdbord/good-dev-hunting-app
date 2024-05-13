import createMiddleware from 'next-intl/middleware'

export default createMiddleware({
  // Lista wszystkich obsługiwanych lokalizacji
  locales: ['en', 'pl'],

  // Domyślna lokalizacja, używana gdy nie można dopasować żadnej innej
  defaultLocale: 'en',

  // Opcjonalne dodawanie prefiksu lokalizacji tylko gdy jest to niezbędne
  // Domyślna lokalizacja ('en') nie będzie wymagała prefiksu
  localePrefix: 'as-needed',
})

export const config = {
  matcher: [
    '/',
    '/(en|pl)/:path*',
    '/profiles',
    '/(en|pl)/profiles',
    '/my-profile',
    '/(en|pl)/my-profile',
    '/my-profile/edit',
    '/(en|pl)/my-profile/edit',
    '/p/:profileSlug*', // Dynamiczne ścieżki profilów
    '/(en|pl)/p/:profileSlug*',
    '/moderation',
    '/(en|pl)/moderation',
    '/moderation/profile/:profileId*',
    '/(en|pl)/moderation/profile/:profileId*',
    '/signin',
    '/(en|pl)/signin',
  ],
}

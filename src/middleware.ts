// import createMiddleware from 'next-intl/middleware'

// export default createMiddleware({
//   // A list of all locales that are supported
//   locales: ['en', 'de', 'pl'],

//   // Used when no locale matches
//   defaultLocale: 'en',
// })

// export const config = {
//   // Match only internationalized pathnames
//   matcher: ['/', '/(de|en|pl)/:path*'],
// }

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

// export const config = {
//   // Matcher, który identyfikuje ścieżki międzynarodowe
//   matcher: [
//     '/', // Domyślna ścieżka
//     '/(de|en|pl)/:path*', // Ścieżki z prefiksem językowym

//     // Specyficzne ścieżki, które powinny być dostępne z i bez prefiksu lokalizacji
//     '/profiles',
//     '/(de|en|pl)/profiles',
//     '/my-profiles',
//     '/(de|en|pl)/my-profiles',
//   ],
// }

// export const config = {
//   matcher: [
//     '/',
//     '/(de|en|pl)/:path*',
//     '/profiles',
//     '/(de|en|pl)/profiles',
//     '/my-profile',
//     '/(de|en|pl)/my-profile',
//   ],
// }

export const config = {
  matcher: [
    '/',
    '/(de|en|pl)/:path*',
    '/profiles',
    '/(de|en|pl)/profiles',
    '/my-profile',
    '/(de|en|pl)/my-profile',
    '/p/:profileSlug*', // Dla nieprefiksowanych ścieżek
    '/(de|en|pl)/p/:profileSlug*', // Dla prefiksowanych ścieżek
  ],
}

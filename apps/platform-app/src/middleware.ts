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
  // Match only internationalized pathnames
  matcher: ['/', '/(pl|en)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)'],
}

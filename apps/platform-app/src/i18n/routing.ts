import { defineRouting, type Pathnames } from 'next-intl/routing'

export const locales = ['en', 'pl'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale = 'en'
export const nextIntlCookieName = 'NEXT_LOCALE'

export const localePrefix = {
  mode: 'as-needed',
  prefixes: { en: '/en', pl: '/pl' },
} as const

export const pathnames = {
  '/': '/',
} satisfies Pathnames<typeof locales>

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix,
})

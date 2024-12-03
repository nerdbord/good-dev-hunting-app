import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['en', 'pl'],
  defaultLocale: 'en',
  localePrefix: {
    mode: 'as-needed',
    prefixes: {
      en: '',
      pl: '/pl',
    },
  },
  pathnames: {
    '/': '/',
  },
})
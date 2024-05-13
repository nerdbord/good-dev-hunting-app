import { getRequestConfig } from 'next-intl/server'

const locales = ['en', 'pl']

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale)) {
    // Tu można zwrócić domyślne tłumaczenia lub pusty obiekt
    return { messages: {} }
  }

  return {
    messages: (await import(`../messages/${locale}.json`)).default,
  }
})

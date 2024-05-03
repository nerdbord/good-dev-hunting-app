// import { getRequestConfig } from 'next-intl/server'
// import { notFound } from 'next/navigation'

// // Can be imported from a shared config
// const locales = ['en', 'de', 'pl']

// export default getRequestConfig(async ({ locale }) => {
//   // Validate that the incoming `locale` parameter is valid
//   if (!locales.includes(locale as any)) notFound()

//   return {
//     messages: (await import(`../messages/${locale}.json`)).default,
//   }
// })

// i18n.js
import { getRequestConfig } from 'next-intl/server'

const locales = ['en', 'de', 'pl']

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale)) {
    // Tu można zwrócić domyślne tłumaczenia lub pusty obiekt
    return { messages: {} }
  }

  return {
    messages: (await import(`../messages/${locale}.json`)).default,
  }
})

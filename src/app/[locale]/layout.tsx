// export default function LocaleLayout({
//   children,
//   params: { locale },
// }: {
//   children: React.ReactNode
//   params: { locale: string }
// }) {
//   return <div>{children}</div>
// }

import { NextIntlClientProvider, useMessages } from 'next-intl'
import React from 'react'

export default function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const messages = useMessages()

  return (
    <NextIntlClientProvider messages={messages}>
      {children}
    </NextIntlClientProvider>
  )
}

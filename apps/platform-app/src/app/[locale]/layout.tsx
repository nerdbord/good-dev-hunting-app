import { NextIntlClientProvider, useMessages } from 'next-intl'
import React from 'react'

export default function LocaleLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const messages = useMessages()

  return (
    <NextIntlClientProvider messages={messages}>
      {children}
    </NextIntlClientProvider>
  )
}

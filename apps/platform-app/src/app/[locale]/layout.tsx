import { ModalProvider } from '@/contexts/ModalContext'
import { ToastContextProvider } from '@/contexts/ToastContext'
import { SessionProvider } from 'next-auth/react'
import { NextIntlClientProvider, useMessages } from 'next-intl'
import PlausibleProvider from 'next-plausible'
import * as process from 'process'
import React from 'react'

export default function LocaleLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const messages = useMessages()

  return (
    <>
      <NextIntlClientProvider messages={messages}>
        <PlausibleProvider
          domain={process.env.NEXT_PUBLIC_APP_ORIGIN_DOMAIN || ''}
        >
          <SessionProvider>
            <ToastContextProvider>
              <ModalProvider>{children}</ModalProvider>
            </ToastContextProvider>
          </SessionProvider>
        </PlausibleProvider>
        <div id="toasts" />
        <div id="portal" />
      </NextIntlClientProvider>
    </>
  )
}

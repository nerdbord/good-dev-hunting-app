import { ModalProvider } from '@/contexts/ModalContext'
import { ToastContextProvider } from '@/contexts/ToastContext'
import { SessionProvider } from 'next-auth/react'
import { NextIntlClientProvider, useMessages } from 'next-intl'
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
        <SessionProvider>
          <ToastContextProvider>
            <ModalProvider>{children}</ModalProvider>
          </ToastContextProvider>
        </SessionProvider>
        <div id="toasts" />
        <div id="portal" />
      </NextIntlClientProvider>
    </>
  )
}

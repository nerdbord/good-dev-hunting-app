import React from 'react'
import './globals.scss'
import { IBM_Plex_Sans, Inter } from 'next/font/google'
import AuthProvider from '@/components/AuthProvider/AuthProvider'
import { ToastContextProvider } from '@/contexts/ToastContext'
import { ModalProvider } from '@/contexts/ModalContext'
import combineClasses from '@/utils/combineClasses'
import Modal from '@/components/Modal/Modal'

const ibm = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-ibm',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-inter',
})

const commonClasses = combineClasses([ibm.variable, inter.variable])

export const metadata = {
  title: 'Good Dev Hunting',
  description: 'Catch coding legends!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={commonClasses}>
        <AuthProvider>
          <ToastContextProvider>
            <ModalProvider>
              <Modal />
              {children}
            </ModalProvider>
          </ToastContextProvider>
        </AuthProvider>
        <div id="portal" />
        <div id="toasts" />
      </body>
    </html>
  )
}

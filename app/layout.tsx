import React from 'react'
import './globals.scss'
import { IBM_Plex_Sans, Inter } from 'next/font/google'
import AuthProvider from '@/components/AuthProvider/AuthProvider'
import { ToastContextProvider } from '@/contexts/ToastContext'
import { ModalProvider } from '@/contexts/ModalContext'
import combineClasses from '@/utils/combineClasses'

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
  description:
    "Catch coding legends! Our site provides access to detailed profiles of developers, allowing for a quick match of their skills to your company's needs. An advanced search engine enables a focus on key criteria such as programming languages, experience level, and specialization. Regularly updated profiles ensure you always have access to the latest information about candidates.",
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
            <ModalProvider>{children}</ModalProvider>
          </ToastContextProvider>
        </AuthProvider>
        <div id="portal" />
        <div id="toasts" />
      </body>
    </html>
  )
}

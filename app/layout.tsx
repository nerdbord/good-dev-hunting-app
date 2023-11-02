import React from 'react'
import './globals.scss'
import { IBM_Plex_Sans } from 'next/font/google'
import AuthProvider from '@/components/AuthProvider/AuthProvider'

const ibm = IBM_Plex_Sans({ subsets: ['latin'], weight: ['400'] })

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
      <body className={ibm.className}>
        <AuthProvider>{children}</AuthProvider>
        <div id="portal" />
        <div id="toasts" />
      </body>
    </html>
  )
}

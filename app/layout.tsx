import React from 'react'
import './globals.scss'
import { IBM_Plex_Sans } from 'next/font/google'
import AuthProvider from '@/components/AuthProvider/AuthProvider'
import { Container } from '@/components/Container/Container'

const ibm = IBM_Plex_Sans({ subsets: ['latin'], weight: ['400'] })

export const metadata = {
  title: 'Good Dev Hunting',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}): JSX.Element {
  return (
    <html lang="en">
      <body className={ibm.className}>
        <AuthProvider>
          <Container>{children}</Container>
        </AuthProvider>
      </body>
    </html>
  )
}

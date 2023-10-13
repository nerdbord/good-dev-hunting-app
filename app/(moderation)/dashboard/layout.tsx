import React from 'react'
import '../../(profiles)/globals.scss'
import { IBM_Plex_Sans } from 'next/font/google'
import AuthProvider from '@/components/AuthProvider/AuthProvider'
import { Container } from '@/components/Container/Container'
import DashboardHeader from '@/components/Headers/DashboardHeader/DashboardHeader'

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
        {/* @ts-expect-error Server Component */}
        <DashboardHeader />
        <AuthProvider>
          <Container>{children}</Container>
        </AuthProvider>
      </body>
    </html>
  )
}

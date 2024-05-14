import { findAllApprovedProfiles } from '@/app/[locale]/(profile)/_actions'
import { ProfilesProvider } from '@/app/[locale]/(profile)/_providers/Profiles.provider'
import { ModalProvider } from '@/contexts/ModalContext'
import { ToastContextProvider } from '@/contexts/ToastContext'
import combineClasses from '@/utils/combineClasses'
import { SessionProvider } from 'next-auth/react'
import PlausibleProvider from 'next-plausible'
import { IBM_Plex_Sans, Inter } from 'next/font/google'
import * as process from 'process'
import React from 'react'
import './globals.scss'

const ibm = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['100', '400', '500'],
  variable: '--font-ibm',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-inter',
})

const commonClasses = combineClasses([ibm.variable, inter.variable])

export const metadata = {
  title: 'Good Dev Hunting - find the best developers for your team',
  description:
    "Catch coding legends! Good Dev Hunting is reverse recruitment platform that allows you to find the best developers for your team. Our site provides access to detailed profiles of developers, allowing for a quick match of their skills to your company's needs.",
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // TODO: We need to store it in some global state management (eg. zustand), and replace provider
  const fetchedProfiles = await findAllApprovedProfiles()

  return (
    <html lang="en">
      <body className={commonClasses}>
        <PlausibleProvider
          domain={process.env.NEXT_PUBLIC_APP_ORIGIN_DOMAIN || ''}
        >
          <SessionProvider>
            <ToastContextProvider>
              <ProfilesProvider initialProfiles={fetchedProfiles}>
                <ModalProvider>{children}</ModalProvider>
              </ProfilesProvider>
            </ToastContextProvider>
          </SessionProvider>
        </PlausibleProvider>
        <div id="portal" />
        <div id="toasts" />
      </body>
    </html>
  )
}

import combineClasses from '@/utils/combineClasses'
import { IBM_Plex_Sans, Inter } from 'next/font/google'
import React from 'react'
import CookieBannerWrapper from './[locale]/(profile)/(components)/CookieBanner/CookieBannerWrapper'
import GoogleAnalytics from './[locale]/(profile)/(components)/CookieBanner/GoogleAnalytics'
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <GoogleAnalytics
        GA_MEASUREMENT_ID={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || ''}
      />
      <body className={commonClasses}>
        {children}
        <CookieBannerWrapper />
      </body>
    </html>
  )
}

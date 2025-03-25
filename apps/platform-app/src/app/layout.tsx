import { I18nNamespaces } from '@/i18n/request'
import combineClasses from '@/utils/combineClasses'
import { type Metadata } from 'next'
import { getLocale, getTranslations } from 'next-intl/server'
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

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  const baseUrl = process.env.NEXT_PUBLIC_APP_ORIGIN_URL

  const t = await getTranslations(I18nNamespaces.Metadata)

  return {
    title: t('title'),
    description: t('description'),
    keywords: t.raw('keywords'),
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        pl: `${baseUrl}/pl`,
        en: `${baseUrl}/en`,
      },
    },
    authors: [{ name: 'GoodDevHunting Team' }],
    applicationName: 'GoodDevHunting',
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `${baseUrl}/${locale}`,
      siteName: 'GoodDevHunting',
      locale,
      type: 'website',
      images: [
        {
          url: `${baseUrl}/opengraph-image.png`,
          width: 1200,
          height: 630,
          alt: t('title'),
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      images: [`${baseUrl}/opengraph-image.png`],
    },
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const locale = await getLocale()

  return (
    <html lang={locale}>
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

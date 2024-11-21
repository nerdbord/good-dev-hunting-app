'use client'

import { Button } from '@gdh/ui-system'

import { setCookieConsent } from '@/app/[locale]/(profile)/_actions/index'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import styles from './CookieBannerClient.module.scss'

export const CookieBannerClient: React.FC = () => {
  const [cookieConsentState, setCookieConsentState] = useState<string | null>(
    null,
  )

  useEffect(() => {
    const storedConsent = document.cookie
      .split('; ')
      .find((row) => row.startsWith('cookie_consent='))
      ?.split('=')[1]
    setCookieConsentState(storedConsent || null)
  }, [])

  const handleAcceptCookies = async () => {
    await setCookieConsent('granted')
    setCookieConsentState('granted')
  }

  const handleDeclineCookies = async () => {
    await setCookieConsent('denied')
    setCookieConsentState('denied')
  }

  if (cookieConsentState !== null) {
    return null
  }

  return (
    <div className={styles.bannerWrapper}>
      <div className={styles.cookieHeader}>🍪 Our website uses cookies</div>
      <div className={styles.cookieInfoText}>
        Our website use cookies. By continuing, we assume your permission to
        deploy cookies as detailed in our{' '}
        <span className={styles.cookiePrivacyPolicy}>
          <Link
            target="_blank"
            href="https://glory-licorice-2e2.notion.site/Privacy-policy-6c075e8ad0de4927addf9592bb29de6e?pvs=4"
            className={styles.link}
          >
            Privacy Policy
          </Link>
        </span>
        .
      </div>
      <div className={styles.btnWrapper}>
        <Button variant={'primary'} onClick={handleAcceptCookies}>
          Accept all
        </Button>
        <Button variant={'secondary'} onClick={handleDeclineCookies}>
          Decline
        </Button>
      </div>
    </div>
  )
}

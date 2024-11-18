'use client'
import { getCookie, setCookie } from '@/utils/cookiesHelper'
import { Button } from '@gdh/ui-system'
import classNames from 'classnames'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import styles from './CookieBanner.module.scss'

export const CookieBanner: React.FC = () => {
  const [cookieConsent, setCookieConsent] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const storedConsent = getCookie('cookie_consent')
    setCookieConsent(storedConsent)
    setIsLoading(false)
  }, [])

  useEffect(() => {
    if (cookieConsent !== null) {
      setCookie('cookie_consent', cookieConsent, 365)

      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('consent', 'update', {
          analytics_storage: cookieConsent === 'granted' ? 'granted' : 'denied',
        })
      }
    }
  }, [cookieConsent])

  // Do not render the banner if loading or consent is already given
  if (isLoading || cookieConsent !== null) {
    return null
  }

  const handleAcceptCookies = () => setCookieConsent('granted')
  const handleDeclineCookies = () => setCookieConsent('denied')

  const bannerClass = classNames(styles.bannerWrapper, {
    [styles.visible]: cookieConsent === null,
    [styles.hidden]: cookieConsent !== null,
  })

  return (
    <div className={bannerClass}>
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

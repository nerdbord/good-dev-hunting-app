'use client'
import { Button } from '@gdh/ui-system'
import { useEffect, useState } from 'react'
import styles from './CookieBanner.module.scss'

export const CookieBanner: React.FC = () => {
  const [isBannerVisible, setIsBannerVisible] = useState<boolean>(false)

  useEffect(() => {
    try {
      const hasAcceptedCookies = localStorage.getItem('cookiesAccepted')
      if (!hasAcceptedCookies) {
        setIsBannerVisible(true)
      }
    } catch (error) {
      console.error('Could not access localStorage:', error)
    }
  }, [])

  const acceptCookies = () => {
    try {
      localStorage.setItem('cookiesAccepted', 'true')
      setIsBannerVisible(false)
    } catch (error) {
      console.error('Could not set cookiesAccepted in localStorage:', error)
    }
  }

  const declineCookies = () => {
    setIsBannerVisible(false)
  }

  if (!isBannerVisible) return null
  return (
    <div className={styles.bannerWrapper}>
      <div className={styles.cookieHeader}>🍪 Our website uses cookies</div>
      <div className={styles.cookieInfoText}>
        Our website use cookies. By continuing, we assume your permission to
        deploy cookies as detailed in our{' '}
        <span className={styles.cookiePrivacyPolicy}>Privacy Policy</span>.
      </div>
      <div className={styles.btnWrapper}>
        <Button variant={'primary'} onClick={acceptCookies}>
          Accept all
        </Button>
        <Button variant={'secondary'} onClick={declineCookies}>
          Decline
        </Button>
      </div>
    </div>
  )
}

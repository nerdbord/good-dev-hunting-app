'use client'
import { useEffect, useState } from 'react'
import styles from './CookieBanner.module.scss'

export const CookieBanner: React.FC = () => {
  const [isBannerVisible, setIsBannerVisible] = useState<boolean>(false)

  useEffect(() => {
    const hasAcceptedCookies = localStorage.getItem('cookiesAccepted')
    if (!hasAcceptedCookies) {
      setIsBannerVisible(true)
    }
  }, [])

  const acceptCookies = () => {
    localStorage.setItem('cookiesAccepted', 'true')
    setIsBannerVisible(false)
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
        <button className={styles.acceptBtn} onClick={() => acceptCookies}>
          Accept all
        </button>
        <button className={styles.declineBtn} onClick={()=> declineCookies}>Decline</button>
      </div>
    </div>
  )
}

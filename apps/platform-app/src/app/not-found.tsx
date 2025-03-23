'use client'

import { AppRoutes } from '@/utils/routes'
import Link from 'next/link'
import styles from './not-found.module.scss'

export default function NotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.logoWrapper}>
          <div className={styles.logo}>GDH</div>
        </div>

        <h1 className={styles.title}>404</h1>
        <h2 className={styles.subtitle}>Page Not Found</h2>

        <p className={styles.description}>
          The page you're looking for doesn't exist or has been moved.
        </p>

        <div className={styles.actions}>
          <Link href={AppRoutes.home} className={styles.primaryButton}>
            Return Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className={styles.secondaryButton}
          >
            Go Back
          </button>
        </div>

        <div className={styles.decorationWrapper}>
          <div className={styles.decoration}>
            <div className={styles.circle1}></div>
            <div className={styles.circle2}></div>
            <div className={styles.circle3}></div>
          </div>
        </div>
      </div>
    </div>
  )
}

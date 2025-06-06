import { AppRoutes } from '@/utils/routes'
import { Button } from '@gdh/ui-system'
import Link from 'next/link'
import styles from './not-found.module.scss'

export const dynamic = 'force-dynamic'

export default function NotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.logoWrapper}>
          <div className={styles.logo}>Good Dev Hunting</div>
        </div>

        <h1 className={styles.title}>404</h1>
        <h2 className={styles.subtitle}>Page Not Found</h2>

        <p className={styles.description}>
          The page you're looking for doesn't exist or has been moved.
        </p>

        <div className={styles.actions}>
          <Link href={AppRoutes.home}>
            <Button variant="primary">Return Home</Button>
          </Link>
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

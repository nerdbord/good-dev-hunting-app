import { AppRoutes } from '@/utils/routes'
import Link from 'next/link'
import styles from './page.module.scss'

export default function InboxLoading() {
  return (
    <div className={styles.container}>
      <Link href={AppRoutes.myProfile} className={styles.backLink}>
        ← Mój profil
      </Link>

      <h1 className={styles.pageTitle}>Zlecenia</h1>

      <div className={styles.inboxContainer}>
        <div className={styles.sidebar}>
          <div className={styles.negotiationsList}>
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className={`${styles.negotiationItem} ${styles.loadingItem}`}
              >
                <div className={styles.loadingContent}>
                  <div className={styles.loadingTitle}></div>
                  <div className={styles.loadingSubtitle}></div>
                  <div className={styles.loadingText}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.chatContainer}>
          <div className={styles.loadingState}>
            <div className={styles.loadingSpinner}></div>
          </div>
        </div>
      </div>
    </div>
  )
}

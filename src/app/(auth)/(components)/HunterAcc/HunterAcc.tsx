'use client'
import { AppRoutes } from '@/utils/routes'
import { useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import styles from './HunterAcc.module.scss'

const HunterAcc = () => {
  const pathname = usePathname()
  const { data: session } = useSession()

  if (!session) {
    return (
      <div className={styles.hunter}>
        <div className={styles.hunterAcc}>
          <p className={styles.hunterAccEmail}>Loading...</p>
        </div>
      </div>
    )
  }

  return pathname !== AppRoutes.home ? (
    <div className={styles.hunter}>
      <div className={styles.hunterRole}>HUNTER</div>
      <div className={styles.hunterAcc}>
        <p className={styles.hunterAccEmail}>{session?.user.email}</p>
      </div>
    </div>
  ) : null
}

export default HunterAcc

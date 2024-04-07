'use client'
import { useSession } from 'next-auth/react'
import styles from './HunterAcc.module.scss'

const HunterAcc = () => {
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

  return (
    <div className={styles.hunter}>
      <div className={styles.hunterRole}>HUNTER</div>
      <div className={styles.hunterAcc}>
        <p className={styles.hunterAccEmail}>{session.user.email}</p>
      </div>
    </div>
  )
}

export default HunterAcc

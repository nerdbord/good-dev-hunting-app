'use client'
import { AppRoutes } from '@/utils/routes'
import { Avatar } from '@gdh/ui-system'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import defaultUserImg from '../../../../../../public/default-avatar.png'
import styles from './GithubAcc.module.scss'

const GithubAcc = () => {
  const { data: session } = useSession()

  if (!session) {
    return (
      <div className={styles.github}>
        <div className={styles.githubAcc}>
          <Avatar src={defaultUserImg} size={38} />
          <p className={styles.githubAccName}>Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.github}>
      <Link href={AppRoutes.myProfile} className={styles.profileLink}>
        <div className={styles.githubAcc}>
          {session?.user.avatarUrl && (
            <Avatar src={session.user.avatarUrl} size={38} />
          )}
          <p className={styles.githubAccName}>{session?.user.name}</p>
        </div>
      </Link>
    </div>
  )
}

export default GithubAcc

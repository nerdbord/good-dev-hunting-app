'use client'
import { Avatar } from '@/components/Avatar/Avatar'
import { AppRoutes } from '@/utils/routes'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import defaultUserImg from '../../../../../public/default-avatar.png'
import styles from './GithubAcc.module.scss'

const GithubAcc = () => {
  const pathname = usePathname()
  const { data: session } = useSession()

  if (!session) {
    return (
      <Link href={AppRoutes.myProfile}>
        <div className={styles.github}>
          <div className={styles.githubAcc}>
            <Avatar src={defaultUserImg} size={38} />
            <p className={styles.githubAccName}>Loading...</p>
          </div>
        </div>
      </Link>
    )
  }

  return pathname !== AppRoutes.home ? (
    <Link href={AppRoutes.myProfile}>
      <div className={styles.github}>
        <div className={styles.githubAcc}>
          {session?.user.image && <Avatar src={session.user.image} size={38} />}
          <p className={styles.githubAccName}>{session?.user.name}</p>
        </div>
      </div>
    </Link>
  ) : null
}

export default GithubAcc

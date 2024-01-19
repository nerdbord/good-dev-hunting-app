'use client'
import styles from './GithubAcc.module.scss'
import React from 'react'
import Image from 'next/image'
import { AppRoutes } from '@/utils/routes'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import defaultUserImg from '../../../public/default-avatar.png'

const GithubAcc = () => {
  const pathname = usePathname()
  const { data: session } = useSession()

  if (!session) {
    return (
      <Link href={AppRoutes.myProfile}>
        <div className={styles.github}>
          <div className={styles.githubAcc}>
            <Image
              className={styles.githubAccImg}
              src={defaultUserImg}
              width={38}
              height={38}
              alt="github avatar"
            />
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
          {session?.user.image && (
            <Image
              className={styles.githubAccImg}
              src={session.user.image}
              width={38}
              height={38}
              alt="github avatar"
            />
          )}
          <p className={styles.githubAccName}>{session?.user.name}</p>
        </div>
      </div>
    </Link>
  ) : null
}

export default GithubAcc

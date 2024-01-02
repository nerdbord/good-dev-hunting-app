'use client'
import styles from './GithubAcc.module.scss'
import React from 'react'
import Image from 'next/image'
import { AppRoutes } from '@/utils/routes'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

const GithubAcc = () => {
  const pathname = usePathname()
  const { data: session } = useSession()

  return pathname !== AppRoutes.home ? (
    <div className={styles.github}>
      <p className={styles.githubAccConnected}>Connected Github account</p>
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
  ) : null
}

export default GithubAcc

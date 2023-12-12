import React from 'react'

import Link from 'next/link'
import styles from './MyProfileHeader.module.scss'
import Image from 'next/image'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

const MyProfileHeader = async () => {
  const session = await getServerSession(authOptions)

  return (
    <div>
      <header className={styles.wrapper}>
        <Link href="/" className={styles.logo}>
          <Image
            src="/assets/images/logo.png"
            alt="Logo"
            width={44}
            height={26}
          />
          <div className={styles.title}>Good Dev Hunting</div>
        </Link>
        <div className={styles.actions}>
          <div className={styles.github}>
            <div>
              <p className={styles.githubAccConnected}>
                Connected Github account
              </p>
            </div>
            <div className={styles.githubAcc}>
              {session?.user?.image && (
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
        </div>
      </header>
    </div>
  )
}

export default MyProfileHeader

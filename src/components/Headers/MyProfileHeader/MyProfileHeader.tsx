import React from 'react'
import Link from 'next/link'
import styles from './MyProfileHeader.module.scss'
import logo from '@/assets/images/logo.png'
import Image from 'next/image'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

const MyProfileHeader = async () => {
  const session = await getServerSession(authOptions)
  console.log(session)
  const name = session?.user?.name
  const avatar = session?.user?.image

  return (
    <div>
      <header className={styles.wrapper}>
        <Link href="/" className={styles.logo}>
          <img src={logo.src} alt="Logo" />
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
              {avatar && (
                <Image
                  className={styles.githubAccImg}
                  src={avatar}
                  width={38}
                  height={38}
                  alt="github avatar"
                />
              )}
              <p className={styles.githubAccName}>{name}</p>
            </div>
          </div>
        </div>
      </header>
    </div>
  )
}

export default MyProfileHeader

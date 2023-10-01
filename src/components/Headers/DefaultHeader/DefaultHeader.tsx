import React from 'react'
import styles from './DefaultHeader.module.scss'
import logo from '@/assets/images/logo.png'
import Link from 'next/link'
import Image from 'next/dist/client/image'
import SignInWithGithubBtn from '@/components/SignInWithGithubBtn/SignInWithGithubBtn'
import CreateProfileBtn from '@/components/CreateProfileBtn/CreateProfileBtn'
import MyProfileBtn from '@/components/MyProfileBtn/MyProfileBtn'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getProfileByUserId } from '@/backend/profile/profile.service'

const DefaultHeader = async () => {
  const session = await getServerSession(authOptions)

  const id = session?.user?.id
  const name = session?.user?.name
  const avatar = session?.user?.image

  const profile = id ? await getProfileByUserId(id) : null

  if (session) {
    return (
      <header className={styles.wrapper}>
        <Link href="/" className={styles.logo}>
          <img src={logo.src} alt="Logo" />
          <div className={styles.title}>Good Dev Hunting</div>
        </Link>
        <div className={styles.actions}>
          <div className={styles.frameLogin}>
            <p className={styles.githubAccConnected}>
              Connected Github account
            </p>
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
    )
  }

  return (
    <header className={styles.wrapper}>
      <Link href="/" className={styles.logo}>
        <img src={logo.src} alt="Logo" />
        <div className={styles.title}>Good Dev Hunting</div>
      </Link>

      <div className={styles.frameButtons}>
        <SignInWithGithubBtn />
      </div>
    </header>
  )
}
export default DefaultHeader

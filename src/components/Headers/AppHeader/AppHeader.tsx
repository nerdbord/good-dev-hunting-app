import React from 'react'
import logo from '@/assets/images/logo.png'
import Link from 'next/link'
import Image from 'next/image'
import { MyProfileButton } from '@/components/MyProfileButton/MyProfileButton'
import { GithubLoginButton } from '@/components/GithubLoginButton/GithubLoginButton'

import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getProfileByUserEmail } from '@/backend/profile/profile.service'

import { Container } from '@/components/Container/Container'

import styles from './AppHeader.module.scss'
import CreateProfileBtn from '@/components/CreateProfileBtn/CreateProfileBtn'

const AppHeader = async () => {
  const session = await getServerSession(authOptions)

  const profile = session
    ? await getProfileByUserEmail(session.user.email)
    : null

  if (session) {
    return (
      <header className={styles.wrapper}>
        <Container>
          <div className={styles.headerContent}>
            <Link href="/" className={styles.logo}>
              <img src={logo.src} alt="Logo" />
              <div className={styles.title}>Good Dev Hunting</div>
            </Link>

            <div className={styles.frameLogin}>
              <p className={styles.githubAccConnected}>
                Connected Github account
              </p>

              <div className={styles.githubAcc}>
                {session.user.image && (
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
              <MyProfileButton profileId={profile?.id || null} />
            </div>
          </div>
        </Container>
      </header>
    )
  }

  return (
    <header className={styles.wrapper}>
      <Container>
        <div className={styles.headerContent}>
          <Link href="/" className={styles.logo}>
            <img src={logo.src} alt="Logo" />
            <div className={styles.title}>Good Dev Hunting</div>
          </Link>

          <div className={styles.frameButtons}><CreateProfileBtn profileId={profile?.id || null} />
            <GithubLoginButton />
          </div>
        </div>
      </Container>
    </header>
  )
}
export default AppHeader

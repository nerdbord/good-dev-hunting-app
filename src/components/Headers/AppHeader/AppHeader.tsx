import React from 'react'

import Link from 'next/link'
import { GithubLoginButton } from '@/components/GithubLoginButton/GithubLoginButton'
import CreateProfileBtn from '@/components/CreateProfileBtn/CreateProfileBtn'
import MyProfileBtn from '@/components/MyProfileBtn/MyProfileBtn'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getProfileByUserEmail } from '@/backend/profile/profile.service'
import { Container } from '@/components/Container/Container'
import styles from './AppHeader.module.scss'
import { AppRoutes } from '@/utils/routes'
import GithubAcc from '@/components/GithubAcc/GithubAcc'
import Image from 'next/image'

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
              <Image
                src="/assets/images/logo.png"
                alt="Logo"
                width={187}
                height={26}
              />
              <div className={styles.title}>Good Dev Hunting</div>
            </Link>
            <div className={styles.frameButtons}>
              <div className={styles.buttonBox}>
                {profile ? (
                  <MyProfileBtn />
                ) : (
                  <CreateProfileBtn data-testid="create-profile-button" />
                )}
              </div>
            </div>
            {profile ? <GithubAcc /> : null}
          </div>
        </Container>
      </header>
    )
  }

  return (
    <header className={styles.wrapper}>
      <Container>
        <div className={styles.headerContent}>
          <Link href={AppRoutes.home} className={styles.logo}>
            <Image
              src="/assets/images/logo.png"
              alt="Logo"
              width={187}
              height={26}
            />
            <div className={styles.title}>Good Dev Hunting</div>
          </Link>
          <div className={styles.frameButtons}>
            <div className={styles.buttonBox}>
              <GithubLoginButton />
              <CreateProfileBtn />
            </div>
          </div>
        </div>
      </Container>
    </header>
  )
}
export default AppHeader

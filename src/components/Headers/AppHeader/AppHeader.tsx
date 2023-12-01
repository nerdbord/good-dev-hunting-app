import React from 'react'
import logo from '@/assets/images/logo.png'
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

const AppHeader = async () => {
  const session = await getServerSession(authOptions)

  const profile = session
    ? await getProfileByUserEmail(session.user.email)
    : null

  console.log(session)
  console.log(profile)

  if (session) {
    return (
      <header className={styles.wrapper}>
        <Container>
          <div className={styles.headerContent}>
            <Link href="/" className={styles.logo}>
              <img src={logo.src} alt="Logo" />
              <div className={styles.title}>Good Dev Hunting</div>
            </Link>
            <div className={styles.frameButtons}>
              <div className={styles.buttonBox}>
                {profile ? <MyProfileBtn /> : <CreateProfileBtn />}
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
            <img src={logo.src} alt="Logo" />
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

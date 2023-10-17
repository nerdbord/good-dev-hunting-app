import React from 'react'
import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { Role } from '@prisma/client'

import { findUserByEmail } from '@/backend/user/user.service'
import { AppRoutes } from '@/utils/routes'

import { Container } from '@/components/Container/Container'
import { Button } from '@/components/Button/Button'
import { MyProfileButton } from '@/components/MyProfileButton/MyProfileButton'
import logo from '@/assets/images/logo.png'

import styles from './DashboardHeader.module.scss'

const DashboardHeader = async () => {
  const session = await getServerSession(authOptions)

  const profile = session && (await findUserByEmail(session.user.email))

  if (!profile?.roles.includes(Role.MODERATOR) || !profile)
    redirect(AppRoutes.home)
  

  return (
    <header className={styles.wrapper}>
      <Container>
        <div className={styles.headerContent}>
          <Link href="/" className={styles.logo}>
            <img src={logo.src} alt="Logo" />
            <div className={styles.title}>Good Dev Hunting</div>
          </Link>

          <div className={styles.frameButtons}>
            <Button variant="secondary">Moderation</Button>
            <MyProfileButton profileId={profile?.profile?.id || null} />
          </div>
        </div>
      </Container>
    </header>
  )
}

export default DashboardHeader

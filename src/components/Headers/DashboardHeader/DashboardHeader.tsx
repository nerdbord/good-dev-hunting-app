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
import MyProfileBtn from '@/components/MyProfileBtn/MyProfileBtn'
import CreateProfileBtn from '@/components/CreateProfileBtn/CreateProfileBtn'
import styles from './DashboardHeader.module.scss'
import Image from 'next/image'
const DashboardHeader = async () => {
  const session = await getServerSession(authOptions)

  const user = session && (await findUserByEmail(session.user.email))

  if (!user?.roles.includes(Role.MODERATOR) || !user) redirect(AppRoutes.home)

  return (
    <header className={styles.wrapper}>
      <Container>
        <div className={styles.headerContent}>
          <Link href={AppRoutes.home} className={styles.logo}>
            <Image
              src="/assets/images/logo.png"
              alt="Logo"
              width={44}
              height={26}
            />
            <div className={styles.title}>Good Dev Hunting</div>
          </Link>
          <div className={styles.frameButtons}>
            <Button variant="secondary">Moderation</Button>
            {user.profile ? <MyProfileBtn /> : <CreateProfileBtn />}
          </div>
        </div>
      </Container>
    </header>
  )
}

export default DashboardHeader

import { Role } from '@prisma/client'

import Link from 'next/link'
import { redirect } from 'next/navigation'

import { findUserByEmail } from '@/backend/user/user.service'
import { AppRoutes } from '@/utils/routes'

import MyProfileBtn from '@/app/(profile)/(components)/MyProfileBtn/MyProfileBtn'
import CreateProfileBtn from '@/app/(profile)/my-profile/(components)/CreateProfileBtn/CreateProfileBtn'
import logo from '@/assets/images/logo.png'
import { Container } from '@/components/Container/Container'

import { auth } from '@/auth'
import styles from './DashboardHeader.module.scss'

const DashboardHeader = async () => {
  const session = await auth()

  const user = session && (await findUserByEmail(session.user.email))

  if (!user?.roles.includes(Role.MODERATOR) || !user)
    redirect(AppRoutes.profiles)

  return (
    <header className={styles.wrapper}>
      <Container>
        <div className={styles.headerContent}>
          <Link href={AppRoutes.profiles} className={styles.logo}>
            <img src={logo.src} alt="Logo" />
            <div className={styles.title}>Good Dev Hunting</div>
          </Link>
          <div className={styles.frameButtons}>
            {user.profile ? <MyProfileBtn /> : <CreateProfileBtn />}
          </div>
        </div>
      </Container>
    </header>
  )
}

export default DashboardHeader

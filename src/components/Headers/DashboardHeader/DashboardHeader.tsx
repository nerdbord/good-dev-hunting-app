import { authOptions } from '@/lib/auth'
import { Role } from '@prisma/client'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import { findUserByEmail } from '@/backend/user/user.service'
import { AppRoutes } from '@/utils/routes'

import logo from '@/assets/images/logo.png'
import { Container } from '@/components/Container/Container'
import CreateProfileBtn from '@/components/CreateProfileBtn/CreateProfileBtn'
import MyProfileBtn from '@/components/MyProfileBtn/MyProfileBtn'

import styles from './DashboardHeader.module.scss'

const DashboardHeader = async () => {
  const session = await getServerSession(authOptions)

  const user = session && (await findUserByEmail(session.user.email))

  if (!user?.roles.includes(Role.MODERATOR) || !user) redirect(AppRoutes.home)

  return (
    <header className={styles.wrapper}>
      <Container>
        <div className={styles.headerContent}>
          <Link href={AppRoutes.home} className={styles.logo}>
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

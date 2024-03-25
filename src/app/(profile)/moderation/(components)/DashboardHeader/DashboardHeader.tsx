import { getAuthorizedUser } from '@/app/(auth)/helpers'
import MyProfileBtn from '@/app/(profile)/(components)/MyProfileBtn/MyProfileBtn'
import CreateProfileBtn from '@/app/(profile)/my-profile/(components)/CreateProfileBtn/CreateProfileBtn'
import logo from '@/assets/images/logo.png'
import { Container } from '@/components/Container/Container'
import { AppRoutes } from '@/utils/routes'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import styles from './DashboardHeader.module.scss'

const DashboardHeader = async () => {
  const { user, userIsHunter, userIsModerator } = await getAuthorizedUser()

  if (!userIsModerator || !user) redirect(AppRoutes.profiles)
  return (
    <header className={styles.wrapper}>
      <Container>
        <div className={styles.headerContent}>
          <Link href={AppRoutes.profiles} className={styles.logo}>
            <img src={logo.src} alt="Logo" />
            <div className={styles.title}>Good Dev Hunting</div>
          </Link>
          <div className={styles.frameButtons}>
            {!userIsHunter && (
              <>{user.profile ? <MyProfileBtn /> : <CreateProfileBtn />}</>
            )}
          </div>
        </div>
      </Container>
    </header>
  )
}

export default DashboardHeader

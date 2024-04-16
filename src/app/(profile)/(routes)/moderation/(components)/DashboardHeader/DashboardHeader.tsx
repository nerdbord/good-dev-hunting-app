import { getAuthorizedUser } from '@/app/(auth)/auth.helpers'
import MyProfileBtn from '@/app/(profile)/(components)/MyProfileBtn/MyProfileBtn'
import CreateProfileBtn from '@/app/(profile)/(routes)/my-profile/(components)/CreateProfileBtn/CreateProfileBtn'
import logo from '@/assets/images/logo.png'
import { Container } from '@/components/Container/Container'
import { AppRoutes } from '@/utils/routes'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import styles from './DashboardHeader.module.scss'

const DashboardHeader = async () => {
  const { user, userIsHunter, userIsModerator, userHasProfile } =
    await getAuthorizedUser()

  if (!userIsModerator || !user) redirect(AppRoutes.profilesList)
  return (
    <header className={styles.wrapper}>
      <Container>
        <div className={styles.headerContent}>
          <Link href={AppRoutes.profilesList} className={styles.logo}>
            <img src={logo.src} alt="Logo" />
            <div className={styles.title}>Good Dev Hunting</div>
          </Link>
          <div className={styles.frameButtons}>
            {!userIsHunter && (
              <>{userHasProfile ? <MyProfileBtn /> : <CreateProfileBtn />}</>
            )}
          </div>
        </div>
      </Container>
    </header>
  )
}

export default DashboardHeader

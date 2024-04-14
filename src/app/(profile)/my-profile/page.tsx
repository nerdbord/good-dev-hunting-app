import LogOutBtn from '@/app/(auth)/(components)/LogOutBtn/LogOutBtn'
import { getAuthorizedUser } from '@/app/(auth)/auth.helpers'
import ProfileDetails from '@/app/(profile)/(components)/MyProfile/ProfileDetails/ProfileDetails'
import ProfileMain from '@/app/(profile)/(components)/MyProfile/ProfileMain/ProfileMain'
import ProfileTopBar from '@/app/(profile)/(components)/MyProfile/ProfileTopBar/ProfileTopBar'
import { findProfileByUserId } from '@/app/(profile)/_actions/findProfileByUserId'
import { ProfileProvider } from '@/app/(profile)/_providers/Profile.provider'
import { AppRoutes } from '@/utils/routes'
import { redirect } from 'next/navigation'
import styles from './page.module.scss'

export const revalidate = 0

const MyProfilePage = async () => {
  const { user, userIsHunter } = await getAuthorizedUser()
  if (!user || userIsHunter) {
    redirect(AppRoutes.profilesList)
  }

  const profile = await findProfileByUserId(user.id)
  if (!profile) {
    redirect(AppRoutes.profilesList)
  }

  const isConnectedToNerdbord = false // connected to nerdbord feature is currently dissabled

  return (
    <ProfileProvider profile={profile}>
      <div className={styles.wrapper}>
        <ProfileTopBar />
        <ProfileMain />
        <ProfileDetails />
        <div className={styles.disabledOnMobile}>
          <LogOutBtn />
        </div>
      </div>
    </ProfileProvider>
  )
}

export default MyProfilePage

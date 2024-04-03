import LogOutBtn from '@/app/(auth)/(components)/LogOutBtn/LogOutBtn'
import { getAuthorizedUser } from '@/app/(auth)/helpers'
import ProfileDetails from '@/app/(profile)/(components)/MyProfile/ProfileDetails/ProfileDetails'
import ProfileMain from '@/app/(profile)/(components)/MyProfile/ProfileMain/ProfileMain'
import ProfileTopBar from '@/app/(profile)/(components)/MyProfile/ProfileTopBar/ProfileTopBar'
import { getProfileByUserEmail } from '@/backend/profile/profile.service'
import { AppRoutes } from '@/utils/routes'
import { redirect } from 'next/navigation'
import styles from './page.module.scss'

export const revalidate = 0

const MyProfilePage = async () => {
  const { user, userIsHunter } = await getAuthorizedUser()
  if (!user || userIsHunter) {
    redirect(AppRoutes.profilesList)
  }

  const profile = await getProfileByUserEmail(user.email)
  if (!profile) {
    redirect(AppRoutes.profilesList)
  }

  const isConnectedToNerdbord = !!user?.nerdbordUserId

  return (
    <div className={styles.wrapper}>
      <ProfileTopBar
        profile={profile}
        isConnectedToNerdbord={isConnectedToNerdbord}
      />
      <ProfileMain
        profile={profile}
        isConnectedToNerdbord={isConnectedToNerdbord}
      />
      <ProfileDetails profile={profile} />
      <div className={styles.disabledOnMobile}>
        <LogOutBtn />
      </div>
    </div>
  )
}

export default MyProfilePage

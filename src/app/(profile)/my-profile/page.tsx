import LogOutBtn from '@/app/(auth)/(components)/LogOutBtn/LogOutBtn'
import { authOptions } from '@/app/(auth)/auth'
import ProfileDetails from '@/app/(profile)/(components)/MyProfile/ProfileDetails/ProfileDetails'
import ProfileMain from '@/app/(profile)/(components)/MyProfile/ProfileMain/ProfileMain'
import ProfileTopBar from '@/app/(profile)/(components)/MyProfile/ProfileTopBar/ProfileTopBar'
import { getProfileByUserEmail } from '@/backend/profile/profile.service'
import { findUserByEmail } from '@/backend/user/user.service'
import { AppRoutes } from '@/utils/routes'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import styles from './page.module.scss'

export const revalidate = 0

const MyProfilePage = async () => {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    redirect(AppRoutes.profiles)
  }

  const profile = await getProfileByUserEmail(session.user.email)

  if (!profile) {
    redirect(AppRoutes.profiles)
  }

  const user = await findUserByEmail(session.user.email)
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
      <LogOutBtn />
    </div>
  )
}

export default MyProfilePage

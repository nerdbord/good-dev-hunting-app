import { getProfileByUserEmail } from '@/backend/profile/profile.service'
import LogOutBtn from '@/components/LogOutBtn/LogOutBtn'
import ProfileDetails from '@/components/MyProfile/ProfileDetails/ProfileDetails'
import ProfileMain from '@/components/MyProfile/ProfileMain/ProfileMain'
import ProfileTopBar from '@/components/MyProfile/ProfileTopBar/ProfileTopBar'
import { authOptions } from '@/lib/auth'
import { AppRoutes } from '@/utils/routes'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import styles from './page.module.scss'
import { findUserByEmail } from '@/backend/user/user.service'

const MyProfilePage = async () => {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    redirect(AppRoutes.home)
  }

  const profile = await getProfileByUserEmail(session.user.email)

  if (!profile) {
    redirect(AppRoutes.home)
  }

  const user = await findUserByEmail(session.user.email)
  const isConnectedToNerdbord = !!user?.nerdbordUserId

  return (
    <div className={styles.wrapper}>
      {/* @ts-expect-error Server Component */}
      <ProfileTopBar profile={profile} />
      <ProfileMain
        profile={profile}
        isConnectedToNerdbord={isConnectedToNerdbord}
      />
      {/* @ts-expect-error Server Component */}
      <ProfileDetails profile={profile} />
      <LogOutBtn />
    </div>
  )
}

export default MyProfilePage

import LogOutBtn from '@/components/LogOutBtn/LogOutBtn'
import ProfileDetails from '@/components/MyProfile/ProfileDetails/ProfileDetails'
import ProfileMain from '@/components/MyProfile/ProfileMain/ProfileMain'
import ProfileTopBar from '@/components/MyProfile/ProfileTopBar/ProfileTopBar'
import { authOptions } from '@/lib/auth'
import { AppRoutes } from '@/utils/routes'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import styles from './page.module.scss'

export const revalidate = 0

const MyProfilePage = async () => {
  const session = await getServerSession(authOptions)

  if (!session || !session.user || !session.user.id) {
    redirect(AppRoutes.home)
  }

  return (
    <div className={styles.wrapper}>
      {/* @ts-expect-error Server Component */}
      <ProfileTopBar />
      {/* @ts-expect-error Server Component */}
      <ProfileMain />
      {/* @ts-expect-error Server Component */}
      <ProfileDetails />
      <LogOutBtn />
    </div>
  )
}

export default MyProfilePage

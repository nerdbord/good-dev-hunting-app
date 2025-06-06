import LogOutBtn from '@/app/[locale]/(auth)/(components)/LogOutBtn/LogOutBtn'
import ProfileDetails from '@/app/[locale]/(profile)/(components)/MyProfile/ProfileDetails/ProfileDetails'
import ProfileMain from '@/app/[locale]/(profile)/(components)/MyProfile/ProfileMain/ProfileMain'
import ProfileTopBar from '@/app/[locale]/(profile)/(components)/MyProfile/ProfileTopBar/ProfileTopBar'
import { findProfileByUserId } from '@/app/[locale]/(profile)/_actions/queries/findProfileByUserId'
import { getAuthorizedUser } from '@/utils/auth.helpers'
import { AppRoutes } from '@/utils/routes'
import { redirect } from 'next/navigation'
import styles from './page.module.scss'

export const revalidate = 0

const MyProfilePage = async () => {
  const { user, userIsSpecialist } = await getAuthorizedUser()
  if (!user || !userIsSpecialist) {
    redirect(AppRoutes.home)
  }

  const profile = await findProfileByUserId(user.id)

  if (!profile) {
    redirect(AppRoutes.createProfile)
  }

  return (
    <div className={styles.wrapper}>
      <ProfileTopBar profileId={profile.id} />
      <ProfileMain profileId={profile.id} />
      <ProfileDetails profileId={profile.id} />
      <div className={styles.disabledOnMobile}>
        <LogOutBtn />
      </div>
    </div>
  )
}

export default MyProfilePage

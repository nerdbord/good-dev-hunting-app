import { getProfileByUserEmail } from '@/backend/profile/profile.service'
import CreateProfileTopBar from '@/components/CreateProfile/CreateProfileTopBar/CreateProfileTopBar'
import LocationPreferences from '@/components/CreateProfile/LocationPreferences/LocationPreferences'
import PersonalInfo from '@/components/CreateProfile/PersonalInfo/PersonalInfo'
import WorkInformation from '@/components/CreateProfile/WorkInformation/WorkInformation'
import EditProfileFormWrapper from '@/components/EditProfileForm/EditProfileFormWrapper'
import { UploadProvider } from '@/contexts/UploadContext'
import { authOptions } from '@/lib/auth'
import { AppRoutes } from '@/utils/routes'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import styles from './page.module.scss'

export const revalidate = 0

const EditProfilePage = async () => {
  const session = await getServerSession(authOptions)

  if (!session || !session.user || !session.user.id) {
    redirect(AppRoutes.home)
  }

  const profile = await getProfileByUserEmail(session.user.email)

  if (!profile) {
    redirect(AppRoutes.createProfile)
  }

  return (
    <UploadProvider>
      <EditProfileFormWrapper profile={profile}>
        <div className={styles.wrapper}>
          <CreateProfileTopBar />
          <div className={styles.formBox}>
            <PersonalInfo profile={profile} />
            <LocationPreferences />
            <WorkInformation />
          </div>
        </div>
      </EditProfileFormWrapper>
    </UploadProvider>
  )
}

export default EditProfilePage

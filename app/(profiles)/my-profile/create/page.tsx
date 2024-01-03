import { getProfileByUserEmail } from '@/backend/profile/profile.service'
import CreateProfileTopBar from '@/components/CreateProfile/CreateProfileTopBar/CreateProfileTopBar'
import LocationPreferences from '@/components/CreateProfile/LocationPreferences/LocationPreferences'
import PersonalInfo from '@/components/CreateProfile/PersonalInfo/PersonalInfo'
import WorkInformation from '@/components/CreateProfile/WorkInformation/WorkInformation'
import CreateProfileFormWrapper from '@/components/CreateProfileForm/CreateProfileFormWrapper'
import { UploadProvider } from '@/contexts/UploadContext'
import { authOptions } from '@/lib/auth'
import { AppRoutes } from '@/utils/routes'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import styles from './page.module.scss'

const CreateProfilePage = async () => {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    redirect(AppRoutes.home)
  }

  const profile = await getProfileByUserEmail(session.user.email)

  if (profile) {
    redirect(AppRoutes.myProfile)
  }

  return (
    <UploadProvider>
      <CreateProfileFormWrapper>
        <div className={styles.wrapper}>
          <CreateProfileTopBar />
          <div className={styles.formBox}>
            <PersonalInfo />
            <LocationPreferences />
            <WorkInformation />
          </div>
        </div>
      </CreateProfileFormWrapper>
    </UploadProvider>
  )
}

export default CreateProfilePage

import { getAuthorizedUser } from '@/app/(auth)/auth.helpers'
import EditProfileForm from '@/app/(profile)/(routes)/my-profile/(components)/EditProfileForm/EditProfileForm'
import { findProfileByUserId } from '@/app/(profile)/_actions'
import { ProfileProvider } from '@/app/(profile)/_providers/Profile.provider'
import { UploadProvider } from '@/contexts/UploadContext'
import { AppRoutes } from '@/utils/routes'
import { redirect } from 'next/navigation'

const EditProfilePage = async () => {
  const { user, userIsHunter } = await getAuthorizedUser()
  if (!user || userIsHunter) {
    redirect(AppRoutes.profilesList)
  }

  const profile = await findProfileByUserId(user.id)

  if (!profile) {
    redirect(AppRoutes.createProfile)
  }

  return (
    <ProfileProvider profile={profile}>
      <UploadProvider>
        <EditProfileForm />
      </UploadProvider>
    </ProfileProvider>
  )
}

export default EditProfilePage

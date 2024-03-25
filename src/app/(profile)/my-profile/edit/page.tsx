import { getAuthorizedUser } from '@/app/(auth)/helpers'
import EditProfileForm from '@/app/(profile)/my-profile/(components)/EditProfileForm/EditProfileForm'
import { getProfileByUserEmail } from '@/backend/profile/profile.service'
import { UploadProvider } from '@/contexts/UploadContext'
import { AppRoutes } from '@/utils/routes'
import { redirect } from 'next/navigation'

const EditProfilePage = async () => {
  const { user, userIsHunter } = await getAuthorizedUser()

  if (!user || userIsHunter) {
    redirect(AppRoutes.profiles)
  }

  const profile = await getProfileByUserEmail(user.email)

  if (!profile) {
    redirect(AppRoutes.createProfile)
  }

  return (
    <UploadProvider>
      <EditProfileForm profile={profile} />
    </UploadProvider>
  )
}

export default EditProfilePage

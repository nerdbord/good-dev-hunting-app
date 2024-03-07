import EditProfileForm from '@/app/(profile)/my-profile/(components)/EditProfileForm/EditProfileForm'
import { auth } from '@/auth'
import { getProfileByUserEmail } from '@/backend/profile/profile.service'
import { UploadProvider } from '@/contexts/UploadContext'
import { AppRoutes } from '@/utils/routes'
import { redirect } from 'next/navigation'

const EditProfilePage = async () => {
  const session = await auth()

  if (!session?.user) {
    redirect(AppRoutes.profiles)
  }

  const profile = await getProfileByUserEmail(session.user.email)

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

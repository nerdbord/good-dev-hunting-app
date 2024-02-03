import { authOptions } from '@/app/(auth)/auth'
import EditProfileForm from '@/app/(profile)/my-profile/(components)/EditProfileForm/EditProfileForm'
import { getProfileByUserEmail } from '@/backend/profile/profile.service'
import { UploadProvider } from '@/contexts/UploadContext'
import { AppRoutes } from '@/utils/routes'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

const EditProfilePage = async () => {
  const session = await getServerSession(authOptions)

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

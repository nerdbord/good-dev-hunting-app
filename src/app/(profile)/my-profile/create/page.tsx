import { authOptions } from '@/app/(auth)/auth'
import CreateProfileForm from '@/app/(profile)/my-profile/(components)/CreateProfileForm/CreateProfileForm'
import { getProfileByUserEmail } from '@/backend/profile/profile.service'
import { UploadProvider } from '@/contexts/UploadContext'
import { AppRoutes } from '@/utils/routes'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

const CreateProfilePage = async () => {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    redirect(AppRoutes.profiles)
  }

  const profile = await getProfileByUserEmail(session.user.email)

  if (profile) {
    redirect(AppRoutes.myProfile)
  }

  return (
    <UploadProvider>
      <CreateProfileForm />
    </UploadProvider>
  )
}

export default CreateProfilePage

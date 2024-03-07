import CreateProfileForm from '@/app/(profile)/my-profile/(components)/CreateProfileForm/CreateProfileForm'
import { auth } from '@/auth'
import { getProfileByUserEmail } from '@/backend/profile/profile.service'
import { UploadProvider } from '@/contexts/UploadContext'
import { AppRoutes } from '@/utils/routes'
import { redirect } from 'next/navigation'

const CreateProfilePage = async () => {
  const session = await auth()

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

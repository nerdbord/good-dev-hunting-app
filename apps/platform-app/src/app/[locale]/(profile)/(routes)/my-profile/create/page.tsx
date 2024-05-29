import { getAuthorizedUser } from '@/app/[locale]/(auth)/auth.helpers'
import CreateProfileForm from '@/app/[locale]/(profile)/(routes)/my-profile/(components)/CreateProfileForm/CreateProfileForm'
import { findProfileByUserId } from '@/app/[locale]/(profile)/_actions'
import { UploadProvider } from '@/contexts/UploadContext'
import { AppRoutes } from '@/utils/routes'
import { redirect } from 'next/navigation'

const CreateProfilePage = async () => {
  const { user, userIsHunter } = await getAuthorizedUser()

  if (!user || userIsHunter) {
    redirect(AppRoutes.profilesList)
  }

  const profile = await findProfileByUserId(user.id)

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

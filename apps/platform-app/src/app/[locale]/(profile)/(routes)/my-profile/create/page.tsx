import { getAuthorizedUser } from '@/app/[locale]/(auth)/auth.helpers'
import CreateProfileForm from '@/app/[locale]/(profile)/(routes)/my-profile/(components)/CreateProfileForm/CreateProfileForm'
import { UploadProvider } from '@/contexts/UploadContext'
import { AppRoutes } from '@/utils/routes'
import { redirect } from 'next/navigation'

const CreateProfilePage = async () => {
  const { user, userIsHunter } = await getAuthorizedUser()
  if (!user || userIsHunter) {
    redirect(AppRoutes.profilesList)
  }

  const profileId = user.profileId
  if (profileId) {
    redirect(AppRoutes.myProfile)
  }

  return (
    <UploadProvider>
      <CreateProfileForm />
    </UploadProvider>
  )
}

export default CreateProfilePage

import { getAuthorizedUser } from '@/app/(auth)/helpers'
import CreateProfileForm from '@/app/(profile)/my-profile/(components)/CreateProfileForm/CreateProfileForm'
import { UploadProvider } from '@/contexts/UploadContext'
import { AppRoutes } from '@/utils/routes'
import { redirect } from 'next/navigation'

const CreateProfilePage = async () => {
  const { user, userIsHunter, userHasProfile } = await getAuthorizedUser()

  console.log(user)

  if (!user || userIsHunter) {
    redirect(AppRoutes.profilesList)
  }

  if (userHasProfile) {
    redirect(AppRoutes.myProfile)
  }

  return (
    <UploadProvider>
      <CreateProfileForm />
    </UploadProvider>
  )
}

export default CreateProfilePage

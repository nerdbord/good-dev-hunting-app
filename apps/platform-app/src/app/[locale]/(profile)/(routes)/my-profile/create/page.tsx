import CreateProfileForm from '@/app/[locale]/(profile)/(routes)/my-profile/(components)/CreateProfileForm/CreateProfileForm'
import { UploadProvider } from '@/contexts/UploadContext'
import { getAuthorizedUser } from '@/utils/auth.helpers'
import { AppRoutes } from '@/utils/routes'
import { redirect } from 'next/navigation'

const CreateProfilePage = async () => {
  const { user, userIsSpecialist, userHasProfile } = await getAuthorizedUser()
  if (!user || !userIsSpecialist) {
    redirect(AppRoutes.home)
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

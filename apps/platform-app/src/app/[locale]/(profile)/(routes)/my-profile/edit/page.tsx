import EditProfileForm from '@/app/[locale]/(profile)/(routes)/my-profile/(components)/EditProfileForm/EditProfileForm'
import { findProfileByUserId } from '@/app/[locale]/(profile)/_actions'
import { UploadProvider } from '@/contexts/UploadContext'
import { getAuthorizedUser } from '@/utils/auth.helpers'
import { AppRoutes } from '@/utils/routes'
import { redirect } from 'next/navigation'

const EditProfilePage = async () => {
  const { user, userIsHunter, userIsSpecialist } = await getAuthorizedUser()
  if (!user || (userIsHunter && !userIsSpecialist)) {
    redirect(AppRoutes.profilesList)
  }

  const profile = await findProfileByUserId(user.id)

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

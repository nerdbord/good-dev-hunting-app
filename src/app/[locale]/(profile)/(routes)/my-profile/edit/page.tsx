import EditProfileForm from '@/app/[locale]/(profile)/(routes)/my-profile/(components)/EditProfileForm/EditProfileForm'
import { UploadProvider } from '@/contexts/UploadContext'

const EditProfilePage = async () => {
  return (
    <UploadProvider>
      <EditProfileForm />
    </UploadProvider>
  )
}

export default EditProfilePage

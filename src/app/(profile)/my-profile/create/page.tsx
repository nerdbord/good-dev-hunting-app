import CreateProfileForm from '@/app/(profile)/my-profile/(components)/CreateProfileForm/CreateProfileForm'
import { UploadProvider } from '@/contexts/UploadContext'

const CreateProfilePage = async () => {
  return (
    <UploadProvider>
      <CreateProfileForm />
    </UploadProvider>
  )
}

export default CreateProfilePage

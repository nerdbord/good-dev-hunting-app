'use client'
import { serverUpdateUserAvatar } from '@/actions/user/updateUserAvatar'
import { ErrorIcon } from '@/assets/icons/ErrorIcon'
import { Button } from '@/components/Button/Button'
import { useUploadContext } from '@/contexts/UploadContext'
import { useAsyncAction } from '@/hooks/useAsyncAction'
import { apiClient } from '@/lib/apiClient'
import { AppRoutes } from '@/utils/routes'
import { useFormikContext } from 'formik'
import { usePathname } from 'next/navigation'
import styles from './CreateProfileTopBar.module.scss'

const CreateProfileTopBar = () => {
  const pathname = usePathname()
  const { handleSubmit, errors, touched, isValid } = useFormikContext()
  const { runAsync, loading } = useAsyncAction()
  const {
    imageUploadError,
    setImageUploadError,
    selectedFile,
    setSelectedFile,
  } = useUploadContext()

  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    if (Object.keys(errors).length === 0) {
      runAsync(async () => {
        if (selectedFile) {
          try {
            const url = await apiClient.userPhotoUpload(selectedFile)
            url && (await serverUpdateUserAvatar(url))
            handleSubmit()
          } catch (error) {
            console.log(error)
            setImageUploadError(true)
            setSelectedFile(null)
          }
        } else {
          !imageUploadError && handleSubmit()
        }
      })
    }
  }

  const hasTouchedErrors = Object.keys(errors).some(
    // @ts-ignore
    (key) => touched[key] && errors[key],
  )

  return (
    <div className={styles.titleBox}>
      <div className={styles.errorWrapper}>
        <span className={styles.title}>
          {pathname === AppRoutes.createProfile
            ? 'Create profile'
            : pathname === AppRoutes.editProfile
            ? 'Edit profile'
            : 'My profile'}
        </span>
        {(hasTouchedErrors || imageUploadError) && (
          <div className={styles.errorMsg}>
            <ErrorIcon />
            <span>Fill out the form to complete the profile</span>
          </div>
        )}
      </div>
      <div className={styles.buttonBox}>
        <Button
          loading={loading}
          variant="primary"
          disabled={!isValid}
          onClick={handleButtonClick}
          dataTestId="saveAndPreviewProfile"
        >
          {isMobile ? 'Save and preview' : 'Save and preview profile'}
        </Button>
      </div>
    </div>
  )
}

export default CreateProfileTopBar

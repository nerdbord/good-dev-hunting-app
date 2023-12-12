'use client'
import styles from './CreateProfileTopBar.module.scss'
import { Button } from '@/components/Button/Button'
import { ErrorIcon } from '../../../assets/icons/ErrorIcon'
import { useFormikContext } from 'formik'
import { useRouter, usePathname } from 'next/navigation'
import { AppRoutes } from '@/utils/routes'
import { useAsyncAction } from '@/hooks/useAsyncAction'
import { useUploadContext } from '@/contexts/UploadContext'
import { useEffect, useState } from 'react'

const CreateProfileTopBar = () => {
  const router = useRouter()
  const pathname = usePathname()
  const { handleSubmit, errors, isSubmitting } = useFormikContext()
  const { runAsync, loading } = useAsyncAction()
  const { setTriggerUpload, uploadSuccess, fileSelected, isUploading } =
    useUploadContext()

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    if (Object.keys(errors).length === 0) {
      runAsync(async () => {
        await handleSubmit()
        setTriggerUpload(true)
      })
    }
  }

  // useEffect(() => {
  //   if (uploadSuccess || (!fileSelected && isSubmitting)) {
  //     router.push(AppRoutes.myProfile)
  //   }
  // }, [uploadSuccess, isSubmitting])

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
        {Object.keys(errors).length > 0 && (
          <div className={styles.errorMsg}>
            <ErrorIcon />
            <span>Fill out the form to complete the profile</span>
          </div>
        )}
      </div>
      <div className={styles.buttonBox}>
        <Button variant="secondary">Connect with Nerdbord</Button>
        <Button
          loading={loading}
          variant="primary"
          onClick={handleButtonClick}
          dataTestId="saveAndPreviewProfile"
          type="submit"
        >
          Save and preview profile
        </Button>
      </div>
    </div>
  )
}

export default CreateProfileTopBar

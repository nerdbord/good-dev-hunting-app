'use client'
import { ErrorIcon } from '@/assets/icons/ErrorIcon'
import { Button } from '@/components/Button/Button'
import { useUploadContext } from '@/contexts/UploadContext'
import { AppRoutes } from '@/utils/routes'
import { useFormikContext } from 'formik'
import { usePathname } from 'next/navigation'
import styles from './CreateProfileTopBar.module.scss'

interface CreateProfileTopBarProps {
  isSubmitting?: boolean
}

const CreateProfileTopBar = (props: CreateProfileTopBarProps) => {
  const pathname = usePathname()

  const { errors, touched, isValid, handleSubmit } = useFormikContext()
  const { imageUploadError } = useUploadContext()
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768
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
          loading={props.isSubmitting}
          variant="primary"
          type="submit"
          onClick={() => handleSubmit()}
          disabled={props.isSubmitting || !isValid}
          dataTestId="saveAndPreviewProfile"
        >
          {isMobile ? 'Save and preview' : 'Save and preview profile'}
        </Button>
      </div>
    </div>
  )
}

export default CreateProfileTopBar

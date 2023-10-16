'use client'
import styles from './CreateProfileTopBar.module.scss'
import { Button } from '@/components/Button/Button'
import { ErrorIcon } from '../../../assets/icons/ErrorIcon'
import { useFormikContext } from 'formik'
import { useRouter } from 'next/navigation'
import { AppRoutes } from '@/utils/routes'
import { useAsyncAction } from '@/hooks/useAsyncAction'

const CreateProfileTopBar = () => {
  const router = useRouter()
  const { handleSubmit, errors, isSubmitting } = useFormikContext()
  const { runAsync, loading } = useAsyncAction()

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    runAsync(async () => {
      event.preventDefault()
      handleSubmit()
      router.push(AppRoutes.myProfile)
    })
  }

  return (
    <div className={styles.titleBox}>
      <div className={styles.errorWrapper}>
        <span className={styles.title}>Create profile page</span>
        {Object.keys(errors).length > 0 && (
          <div className={styles.errorMsg}>
            <ErrorIcon />
            <span>Fill out the form to complete the profile</span>
          </div>
        )}
      </div>
      <div className={styles.buttonBox}>
      <Button loading={loading} variant="primary" onClick={handleButtonClick}>
        Save and preview profile
      </Button>
    </div>
    </div>
  )
}

export default CreateProfileTopBar

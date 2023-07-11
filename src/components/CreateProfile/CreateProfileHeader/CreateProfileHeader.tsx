'use client'
import styles from './CreateProfileHeader.module.scss'
import { Button } from '@/inputs/Button/Button'
import { useFormContext } from '@/contexts/FormContext'
import { ErrorIcon } from '../../../assets/icons/ErrorIcon'

const CreateProfileHeader = () => {
  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    handleSubmit()
  }

  const { handleSubmit, errors } = useFormContext()

  return (
    <div className={styles.titleBox}>
      <div className={styles.errorWrapper}>
        <span>Create profile page</span>
        {Object.keys(errors).length > 0 && (
          <div className={styles.errorMsg}>
            <ErrorIcon />
            <span>Fill out the form to complete the profile</span>
          </div>
        )}
      </div>
      <Button variant="primary" onClick={handleButtonClick}>
        Save and preview profile
      </Button>
    </div>
  )
}

export default CreateProfileHeader

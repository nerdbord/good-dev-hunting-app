import styles from './CvUploader.module.scss'
import { CVuploaderForm } from './CvUploaderForm'

export const CVUploader = () => {
  return (
    <div className={styles.container}>
      <p className={styles.containerLabel}>CV file (optional)</p>
      <CVuploaderForm />
    </div>
  )
}

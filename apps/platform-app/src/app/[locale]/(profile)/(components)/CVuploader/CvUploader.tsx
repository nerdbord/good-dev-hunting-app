import { CVuploaderForm } from "./CvUploaderForm"
import styles from './CvUploader.module.scss'

export const CVUploader = () => {
  return (
    <div className={styles.container}>
      <p className={styles.containerLabel}>CV file (optional)</p>
      <CVuploaderForm profileId="" />
      
    </div>
  )
}
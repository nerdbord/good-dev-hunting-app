import { useTranslations } from 'next-intl'
import styles from './Loader.module.scss'

const Loader = () => {
  const t = useTranslations('Index')

  return (
    <div className={styles.loaderWrapper}>
      <div className={styles.loading}>
        {/* <p>
          Fetching that data for you <span className={styles.dot1}>.</span>
          <span className={styles.dot2}>.</span>
          <span className={styles.dot3}>.</span>
        </p> */}
        {t('title')}
      </div>
    </div>
  )
}

export default Loader

import { I18nNamespaces } from '@/I18nNamespaces'
import { useTranslations } from 'next-intl'
import styles from './Loader.module.scss'

const Loader = () => {
  const t = useTranslations(I18nNamespaces.Index)
  return (
    <div className={styles.loaderWrapper}>
      <div className={styles.loading}>
        <p>
          {t('title')} <span className={styles.dot1}>.</span>
          <span className={styles.dot2}>.</span>
          <span className={styles.dot3}>.</span>
        </p>
      </div>
    </div>
  )
}

export default Loader

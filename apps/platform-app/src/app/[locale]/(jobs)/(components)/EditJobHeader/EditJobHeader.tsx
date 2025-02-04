import { I18nNamespaces } from '@/i18n/request'
import { getTranslations } from 'next-intl/server'
import styles from './EditJobHeader.module.scss'

export const EditJobHeader = async () => {
  const t = await getTranslations(I18nNamespaces.Jobs)
  return (
    <>
      <div className={styles.header}>
        <h1>{t('jobSummaryHeader')}</h1>
      </div>
      <p className={styles.previewWarning}>{t('jobPreviewWarning')}</p>
    </>
  )
}

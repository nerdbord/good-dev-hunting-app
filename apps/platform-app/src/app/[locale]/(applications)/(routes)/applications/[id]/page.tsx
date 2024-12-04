import { I18nNamespaces } from '@/i18n/request'
import { getTranslations } from 'next-intl/server'
import styles from './page.module.scss'

interface ApplicationPageProps {
  params: {
    id: string
  }
}

const ApplicationPage = async ({ params }: ApplicationPageProps) => {
  const t = await getTranslations(I18nNamespaces.Applications)

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h1>{t('applicationDetails')}</h1>
      </div>
      <div className={styles.content}>
        <div className={styles.applicationInfo}>
          <h2>{t('applicantInfo')}</h2>
          <p>Application ID: {params.id}</p>
          {/* TODO: Add actual application details */}
        </div>
        <div className={styles.actions}>
          <h2>{t('actions')}</h2>
          {/* TODO: Add accept/reject buttons */}
        </div>
      </div>
    </div>
  )
}

export default ApplicationPage

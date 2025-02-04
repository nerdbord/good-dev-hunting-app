import { I18nNamespaces } from '@/i18n/request'
import { getTranslations } from 'next-intl/server'
import JobDetails from '../../../(components)/JobDetailsPage/JobDetails'
import styles from './page.module.scss'

interface JobPageProps {
  params: {
    id: string
  }
}

const JobPage = async ({ params }: JobPageProps) => {
  const t = await getTranslations(I18nNamespaces.Jobs)

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <h1>{t('jobPreview')}</h1>
        </div>
        <p>Job ID: {params.id}</p>
        <JobDetails params={{ id: params.id }} />
      </div>
    </>
  )
}

export default JobPage

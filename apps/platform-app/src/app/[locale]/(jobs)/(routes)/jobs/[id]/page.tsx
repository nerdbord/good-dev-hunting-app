import { ProgressBar } from '@/components/hunter-landing/ProgressBar/ProgressBar'
import { I18nNamespaces } from '@/i18n/request'
import { Button } from '@gdh/ui-system'
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
  const tt = await getTranslations(I18nNamespaces.Buttons)

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <h1>{t('jobPreview')}</h1>
        </div>
        <p className={styles.jobId}>Job ID: {params.id}</p>
        <JobDetails params={{ id: params.id }} />
      </div>
      <ProgressBar currentStep={5} maxSteps={5}>
        <Button variant="secondary" disabled={false}>
          {tt('edit')}
        </Button>
        <Button variant="primary" type="submit" disabled={false}>
          {tt('publishJob')}
        </Button>
      </ProgressBar>
    </>
  )
}

export default JobPage

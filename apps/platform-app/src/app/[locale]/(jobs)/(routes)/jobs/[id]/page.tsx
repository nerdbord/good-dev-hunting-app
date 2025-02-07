import { I18nNamespaces } from '@/i18n/request'
import { getTranslations } from 'next-intl/server'
import CreateAnotherJobBtn from '../../../(components)/CreateAnotherJobBtn/CreateAnotherJobBtn'
import styles from './page.module.scss'

interface JobPageProps {
  params: {
    id: string
  }
}

const JobPage = async ({ params }: JobPageProps) => {
  const t = await getTranslations(I18nNamespaces.Jobs)

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h1>{t('jobDetails')}</h1>
        {/* TODO: job preview which will be used also in jobs/:id/apply  */}
        <CreateAnotherJobBtn />
      </div>
      <p>Job ID: {params.id}</p>
    </div>
  )
}

export default JobPage

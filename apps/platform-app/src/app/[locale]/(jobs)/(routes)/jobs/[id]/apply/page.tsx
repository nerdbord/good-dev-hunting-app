import { getAuthorizedUser } from '@/app/[locale]/(auth)/auth.helpers'
import JobApplicationForm from '@/app/[locale]/(jobs)/(components)/JobApplicationForm/JobApplicationForm'
import { I18nNamespaces } from '@/i18n/request'
import { AppRoutes } from '@/utils/routes'
import { getTranslations } from 'next-intl/server'
import { redirect } from 'next/navigation'
import styles from '../page.module.scss'

interface JobApplicationPageProps {
  params: {
    id: string
  }
}

const JobApplicationPage = async ({ params }: JobApplicationPageProps) => {
  const { user, userIsHunter } = await getAuthorizedUser()
  const t = await getTranslations(I18nNamespaces.Jobs)

  if (!user || userIsHunter) {
    redirect(AppRoutes.signIn)
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h1>{t('applyForJob')}</h1>
      </div>
      <JobApplicationForm jobId={params.id} />
    </div>
  )
}

export default JobApplicationPage

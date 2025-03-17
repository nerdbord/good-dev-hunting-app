import { getAuthorizedUser } from '@/app/[locale]/(auth)/auth.helpers'
import { I18nNamespaces } from '@/i18n/request'
import { AppRoutes } from '@/utils/routes'
import { Button, Container } from '@gdh/ui-system'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { JobsHeader } from '../../../(components)/JobsHeader/JobsHeader'
import { JobsTopBar } from '../../../(components)/JobsTopBar/JobsTopBar'
import { MyJobCard } from '../../../(components)/MyJobCard/MyJobCard'
import { findMyJobs } from '../../../_actions/queries/getMyJobs'
import styles from './page.module.scss'

const MyJobsPage = async () => {
  const t = await getTranslations(I18nNamespaces.Jobs)
  const tButtons = await getTranslations(I18nNamespaces.Buttons)

  // Check if user is logged in
  const { user } = await getAuthorizedUser()

  // Redirect to sign in if not logged in
  if (!user) {
    redirect(AppRoutes.signIn)
  }

  // Fetch user's jobs
  const userJobs = await findMyJobs()

  const renderJobsCount = () => {
    if (userJobs.length === 0) {
      return t('noJobs')
    }
    if (userJobs.length === 1) {
      return `${userJobs.length} ${t('job')}`
    }
    return `${userJobs.length} ${t('jobs')}`
  }

  return (
    <>
      <JobsHeader logoWithTagLine={true} />
      <main>
        <Container>
          <JobsTopBar header={t('myJobs')} subHeader={renderJobsCount()}>
            <Link href={AppRoutes.postJob}>
              <Button variant="primary">{tButtons('addJob')}</Button>
            </Link>
          </JobsTopBar>
          <div className={styles.myJobsList}>
            {userJobs.length === 0 ? (
              <div className={styles.noJobsMessage}>
                <p>{t('noJobsMessage')}</p>
                <Link href={AppRoutes.postJob}>
                  <Button variant="primary">{tButtons('addJob')}</Button>
                </Link>
              </div>
            ) : (
              userJobs.map((job) => (
                <MyJobCard
                  key={job.id}
                  id={job.id}
                  name={job.jobName}
                  JobPublishingState={job.state}
                  createdAt={job.createdAt.toISOString()}
                  applications={job.applications.length}
                />
              ))
            )}
          </div>
        </Container>
      </main>
    </>
  )
}

export default MyJobsPage

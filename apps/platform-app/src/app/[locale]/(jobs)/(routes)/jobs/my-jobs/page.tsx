import { I18nNamespaces } from '@/i18n/request'
import { AppRoutes } from '@/utils/routes'
import { Button, Container } from '@gdh/ui-system'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import { JobsHeader } from '../../../(components)/JobsHeader/JobsHeader'
import { JobsTopBar } from '../../../(components)/JobsTopBar/JobsTopBar'
import { MyJobCard } from '../../../(components)/MyJobCard/MyJobCard'
import { mockJobs } from './mockData'
import styles from './page.module.scss'

const NewJobPage = async () => {
  const t = await getTranslations(I18nNamespaces.Jobs)
  const tButtons = await getTranslations(I18nNamespaces.Buttons)
  const jobs = [...mockJobs]

  const renderJobsCount = () => {
    if (jobs.length === 0) {
      return t('noJobs')
    }
    if (jobs.length === 1) {
      return `${jobs.length} ${t('job')}`
    }
    return `${jobs.length} ${t('jobs')}`
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
            {jobs.map((job, index) => (
              <MyJobCard
                name={job.name}
                JobPublishingState={job.PublishingState}
                createdAt={job.createdAt}
                // id={job.id}
                // key={job.id} //TODO: "At the time of implementing database work, use the actual ID of the object here, replace 'index' from the key with ID.
                key={index}
              />
            ))}
          </div>
        </Container>
      </main>
    </>
  )
}

export default NewJobPage

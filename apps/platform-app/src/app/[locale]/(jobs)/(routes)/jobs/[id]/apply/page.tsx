import { findJobById } from '@/app/[locale]/(jobs)/_actions/queries/getJobById'
import { I18nNamespaces } from '@/i18n/request'
import { Container } from '@gdh/ui-system'
import { getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { JobsHeader } from '@/app/[locale]/(jobs)/(components)/JobsHeader/JobsHeader'
import { JobDetailsBasicInfo } from '@/app/[locale]/(jobs)/(components)/JobDetailsBasicInfo/JobDetailsBasicInfo'
import { JobDetailsDetailsInfo } from '@/app/[locale]/(jobs)/(components)/JobDetailsMainInfo.tsx/JobDetailsDetailsInfo'
import { AvatarsDisplay } from '@/app/[locale]/(jobs)/(components)/AvatarsDisplay/AvatarsDisplay'
import JobApplicationClient from '@/app/[locale]/(jobs)/(components)/JobApplicationClient/JobApplicationClient'
import styles from '@/app/[locale]/(jobs)/(components)/JobDetailsPage/JobDetails.module.scss'
import pageStyles from '../page.module.scss'

interface JobApplicationPageProps {
  params: {
    id: string
    locale: string
  }
}

const JobApplicationPage = async ({ params }: JobApplicationPageProps) => {
  // In Next.js 15, we need to properly await the params object
  const resolvedParams = await params
  const { id } = resolvedParams

  const t = await getTranslations(I18nNamespaces.Jobs)

  // Fetch job data from database
  let jobData;
  try {
    jobData = await findJobById(id)
  } catch (error) {
    console.error('Error fetching job:', error)
    notFound()
  }

  // Extract tech stack for display
  const jobTechnologies = jobData.techStack.map((tech) => tech.name)

  return (
    <>
      <JobsHeader />
      <Container>
        <div className={pageStyles.wrapper}>
          <div className={pageStyles.header}>
            <div className={pageStyles.headerLeft}>
              <h1>{t('applyForJob')}</h1>
              <p>{jobData.jobName}</p>
            </div>
            <div className={pageStyles.headerRight}>
              {/* Client-side drawer and button handling */}
              <JobApplicationClient jobId={id} jobName={jobData.jobName} />
            </div>
          </div>

          <section className={styles.container}>
            <ul className={styles.actions}></ul>
            <div className={styles.jobDetailsContainerPlusAvatars}>
              <AvatarsDisplay jobTechnologies={jobTechnologies} />
              <JobDetailsBasicInfo job={jobData} />
            </div>
          </section>
          <JobDetailsDetailsInfo job={jobData} />
        </div>
      </Container>
    </>
  )
}

export default JobApplicationPage

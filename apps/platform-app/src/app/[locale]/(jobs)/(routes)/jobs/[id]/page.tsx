import JobDetails from '@/app/[locale]/(jobs)/(components)/JobDetailsPage/JobDetails'
import { JobsHeader } from '@/app/[locale]/(jobs)/(components)/JobsHeader/JobsHeader'
import { JobsTopBar } from '@/app/[locale]/(jobs)/(components)/JobsTopBar/JobsTopBar'
import { PendingJobPublisher } from '@/app/[locale]/(jobs)/(components)/PendingJobPublisher/PendingJobPublisher'
import { findJobById } from '@/app/[locale]/(jobs)/_actions/queries/getJobById'
import { I18nNamespaces } from '@/i18n/request'
import { getAuthorizedUser } from '@/utils/auth.helpers'
import { Container } from '@gdh/ui-system'
import { getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'

interface JobPageProps {
  params: Promise<{
    id: string
  }>
}

const JobPage = async ({ params }: JobPageProps) => {
  const t = await getTranslations(I18nNamespaces.Jobs)
  const { user } = await getAuthorizedUser()
  const { id: jobId } = await params

  // Fetch job data from database
  let jobData
  try {
    jobData = await findJobById(jobId)
  } catch (error) {
    console.error('Error fetching job:', error)
    notFound()
  }

  // Check if user is the owner of this job
  const isJobOwner = user?.id === jobData.createdById
  const isUser = !!user?.id

  return (
    <>
      <JobsHeader />
      <PendingJobPublisher isUser={isUser} />
      <Container>
        <JobsTopBar
          header={t('jobPreview')}
          subHeader={`${jobData.jobName} (ID: ${jobId})`}
        />
        <JobDetails
          job={jobData}
          params={{
            id: jobId,
            isUser: isUser,
            isJobOwner,
          }}
        />
      </Container>
    </>
  )
}

export default JobPage

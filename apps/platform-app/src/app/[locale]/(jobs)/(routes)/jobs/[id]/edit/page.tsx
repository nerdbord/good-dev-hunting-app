import { CreateJobForm } from '@/app/[locale]/(jobs)/(components)/CreateJobForm/CreateJobForm'
import { JobsHeader } from '@/app/[locale]/(jobs)/(components)/JobsHeader/JobsHeader'
import { JobsTopBar } from '@/app/[locale]/(jobs)/(components)/JobsTopBar/JobsTopBar'
import { findJobById } from '@/app/[locale]/(jobs)/_actions/queries/getJobById'
import { transformJobToFormValues } from '@/app/[locale]/(jobs)/_utils/job.mappers'
import { I18nNamespaces } from '@/i18n/request'
import { getAuthorizedUser } from '@/utils/auth.helpers'
import { AppRoutes } from '@/utils/routes'
import { Container } from '@gdh/ui-system'
import { getTranslations } from 'next-intl/server'
import { notFound, redirect } from 'next/navigation'

interface Props {
  params: Promise<{
    id: string
  }>
}

export default async function EditJobDetailsPage({ params }: Props) {
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

  // Check authorization:
  // 1. Allow if job is anonymous (no createdById)
  // 2. Allow if user is the job owner
  // 3. Otherwise, redirect to job details page
  const isAnonymousJob = !jobData.createdById
  const isJobOwner = user?.id === jobData.createdById

  if (!isAnonymousJob && !isJobOwner) {
    redirect(`${AppRoutes.jobs}/${jobId}`)
  }

  // Transform job model to form values
  const initialValues = transformJobToFormValues(jobData, t)

  return (
    <>
      <JobsHeader />
      <main>
        <Container>
          <JobsTopBar
            header={t('jobEditHeader')}
            subHeader={t('jobEditSubHeader')}
          />
          <CreateJobForm initialValues={initialValues} />
        </Container>
      </main>
    </>
  )
}

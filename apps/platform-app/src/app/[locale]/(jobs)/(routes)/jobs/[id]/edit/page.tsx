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
  params: {
    id: string
  }
}

export default async function EditJobDetailsPage({ params }: Props) {
  const t = await getTranslations(I18nNamespaces.Jobs)
  const { user } = await getAuthorizedUser()

  // Fetch job data from database
  let jobData
  try {
    jobData = await findJobById(params.id)
    console.log('DEBUG - Edit page loaded job data:', {
      id: jobData.id,
      state: jobData.state,
      budgetType: jobData.budgetType,
      name: jobData.jobName
    });
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
    redirect(`${AppRoutes.jobs}/${params.id}`)
  }

  // Transform job model to form values
  const initialValues = transformJobToFormValues(jobData, t)
  console.log('DEBUG - Initial form values:', {
    state: initialValues.state,
    budgetType: initialValues.budgetType,
    jobName: initialValues.jobName
  });

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

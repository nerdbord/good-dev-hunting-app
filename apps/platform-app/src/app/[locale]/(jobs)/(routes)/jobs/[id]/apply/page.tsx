import { getAuthorizedUser } from '@/app/[locale]/(auth)/auth.helpers'
import { AddJobTopBar } from '@/app/[locale]/(jobs)/(components)/AddJobTopBar/AddJobTopBar'
import JobApplicationForm from '@/app/[locale]/(jobs)/(components)/JobApplicationForm/JobApplicationForm'
import { JobsHeader } from '@/app/[locale]/(jobs)/(components)/JobsHeader/JobsHeader'
import { I18nNamespaces } from '@/i18n/request'
import { AppRoutes } from '@/utils/routes'
import { Container } from '@gdh/ui-system'
import { getTranslations } from 'next-intl/server'
import { redirect } from 'next/navigation'

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
    <>
      <JobsHeader />
      <Container>
        <AddJobTopBar
          header={t('applyForJob')}
          subHeader={`Job ID: ${params.id}`}
        />
        <JobApplicationForm jobId={params.id} />
      </Container>
    </>
  )
}

export default JobApplicationPage
